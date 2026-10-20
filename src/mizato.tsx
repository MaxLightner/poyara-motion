import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';

const FPS = 30;
export const MIZATO_FRAMES = 50 * FPS;
const ink = '#0b1820';
const cream = '#f7f7f2';
const coral = '#f16f52';
const teal = '#23bfa6';
const font = "'Noto Sans Arabic','Noto Naskh Arabic',Tahoma,Arial,sans-serif";
const clamp = (v:number) => Math.min(1,Math.max(0,v));
const p = (f:number,a:number,b:number) => clamp((f-a)/(b-a));
const smooth = (v:number) => v*v*(3-2*v);
const s = (f:number,a:number,b:number) => smooth(p(f,a,b));
const pulse = (f:number,n=1) => Math.sin(f*n/9);
const money = (v:string) => <span style={{fontSize:13,opacity:.7,marginRight:5}}>تومان</span>;

type DishType = 'burger' | 'pizza' | 'salad' | 'drink' | 'dessert';
const Food: React.FC<{kind:DishType;size?:number}> = ({kind,size=180}) => {
  const plate = <><ellipse cx="110" cy="94" rx="93" ry="58" fill="#ffffff" opacity=".16"/><ellipse cx="110" cy="94" rx="80" ry="51" fill="#f7f1e5"/><ellipse cx="110" cy="94" rx="69" ry="42" fill="#d8d9ca"/></>;
  return <svg viewBox="0 0 220 180" width={size} height={size*.82} style={{filter:'drop-shadow(0 12px 14px #0003)',overflow:'visible'}}>
    <defs>
      <linearGradient id="bun" x2="0" y2="1"><stop stopColor="#ffd78c"/><stop offset="1" stopColor="#d99144"/></linearGradient>
      <linearGradient id="juice" x2="0" y2="1"><stop stopColor="#f9ca9f"/><stop offset="1" stopColor="#e87d53"/></linearGradient>
    </defs>
    {kind !== 'drink' && kind !== 'dessert' && plate}
    {kind === 'burger' && <g>
      <ellipse cx="110" cy="119" rx="65" ry="17" fill="#994e27"/>
      <rect x="50" y="99" width="120" height="21" rx="12" fill="#5e2b20"/>
      <path d="M48 99 Q76 89 90 99 Q108 88 126 98 Q150 89 173 101" stroke="#65ad46" strokeWidth="11" fill="none"/>
      <rect x="65" y="90" width="96" height="10" rx="5" fill="#fbcd55"/>
      <rect x="59" y="85" width="110" height="8" rx="4" fill="#c84e42"/>
      <path d="M50 85 Q51 39 111 39 Q168 39 171 85 Z" fill="url(#bun)"/>
      {[[76,58],[100,52],[132,55],[150,70],[86,72],[117,65]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="4" ry="1.5" transform={`rotate(-25 ${x} ${y})`} fill="#fff0ba"/>)}
    </g>}
    {kind === 'pizza' && <g>
      <circle cx="110" cy="94" r="64" fill="#d99a47"/>
      <circle cx="110" cy="94" r="56" fill="#f9d078"/>
      <path d="M110 37V150M55 59L165 130M164 57L54 132" stroke="#e99a40" strokeWidth="3"/>
      {[[77,67],[134,60],[108,105],[148,108],[79,122],[108,82]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={9+i%3} fill="#bd473d" stroke="#ee8775" strokeWidth="2"/>)}
      {[[90,101],[141,87],[71,90]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="10" ry="4" transform={`rotate(-26 ${x} ${y})`} fill="#56a35c"/>)}
    </g>}
    {kind === 'salad' && <g>
      <ellipse cx="110" cy="95" rx="66" ry="41" fill="#f7f7eb"/>
      {[[71,88],[88,74],[109,85],[132,74],[146,96],[115,108],[84,110]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="25" ry="14" fill={i%2?'#6bae57':'#34835b'} transform={`rotate(${i*41} ${x} ${y})`}/>)}
      {[[84,79],[116,99],[143,87]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="9" fill="#d85c44"/>)}
      <path d="M53 102Q60 149 110 146Q160 149 167 102Z" fill="#f3e7d0" opacity=".95"/>
    </g>}
    {kind === 'drink' && <g>
      <ellipse cx="112" cy="159" rx="54" ry="11" fill="#0d2025" opacity=".14"/>
      <path d="M80 41H151L144 153Q116 165 89 153Z" fill="#fff" opacity=".8"/>
      <path d="M85 68H147L142 149Q115 156 92 149Z" fill="url(#juice)"/>
      <path d="M110 73L100 123M130 77L120 132" stroke="#ffe4b8" strokeWidth="7" opacity=".65"/>
      <path d="M111 50L154 18" stroke="#2a9891" strokeWidth="7" strokeLinecap="round"/>
      <circle cx="135" cy="61" r="25" fill="none" stroke="#ffc85c" strokeWidth="9"/>
      <path d="M79 44Q112 52 152 44" fill="none" stroke="#fff" strokeWidth="5"/>
    </g>}
    {kind === 'dessert' && <g>
      <ellipse cx="110" cy="150" rx="80" ry="16" fill="#fcf0d9"/>
      <path d="M53 109L152 91L166 140L72 148Z" fill="#bb6a4c"/>
      <path d="M53 108L152 91L144 110L63 127Z" fill="#fbebd3"/>
      <path d="M63 126L144 110L152 122L68 137Z" fill="#55382e"/>
      <path d="M51 110Q95 87 157 91" fill="none" stroke="#fff5e5" strokeWidth="12"/>
      <circle cx="113" cy="89" r="13" fill="#ba4544"/>
      <path d="M112 81Q104 69 124 70" stroke="#4a9154" strokeWidth="5" fill="none"/>
    </g>}
  </svg>;
};

const QR: React.FC<{size?:number}> = ({size=164}) => {
  const cells:Array<React.ReactElement> = [];
  const inFinder=(x:number,y:number,fx:number,fy:number)=> x>=fx&&x<fx+7&&y>=fy&&y<fy+7;
  for(let y=0;y<21;y++) for(let x=0;x<21;x++){
    let on = ((x*x + 3*y*y + 7*x*y + x*11+y*13)%11)<5;
    for(const [fx,fy] of [[0,0],[14,0],[0,14]]){
      if(inFinder(x,y,fx,fy)){
        const a=x-fx,b=y-fy;
        on=a===0||b===0||a===6||b===6||(a>=2&&a<=4&&b>=2&&b<=4);
        break;
      }
    }
    if(on) cells.push(<rect key={x+'-'+y} x={x*5} y={y*5} width="5" height="5" fill={ink}/>);
  }
  return <svg width={size} height={size} viewBox="0 0 105 105" style={{background:'#fff',padding:8,borderRadius:12,boxSizing:'border-box'}}>{cells}</svg>;
};

const Logo: React.FC<{dark?:boolean;big?:boolean}> = ({dark=false,big=false})=><div style={{display:'flex',alignItems:'center',gap:big?20:10,direction:'ltr'}}>
  <div style={{height:big?72:40,width:big?72:40,background:coral,borderRadius:big?20:11,display:'grid',placeItems:'center',transform:'rotate(-7deg)',boxShadow:'0 12px 30px #0002'}}>
    <div style={{display:'flex',gap:4,alignItems:'end',transform:'rotate(7deg)'}}><span style={{width:7,height:20,background:'#fff',borderRadius:5}}/><span style={{width:7,height:30,background:'#fff',borderRadius:5}}/><span style={{width:7,height:24,background:'#fff',borderRadius:5}}/></div>
  </div>
  <span style={{fontFamily:'Arial,sans-serif',fontWeight:900,letterSpacing:big?4:2,fontSize:big?62:30,color:dark?ink:'#fff'}}>MIZATO</span>
</div>;

const Face: React.FC<{shirt:string;skin?:string;size?:number;tilt?:number}> = ({shirt,skin='#dcaa87',size=110,tilt=0}) => <svg width={size} height={size*1.3} viewBox="0 0 110 140" style={{overflow:'visible',transform:`rotate(${tilt}deg)`}}>
  <ellipse cx="55" cy="130" rx="43" ry="8" fill="#000" opacity=".12"/>
  <path d="M17 100Q13 72 39 69H74Q99 76 94 105L95 128H17Z" fill={shirt}/>
  <path d="M40 66V80Q55 92 68 80V67" fill={skin}/>
  <ellipse cx="54" cy="41" rx="28" ry="35" fill={skin}/>
  <path d="M26 39Q23 0 52 4Q89 2 84 38Q73 18 55 25Q40 22 26 39" fill="#273139"/>
  <circle cx="45" cy="45" r="2" fill="#34302e"/><circle cx="65" cy="45" r="2" fill="#34302e"/>
  <path d="M47 60Q54 65 62 59" fill="none" stroke="#8f6053" strokeWidth="2.5" strokeLinecap="round"/>
</svg>;

const Glass: React.FC<{children:React.ReactNode;style?:React.CSSProperties}> = ({children,style}) => <div style={{background:'linear-gradient(145deg,#ffffffec,#ffffffd7)',border:'1px solid #fff',borderRadius:25,boxShadow:'0 24px 65px #001b2235',...style}}>{children}</div>;

const Restaurant:React.FC<{frame:number;busy?:boolean}> = ({frame,busy=true}) => <div style={{width:920,height:590,position:'relative',transform:`perspective(1100px) rotateX(6deg) rotateY(-8deg) translateY(${pulse(frame,0.4)*5}px)`}}>
  <div style={{position:'absolute',left:30,top:45,width:850,height:460,borderRadius:60,background:'linear-gradient(125deg,#dae6df,#c0d8ce)',transform:'skewY(-5deg)',boxShadow:'20px 35px 0 #92b9ab,38px 65px 80px #001a243b'}}/>
  {[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',top:130+i*67,left:63,width:770,height:2,background:'#ffffff8a',transform:'rotate(-5deg)'}}/>)}
  <div style={{position:'absolute',top:65,left:80,width:90,height:145,borderRadius:'45px 45px 12px 12px',background:'#c57653',boxShadow:'8px 9px 0 #985236'}}/>
  <div style={{position:'absolute',top:85,left:102,width:46,height:104,borderRadius:'38px 38px 5px 5px',background:'#e4a384'}}/>
  <div style={{position:'absolute',top:305,left:590,width:150,height:75,borderRadius:14,background:'#718a7d',transform:'rotate(-6deg)'}}/>
  {[{x:250,y:170},{x:600,y:150},{x:390,y:350}].map((t,i)=><div key={i} style={{position:'absolute',left:t.x,top:t.y,transform:`scale(${i===2?1.05:.82})`}}>
    <div style={{position:'absolute',top:-70,left:82,width:80,height:57,borderRadius:20,background:'#607b7b',transform:'rotate(-15deg)'}}/>
    <div style={{position:'absolute',top:135,left:15,width:80,height:58,borderRadius:20,background:'#607b7b',transform:'rotate(-15deg)'}}/>
    <div style={{width:230,height:132,borderRadius:'50%',background:'linear-gradient(135deg,#f7e7c4,#debd91)',border:'9px solid #fff6eb',boxShadow:'9px 20px 20px #0002',transform:'rotate(-15deg)',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
      {i===2?<><Food kind="burger" size={87}/><Food kind="drink" size={67}/></>:<><div style={{width:38,height:61,background:'#fff',borderRadius:4,transform:'rotate(15deg)',boxShadow:'0 3px 5px #0002'}}/><div style={{width:30,height:50,background:'#f2efdf',borderRadius:5}}/></>}
    </div>
  </div>)}
  <div style={{position:'absolute',top:140,left:400,transform:`rotate(${busy?-7:3}deg)`}}><Face shirt="#e58b69" size={118}/></div>
  <div style={{position:'absolute',top:315,left:185,transform:`translateX(${busy?pulse(frame)*4:0}px)`}}><Face shirt="#427885" size={112}/></div>
  <div style={{position:'absolute',top:320,left:760,transform:`translateY(${busy?pulse(frame)*5:0}px)`}}><Face shirt="#253944" size={110}/><div style={{position:'absolute',bottom:9,left:78,width:56,height:18,borderRadius:5,background:'#f1f2e9',transform:'rotate(12deg)'}}/></div>
  {busy&&<Glass style={{position:'absolute',right:10,top:40,padding:'12px 22px',display:'flex',alignItems:'center',gap:12,color:'#c7604c',fontSize:22,fontWeight:900}}><span style={{fontSize:30}}>⌛</span> انتخاب طولانی</Glass>}
  {!busy&&<Glass style={{position:'absolute',right:-10,top:20,padding:'12px 20px',color:'#168a79',fontSize:23,fontWeight:900}}>✓ سفارش ثبت شد</Glass>}
</div>;

type PhoneMode = 'browse' | 'compare' | 'addon' | 'cart';
const Phone: React.FC<{mode:PhoneMode;frame:number;compact?:boolean}> = ({mode,frame,compact=false}) => {
  const add = mode==='addon'||mode==='cart';
  return <div style={{width:420,height:784,background:'#17232b',border:'10px solid #17232b',borderRadius:55,boxShadow:'17px 36px 78px #00101975, inset 0 0 0 2px #57616a',position:'relative',overflow:'hidden',transform:compact?'scale(.80)':'none',transformOrigin:'center'}}>
    <div style={{position:'absolute',top:0,left:125,width:150,height:25,background:'#17232b',borderRadius:'0 0 20px 20px',zIndex:4}}/>
    <div style={{height:'100%',borderRadius:44,overflow:'hidden',background:'#f8f7f4',color:ink,direction:'rtl',fontFamily:font}}>
      <div style={{background:'#fff',height:103,padding:'30px 25px 10px',boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 5px 18px #203a3d0a'}}>
        <strong style={{fontSize:23}}>میزاتو <span style={{color:coral}}>●</span></strong><span style={{fontSize:14,color:'#7b8d92'}}>میز شماره ۸</span>
      </div>
      {mode==='browse'&&<div>
        <div style={{padding:'26px 26px 0',fontSize:25,fontWeight:900}}>چی میل دارید؟</div>
        <div style={{display:'flex',gap:10,margin:'18px 25px 14px'}}>{['همه','غذای اصلی','نوشیدنی'].map((v,i)=><div key={i} style={{padding:'10px 17px',borderRadius:30,background:i===1?ink:'#f0f1ee',color:i===1?'#fff':'#59656c',fontSize:13}}>{v}</div>)}</div>
        {[['burger','برگر مخصوص','۳۹۸٬۰۰۰'],['pizza','پیتزا ایتالیایی','۴۴۵٬۰۰۰'],['salad','سالاد سزار','۲۲۹٬۰۰۰']].map(([kind,name,price],i)=><Glass key={i} style={{margin:'10px 22px',height:135,display:'flex',alignItems:'center',justifyContent:'space-around',overflow:'hidden',position:'relative',background:'#fff',transform:`translateY(${(1-s(frame,7+i*5,22+i*5))*34}px)`,opacity:s(frame,7+i*5,20+i*5)}}>
          <Food kind={kind as DishType} size={145}/>
          <div style={{minWidth:160,textAlign:'right'}}><div style={{fontSize:19,fontWeight:900}}>{name}</div><div style={{fontSize:16,fontWeight:700,color:coral,marginTop:10}}>{price}</div><div style={{color:'#fff',background:teal,borderRadius:18,width:30,textAlign:'center',fontSize:23,marginTop:7}}>+</div></div>
        </Glass>)}
        <div style={{margin:'22px 25px',padding:17,borderRadius:20,background:'#f5e9df',fontSize:14,color:'#92644b'}}>عکس واقعی • قیمت شفاف • انتخاب آسان</div>
      </div>}
      {mode==='compare'&&<div style={{padding:'22px 21px'}}>
        <div style={{fontWeight:900,fontSize:24,marginBottom:11}}>مقایسه غذاها</div><div style={{color:'#7a8b91',fontSize:14,marginBottom:22}}>کدوم انتخاب بهتریه؟</div>
        <div style={{display:'flex',gap:12}}>{[['burger','برگر مخصوص','۳۹۸٬۰۰۰'],['pizza','پیتزا ایتالیایی','۴۴۵٬۰۰۰']].map(([kind,name,price],i)=><div key={i} style={{flex:1,background:'#fff',borderRadius:19,boxShadow:'0 10px 25px #00233211',padding:9,border:i===0?`2px solid ${teal}`:'2px solid #f2f2ef'}}>
          <div style={{height:150,display:'grid',placeItems:'center',background:'#edf4ef',borderRadius:13}}><Food kind={kind as DishType} size={151}/></div>
          <div style={{fontSize:16,fontWeight:900,margin:'12px 4px 9px'}}>{name}</div><div style={{fontSize:14,color:coral,fontWeight:800}}>{price}</div>
          <div style={{borderTop:'1px solid #eee',marginTop:13,paddingTop:14,fontSize:13,color:'#677d81',lineHeight:2.4}}>{i===0?'گوشت تازه':'پنیر موزارلا'}<br/>{i===0?'سیب‌زمینی کنار غذا':'خمیر دست‌ساز'}</div>
          <div style={{marginTop:15,background:i===0?teal:'#eef1ef',color:i===0?'#fff':ink,borderRadius:13,textAlign:'center',padding:10,fontSize:15,fontWeight:800}}>{i===0?'✓ انتخاب شد':'انتخاب'}</div>
        </div>)}</div>
        <div style={{background:'#e9f5ee',padding:16,borderRadius:17,marginTop:29,color:'#2b7d6d',fontSize:16,fontWeight:800}}>✓ انتخاب مطمئن‌تر، بدون سؤال اضافه</div>
      </div>}
      {add&&<div style={{padding:23}}>
        <div style={{background:'#eef4ee',borderRadius:20,display:'flex',alignItems:'center',gap:5,height:164,overflow:'hidden'}}><Food kind="burger" size={175}/><div><div style={{fontSize:20,fontWeight:900}}>برگر مخصوص</div><div style={{fontSize:14,color:'#2c9f89',marginTop:8}}>✓ اضافه شد</div></div></div>
        <div style={{fontWeight:900,fontSize:22,marginTop:24,marginBottom:15}}>کنارش چی سفارش بدیم؟</div>
        {[['drink','لیموناد تازه','۸۹٬۰۰۰'],['dessert','چیزکیک','۱۴۹٬۰۰۰']].map(([kind,name,price],i)=><div key={i} style={{background:'#fff',height:151,display:'flex',alignItems:'center',borderRadius:20,marginBottom:15,boxShadow:'0 7px 25px #0001',overflow:'hidden',border:i===0?`2px solid ${teal}`:'2px solid transparent'}}>
          <Food kind={kind as DishType} size={153}/>
          <div style={{fontSize:16,fontWeight:800}}>{name}<div style={{color:coral,fontSize:14,marginTop:7}}>{price}</div><div style={{marginTop:6,fontSize:12,color:i===0?'#259a82':'#a4a7a1'}}>{i===0?'✓ به سبد اضافه شد':'+ افزودن'}</div></div>
        </div>)}
        <div style={{background:ink,color:'#fff',borderRadius:15,padding:'16px 19px',display:'flex',justifyContent:'space-between',fontSize:16,fontWeight:800,marginTop:12}}><span>سبد خرید (۲)</span><span>ثبت سفارش ←</span></div>
      </div>}
    </div>
  </div>;
};

const Ticket:React.FC<{frame:number;approved?:boolean;compact?:boolean}> = ({frame,approved=false,compact=false}) => <Glass style={{width:compact?400:525,padding:29,boxSizing:'border-box',direction:'rtl',fontFamily:font,color:ink,transform:`translateY(${(1-s(frame,0,14))*65}px)`,opacity:s(frame,0,12)}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><b style={{fontSize:25}}>سفارش جدید</b><span style={{background:'#e7f4ef',color:'#168b74',borderRadius:30,padding:'8px 14px',fontSize:15}}>میز ۸</span></div>
  <div style={{borderTop:'1px dashed #bacac7',margin:'17px 0'}}/>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:20,marginBottom:17}}><span>۱ × برگر مخصوص</span><b>۳۹۸٬۰۰۰</b></div>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:20}}><span>۱ × لیموناد</span><b>۸۹٬۰۰۰</b></div>
  <div style={{borderTop:'1px solid #dfebe8',margin:'20px 0'}}/>
  {approved?<div style={{background:'#e6f8f3',color:'#087e69',padding:'18px 15px',borderRadius:14,fontSize:18,fontWeight:900,textAlign:'center'}}>✓ در انتظار تأیید آشپزخانه</div>:<div style={{background:teal,color:'#fff',padding:'17px 14px',borderRadius:14,fontSize:19,fontWeight:900,textAlign:'center',boxShadow:'0 10px 25px #20b89f66'}}>تأیید سفارش</div>}
</Glass>;

const Text:React.FC<{children:React.ReactNode;size?:number;color?:string;style?:React.CSSProperties}> = ({children,size=36,color:'#fff',style}) => <div style={{fontFamily:font,color,fontSize:size,lineHeight:1.6, ...style}}>{children}</div>;
const Tag:React.FC<{children:React.ReactNode}> = ({children})=><div style={{display:'inline-flex',padding:'8px 20px',borderRadius:35,background:'#ffffff16',border:'1px solid #ffffff24',fontWeight:700,fontSize:20,fontFamily:font,color:'#d7ede6',direction:'rtl'}}>{children}</div>;
const Caption: React.FC<{text:string;frame:number}> = ({text,frame})=><div style={{position:'absolute',bottom:64,left:100,right:100,display:'flex',alignItems:'center',justifyContent:'center',zIndex:30,opacity:s(frame,0,13)}}>
  <div dir="rtl" style={{background:'#07191fe8',border:'1px solid #ffffff24',padding:'12px 28px',borderRadius:40,color:'#fff',fontFamily:font,fontSize:24,fontWeight:700,textAlign:'center',boxShadow:'0 12px 30px #00101845'}}>{text}</div>
</div>;

const SceneBackground: React.FC<{children:React.ReactNode;frame:number;light?:boolean}> = ({children,frame,light=false})=><AbsoluteFill style={{background:light?'#e8eee8':'linear-gradient(125deg,#071a21,#12373b 64%,#224e4e)',overflow:'hidden'}}>
  <div style={{position:'absolute',width:1080,height:1080,background:'radial-gradient(circle,#48c2ab35,transparent 67%)',top:-410,left:-230,transform:`translateX(${Math.sin(frame/60)*40}px)`}}/>
  <div style={{position:'absolute',width:750,height:750,background:'radial-gradient(circle,#f06b5033,transparent 70%)',bottom:-410,right:-150}}/>
  <svg style={{position:'absolute',inset:0,opacity:light ? 0.11 : 0.13}} width="1920" height="1080">{Array.from({length:22},(_,i)=><line key={i} x1={i*94} x2={i*94} y1="0" y2="1080" stroke="#fff" strokeWidth="1"/>)}{Array.from({length:13},(_,i)=><line key={i} x1="0" x2="1920" y1={i*94} y2={i*94} stroke="#fff" strokeWidth="1"/>)}</svg>
  {children}
</AbsoluteFill>;

const WaiterVisual:React.FC<{frame:number}> = ({frame}) => <div style={{position:'relative',width:830,height:660}}>
  <div style={{position:'absolute',left:110,top:5,transform:`translateY(${Math.sin(frame/13)*6}px) scale(1.65)`,transformOrigin:'top center'}}><Face shirt="#254a57" size={200}/></div>
  <div style={{position:'absolute',top:180,left:390,transform:`rotate(${-9+s(frame,30,50)*8}deg)`}}><Ticket frame={frame} approved={frame>=142} compact/></div>
  <div style={{position:'absolute',top:105,left:490,width:104,height:45,borderRadius:24,background:'#f4dcb2',transform:'rotate(17deg)',zIndex:1}}/>
</div>;

export const MizatoFilm:React.FC = () => {
  const frame=useCurrentFrame();
  const scene=frame<180?0:frame<390?1:frame<720?2:frame<990?3:frame<1320?4:5;
  const start=[0,180,390,720,990,1320][scene];
  const f=frame-start;
  const captions=['منوی کاغذی، انتخاب سخت و انتظار طولانی','یک اسکن؛ همه‌چیز روی گوشی مشتری','تصاویر جذاب و مقایسه برای انتخاب بهتر','پیشنهاد هوشمند نوشیدنی و دسر','ثبت دقیق سفارش، تأیید گارسون، ارسال به آشپزخانه','میزاتو؛ از انتخاب تا سفارش'];
  const burst = scene===0?s(f,20,50):1;
  return <AbsoluteFill style={{fontFamily:font,background:ink}}>
    <Audio src={staticFile('mizato-bed.wav')} volume={0.44}/>
    <SceneBackground frame={frame} light={scene===1}>
      <div style={{position:'absolute',left:76,top:56,zIndex:20,transform:`scale(${.9+s(f,0,14)*.1})`,transformOrigin:'top left'}}><Logo dark={scene===1}/></div>
      <div style={{position:'absolute',right:80,top:70,color:scene===1?ink:'#d4e8e2',fontSize:18,letterSpacing:2,fontWeight:700}}>MIZATO / RESTAURANT EXPERIENCE</div>
      {scene===0&&<>
        <div style={{position:'absolute',right:110,top:240,width:480,opacity:s(f,8,22),transform:`translateY(${(1-s(f,5,26))*50}px)`}}><Tag>یک مسئله آشنا</Tag><Text size={63} style={{fontWeight:900,marginTop:20,lineHeight:1.45,direction:'rtl'}}>مشتری هنوز<br/><span style={{color:'#ffc18a'}}>داره انتخاب می‌کنه.</span></Text><Text size={24} style={{direction:'rtl',marginTop:27,opacity:.7}}>گارسون منتظره. منوی کاغذی هم کمکی نمی‌کنه.</Text></div>
        <div style={{position:'absolute',left:70,top:230,transform:`scale(${.92+s(f,0,65)*.07})`,transformOrigin:'left top',opacity:burst}}><Restaurant frame={f}/></div>
        <div style={{position:'absolute',right:170,top:660,opacity:s(f,58,77),transform:`scale(${.5+s(f,57,88)*.5})`}}><div style={{width:240,height:135,borderRadius:25,background:'#fff',display:'grid',placeItems:'center',color:ink,fontSize:27,fontWeight:900,direction:'rtl',boxShadow:'0 15px 35px #0017'}}>راه بهتری هست ↗</div></div>
      </>}
      {scene===1&&<>
        <div style={{position:'absolute',left:210,top:210,transform:`scale(${.7+s(f,4,28)*.3}) rotate(${-10+s(f,30,60)*10}deg)`,transformOrigin:'center center'}}><div style={{background:'#fff',borderRadius:38,padding:30,boxShadow:'20px 28px 45px #14453f38',display:'grid',placeItems:'center',width:325,height:355,boxSizing:'border-box'}}><QR size={250}/><div style={{color:ink,fontSize:17,fontWeight:800,letterSpacing:2,marginTop:9}}>SCAN TO ORDER</div></div></div>
        <div style={{position:'absolute',left:545,top:420,height:3,width:340,background:'#23bfa6',transform:`scaleX(${s(f,38,74)})`,transformOrigin:'left center',boxShadow:'0 0 25px #23bfa6'}}/>
        <div style={{position:'absolute',left:820,top:160,transform:`translateY(${(1-s(f,27,62))*820}px) rotate(${-12+s(f,45,93)*8}deg) scale(.78)`,transformOrigin:'center top'}}><Phone frame={f} mode="browse"/></div>
        <div style={{position:'absolute',right:80,top:245,width:410,opacity:s(f,45,69)}}><Text color={ink} size={60} style={{fontWeight:900,direction:'rtl'}}>فقط یک اسکن.</Text><Text color="#347166" size={38} style={{direction:'rtl',fontWeight:700,marginTop:15}}>منوی تصویری<br/>روی گوشی مشتری</Text><Text color="#58746d" size={22} style={{direction:'rtl',marginTop:24}}>بدون نصب اپلیکیشن</Text></div>
      </>}
      {scene===2&&<>
        <div style={{position:'absolute',left:160,top:175,transform:`translateX(${(1-s(f,5,32))*-600}px) rotate(-5deg) scale(.92)`}}><Phone frame={f} mode={f<155?'browse':'compare'}/></div>
        <div style={{position:'absolute',right:135,top:190,width:610,direction:'rtl',opacity:s(f,14,35)}}>
          <Tag>فراتر از یک منو</Tag>
          <Text size={61} style={{fontWeight:900,lineHeight:1.55,marginTop:20}}>اول ببین.<br/><span style={{color:'#61d4bd'}}>بعد مقایسه کن.</span></Text>
          <Text size={27} style={{marginTop:26,color:'#bed9d5'}}>عکس غذا، قیمت و جزئیات کنار هم؛<br/>مشتری با اطمینان بیشتری انتخاب می‌کنه.</Text>
        </div>
        <div style={{position:'absolute',right:115,bottom:210,display:'flex',gap:22,transform:`translateX(${(1-s(f,40,70))*500}px)`}}><Glass style={{padding:'13px 20px',fontSize:23,color:ink,fontWeight:800}}>عکس واضح ✓</Glass><Glass style={{padding:'13px 20px',fontSize:23,color:ink,fontWeight:800}}>مقایسه ✓</Glass></div>
        {f>145&&<div style={{position:'absolute',left:420,top:285,background:teal,color:'#fff',borderRadius:40,padding:'12px 22px',fontSize:22,fontWeight:900,transform:`scale(${.7+s(f,145,165)*.3})`,boxShadow:'0 20px 55px #0005'}}>↗ مقایسه غذاها</div>}
      </>}
      {scene===3&&<>
        <div style={{position:'absolute',left:180,top:162,transform:`translateY(${(1-s(f,0,25))*750}px) rotate(-5deg) scale(.92)`}}><Phone frame={f} mode="addon"/></div>
        <div style={{position:'absolute',right:130,top:215,width:600,opacity:s(f,10,30),direction:'rtl'}}><Tag>یک فرصت در لحظه انتخاب</Tag><Text size={60} style={{fontWeight:900,lineHeight:1.45,marginTop:25}}>«کنارش چی<br/><span style={{color:'#ffd18c'}}>میل دارید؟»</span></Text><Text size={27} style={{marginTop:25,color:'#c2ded7'}}>نوشیدنی و دسر مرتبط، همان‌جا پیشنهاد می‌شوند؛ بدون فشار به مشتری.</Text></div>
        <div style={{position:'absolute',right:170,top:580,transform:`translateY(${(1-s(f,55,88))*120}px) rotate(${pulse(f)*3}deg)`}}><Food kind="drink" size={220}/></div>
        <div style={{position:'absolute',right:380,top:640,transform:`translateY(${(1-s(f,75,105))*140}px)`}}><Food kind="dessert" size={190}/></div>
        <div style={{position:'absolute',right:225,bottom:190,background:teal,borderRadius:30,padding:'12px 24px',fontSize:22,fontWeight:900,color:'#fff',opacity:s(f,100,128)}}>+ یک نوشیدنی به سبد اضافه شد</div>
      </>}
      {scene===4&&<>
        <div style={{position:'absolute',left:50,top:190,transform:`scale(${.9+s(f,0,60)*.1})`,transformOrigin:'left top'}}><WaiterVisual frame={f}/></div>
        <div style={{position:'absolute',right:88,top:180,width:625,direction:'rtl',opacity:s(f,15,35)}}>
          <Tag>حالا نوبت گارسون است</Tag><Text size={59} style={{fontWeight:900,lineHeight:1.45,marginTop:22}}>سفارش آماده‌ست.<br/><span style={{color:'#65d5bf'}}>جزئیات هم مشخصه.</span></Text>
          <Text size={26} style={{marginTop:25,color:'#b8d4d0'}}>گارسون سفارش میز ۸ را بررسی و تأیید می‌کند.</Text>
        </div>
        <div style={{position:'absolute',right:110,top:615,opacity:s(f,130,155),transform:`translateY(${(1-s(f,130,155))*65}px)`}}><Glass style={{padding:'22px 28px',width:540,direction:'rtl',color:'#198a76',display:'flex',alignItems:'center',gap:14,fontSize:23,fontWeight:800}}><span style={{fontSize:40}}>✓</span> در انتظار تأیید آشپزخانه</Glass></div>
        <svg width="500" height="115" style={{position:'absolute',right:150,bottom:150,opacity:s(f,165,190)}}><path d="M20 55H480" stroke="#58cebb" strokeWidth="5" strokeDasharray="18 13"/><circle cx={20+s(f,170,250)*460} cy="55" r="16" fill="#b9ffdf"/></svg>
      </>}
      {scene===5&&<>
        <div style={{position:'absolute',left:40,top:190,opacity:s(f,0,24),transform:`translateX(${(1-s(f,0,45))*-130}px) scale(.83)`,transformOrigin:'left top'}}><Restaurant frame={f} busy={false}/></div>
        <div style={{position:'absolute',right:100,top:250,direction:'rtl',width:750,opacity:s(f,11,32)}}><Text size={44} style={{color:'#9cddca',fontWeight:800}}>انتخاب بهتر برای مشتری.</Text><Text size={44} style={{fontWeight:800}}>سفارش‌گیری روان‌تر برای پرسنل.</Text><div style={{width:190,height:6,background:coral,borderRadius:8,margin:'35px 0'}}/><Text size={23} style={{color:'#b9d6d1'}}>از دیدن منو تا تأیید سفارش، در یک تجربه یکپارچه.</Text></div>
        <div style={{position:'absolute',bottom:225,right:255,transform:`translateY(${(1-s(f,40,70))*60}px) scale(${.9+s(f,50,70)*.1})`,opacity:s(f,30,56)}}><Logo big/></div>
      </>}
      <Caption text={captions[scene]} frame={f}/>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:7,background:'#ffffff20'}}><div style={{background:coral,height:'100%',width:`${frame/(MIZATO_FRAMES-1)*100}%`}}/></div>
    </SceneBackground>
  </AbsoluteFill>;
};