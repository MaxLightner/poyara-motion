import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Soundtrack} from '../../../core/audio/Soundtrack';
import {MobileDevice} from '../../../core/components/MobileDevice';
import {Glass} from '../../../core/components/Glass';
import {ease, pulse} from '../../../core/animation/easing';
import {Food} from '../components/Food';
import {Face} from '../components/Face';
import {QR} from '../components/QR';
import {Logo} from '../components/Logo';
import {ink, coral, teal, font} from '../theme';
import flowScript from '../flow-script.json';

export const FLOW_FPS = flowScript.fps;
export const FLOW_FRAMES = flowScript.duration * FLOW_FPS;
const t = (f:number) => f / FLOW_FPS;
const E = (f:number,a:number,b:number) => ease(f,a*FLOW_FPS,b*FLOW_FPS);
const visible = (f:number,a:number,b:number,fade=0.85) => E(f,a-fade,a+fade)*(1-E(f,b-fade,b+fade));
const move = (x:number,y:number,scale=1,rotate=0) => 'translate('+x+'px,'+y+'px) scale('+scale+') rotate('+rotate+'deg)';
const P:React.FC<{children:React.ReactNode;size?:number;color?:string;weight?:number;style?:React.CSSProperties}> =
 ({children,size=22,color=ink,weight=600,style}) => <div dir="rtl" style={{fontFamily:font,fontSize:size,fontWeight:weight,color,lineHeight:1.55,...style}}>{children}</div>;
const GlassCard:React.FC<{children:React.ReactNode;style?:React.CSSProperties}> = ({children,style}) => <div style={{background:'#fffffff2',border:'1px solid #ffffff',borderRadius:25,boxShadow:'0 20px 55px #001c2140',...style}}>{children}</div>;
const Tag:React.FC<{children:React.ReactNode;dark?:boolean}> = ({children,dark=false}) =>
 <div style={{display:'inline-flex',direction:'rtl',fontFamily:font,fontWeight:800,fontSize:16,letterSpacing:0.1,padding:'9px 18px',borderRadius:40,color:dark?'#207b6e':'#b1fbdf',border:'1px solid '+(dark?'#7faaa877':'#72d9b958'),background:dark?'#e7f9ef':'#163b3b8e'}}>{children}</div>;
const Shadow:React.FC<{x:number;y:number;w:number;opacity?:number}> = ({x,y,w,opacity=.11})=>
 <div style={{position:'absolute',left:x,top:y,width:w,height:w*.18,background:'#092b31',opacity,borderRadius:'50%',filter:'blur(11px)'}}/>;
const Bubble:React.FC<{children:React.ReactNode;x:number;y:number;opacity?:number;scale?:number}> = ({children,x,y,opacity=1,scale=1}) =>
 <GlassCard style={{position:'absolute',left:x,top:y,padding:'13px 20px',opacity,transform:'scale('+scale+')',transformOrigin:'left center',zIndex:20}}>{children}</GlassCard>;

const Table:React.FC<{x:number;y:number;active?:boolean;f:number;tiny?:boolean}> = ({x,y,active=false,f,tiny=false}) =>
 <div style={{position:'absolute',left:x,top:y,width:tiny?225:315,height:210,transform:'rotate(-12deg)'}}>
   <Shadow x={10} y={128} w={tiny?225:300}/>
   <div style={{position:'absolute',left:10,top:8,width:tiny?210:290,height:160,borderRadius:'50%',background:'linear-gradient(150deg,#f9edd5,#d8bb90)',border:'11px solid #ffffffa9',boxShadow:'9px 24px 0 #7c8c7f,20px 36px 36px #0003'}}/>
   {active?<><div style={{position:'absolute',left:125,top:53,width:62,height:75,background:'#fff',borderRadius:11,display:'grid',placeItems:'center',transform:'rotate(14deg)',boxShadow:'0 6px 12px #0002'}}><QR size={47}/></div>
     {f>37*30&&<div style={{position:'absolute',left:35,top:15,transform:'rotate(9deg) scale('+E(f,37,39)+')',opacity:E(f,37,39)}}><Food kind="burger" size={110}/></div>}
   </>:<div style={{position:'absolute',left:44,top:17}}><Food kind="pizza" size={tiny?90:115}/></div>}
 </div>;

const RestaurantWorld:React.FC<{f:number}> = ({f}) => {
 const waiterLeave=E(f,9,18),waiterReturn=E(f,20,26),serve=E(f,36,40);
 const waiterX=925+260*waiterLeave-260*waiterReturn+(-90)*serve;
 const waiterY=470+50*waiterLeave-50*waiterReturn+26*serve;
 const customerSmile=E(f,7,12);
 const worldSize=.97-.08*E(f,9,16)+.06*E(f,39,45);
 const pan=-54*E(f,18,25)+64*E(f,39,46);
 return <div style={{position:'absolute',left:-20,top:150,width:1300,height:820,transform:'translateX('+pan+'px) scale('+worldSize+')',transformOrigin:'center center'}}>
   <div style={{position:'absolute',left:88,top:78,width:1140,height:620,borderRadius:90,transform:'skewY(-6deg)',background:'linear-gradient(133deg,#d5e7d5,#9ecac0)',boxShadow:'24px 32px 0 #4e9b8d,36px 65px 90px #0005',border:'3px solid #f0fff343'}}/>
   {Array.from({length:10},(_,i)=><div key={i} style={{position:'absolute',width:1040,height:2,left:145,top:125+i*54,transform:'rotate(-6deg)',background:'#fff6'}}/>)}
   <div style={{position:'absolute',left:155,top:95,width:165,height:255,borderRadius:'70px 70px 20px 20px',background:'linear-gradient(115deg,#d79572,#bc7157)',boxShadow:'14px 16px 0 #98624b',transform:'rotate(-6deg)'}}/>
   <div style={{position:'absolute',left:180,top:118,width:112,height:205,borderRadius:'55px 55px 14px 14px',background:'#f2c7ab'}}/>
   <div style={{position:'absolute',left:740,top:150,width:356,height:175,borderRadius:27,background:'#34535c',transform:'rotate(-7deg)',boxShadow:'10px 17px 0 #263b45'}}/>
   <div style={{position:'absolute',left:780,top:175,transform:'rotate(-7deg)',color:'#e1fff3',fontSize:22,fontWeight:700,letterSpacing:2}}>KITCHEN</div>
   <Table x={262} y={352} active f={f}/>
   <Table x={460} y={125} tiny f={f}/>
   <Table x={865} y={355} tiny f={f}/>
   <div style={{position:'absolute',left:260,top:257,transform:'rotate(-9deg)'}}><Face shirt="#d86f59" skin="#e4af8c" size={145} tilt={customerSmile*2}/></div>
   <div style={{position:'absolute',left:470,top:475,transform:'rotate(9deg)'}}><Face shirt="#4d8796" skin="#d6a37b" size={125}/></div>
   <div style={{position:'absolute',left:600,top:50,transform:'scale(.65) rotate(-4deg)'}}><Face shirt="#4e6972" size={130}/></div>
   <div style={{position:'absolute',left:waiterX,top:waiterY,transform:'rotate('+(pulse(f)*1.5)+'deg)'}}>
     <Face shirt="#1a5264" skin="#d29b76" size={142}/>
     <div style={{position:'absolute',top:113,left:95,width:84,height:23,background:'#edf6ec',borderRadius:6,transform:'rotate(13deg)',boxShadow:'0 4px 14px #0003'}}/>
   </div>
   <div style={{position:'absolute',left:waiterX-5,top:waiterY+164,background:'#073640d9',borderRadius:20,padding:'7px 13px',color:'#fff',fontFamily:font,fontSize:17,fontWeight:700}}>گارسون</div>
   <Bubble x={200} y={235} opacity={visible(f,0,9)} scale={.9+E(f,0,2)*.1}><P size={20} weight={800}>هنوز تصمیم نگرفتم...</P></Bubble>
   <Bubble x={840} y={350} opacity={visible(f,0,8)}><P color="#ba614a" size={20} weight={900}>گارسون منتظر مانده!</P></Bubble>
   <Bubble x={838} y={350} opacity={visible(f,9,20)}><P color="#11866f" size={19} weight={800}>وقت آزاد برای سرویس میزهای دیگر</P></Bubble>
   <Bubble x={770} y={340} opacity={visible(f,26,32)}><P size={18} color="#167960" weight={800}>✓ دریافت سفارش میز ۸</P></Bubble>
   <Bubble x={690} y={98} opacity={visible(f,29,38)}><P size={18} color="#176b69" weight={800}>آشپزخانه در حال آماده‌سازی</P></Bubble>
   <Bubble x={260} y={233} opacity={visible(f,39,44)}><P size={19} color="#168b74" weight={800}>غذا رسید، عالیه!</P></Bubble>
 </div>;
};

const AppHeader:React.FC<{label:string}> = ({label}) => <div style={{height:108,boxSizing:'border-box',background:'#ffffff',padding:'37px 26px 17px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #e6e9e5'}}>
 <P size={22} weight={900}>میزاتو <span style={{color:coral}}>●</span></P><P size={14} color="#788b90">{label}</P>
 </div>;
const FoodLine:React.FC<{kind:'burger'|'pizza'|'drink';name:string;price:string;selected?:boolean}> = ({kind,name,price,selected}) =>
 <div style={{margin:'10px 18px',padding:10,borderRadius:17,background:'#fff',height:124,display:'flex',alignItems:'center',justifyContent:'space-between',border:selected?'2px solid '+teal:'1px solid #eef0e9',boxShadow:'0 9px 20px #011e2610'}}>
  <Food kind={kind} size={138}/><div style={{width:170,textAlign:'right'}}><P size={18} weight={800}>{name}</P><P size={15} color="#b35d43" weight={800}>{price}</P><P size={12} color={selected?'#138e78':'#91a3a4'}>{selected?'✓ انتخاب شد':'+ افزودن'}</P></div>
 </div>;
const BrowseScreen:React.FC<{f:number}> = ({f}) => <div>
 <AppHeader label="میز ۸"/>
 <div style={{padding:'14px 22px 0'}}><P size={26} weight={900}>چی میل دارید؟</P><P size={13} color="#738a8b">عکس و جزئیات غذا را ببینید</P></div>
 <div style={{display:'flex',gap:8,padding:'15px 18px'}}>{['پیشنهادی','غذاها','نوشیدنی'].map((l,i)=><div key={l} style={{padding:'7px 13px',borderRadius:18,background:i===0?ink:'#eaece8',color:i===0?'#fff':'#6d8282',fontSize:13,fontWeight:700}}>{l}</div>)}</div>
 <FoodLine kind="burger" name="برگر مخصوص" price="۳۹۸٬۰۰۰" selected={f>12*30}/>
 <FoodLine kind="pizza" name="پیتزا ایتالیایی" price="۴۴۵٬۰۰۰"/>
 <div style={{margin:'16px 22px',padding:14,borderRadius:15,background:'#e8f4ed'}}><P size={15} color="#227c6b" weight={800}>عکس + قیمت + توضیحات، یک‌جا</P></div>
 <div style={{margin:'10px 22px',display:'flex',justifyContent:'space-between',fontSize:15,color:'#6c8583',fontWeight:700}}><span>مقایسه غذاها</span><span style={{color:teal}}>⇄</span></div>
 </div>;
const AddonScreen:React.FC = () => <div><AppHeader label="تکمیل سفارش"/>
 <div style={{padding:20}}><P size={26} weight={900}>انتخابت ثبت شد</P></div>
 <div style={{margin:17,background:'#e6f2e9',borderRadius:17,display:'flex',alignItems:'center'}}><Food kind="burger" size={145}/><div><P size={18} weight={900}>برگر مخصوص</P><P size={15} color="#138f7b">✓ در سبد خرید</P></div></div>
 <div style={{padding:'18px 23px 10px'}}><P size={20} weight={900}>کنارش چی میل دارید؟</P></div>
 <FoodLine kind="drink" name="لیموناد تازه" price="۸۹٬۰۰۰" selected/>
 <div style={{margin:'8px 22px',borderRadius:14,background:'#f7e9de',padding:17}}><P size={15} color="#875d45">می‌توانید دسر هم اضافه کنید</P></div>
 <div style={{margin:'22px 20px',background:teal,color:'#fff',borderRadius:18,padding:'19px 16px',display:'flex',justifyContent:'space-between',fontSize:17,fontWeight:800}}><span>ثبت سفارش ←</span><span>۲ قلم</span></div>
 </div>;
const statusSteps=['سفارش ثبت شد','تأیید گارسون','آشپزخانه','در حال آماده‌سازی','آماده سرو'];
const OrderScreen:React.FC<{f:number}> = ({f})=>{
 const active=f<26*30?0:f<30*30?1:f<34*30?2:f<38*30?3:4;
 return <div><AppHeader label="پیگیری سفارش"/><div style={{padding:24}}><P size={27} weight={900}>سفارش میز ۸</P><P size={15} color="#718987">لحظه‌به‌لحظه همراه سفارشتان</P></div>
 <div style={{margin:'5px 22px',background:'#eaf8f0',padding:20,borderRadius:19}}>
  <P size={18} color="#127a69" weight={900}>{active===4?'غذا آماده سرو است':active===3?'سفارش در حال آماده‌سازی است':active===2?'سفارش به آشپزخانه رسید':active===1?'گارسون سفارشتان را تأیید کرد':'درخواست سفارش ثبت شد'}</P>
  <P size={14} color="#557a71">وضعیت بدون نیاز به پرسیدن از گارسون</P>
 </div>
 <div style={{padding:'18px 31px'}}>{statusSteps.map((step,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:16,height:67,opacity:.4+.6*(i<=active?1:0.6)}}>
  <div style={{width:29,height:29,borderRadius:'50%',border:'2px solid '+(i<=active?teal:'#bbcecd'),display:'grid',placeItems:'center',background:i<=active?teal:'#fff',color:'#fff',fontSize:18,fontWeight:900}}>{i<=active?'✓':''}</div>
  <P size={17} weight={i===active?900:600} color={i<=active?ink:'#98a8a9'}>{step}</P>
  </div>)}</div>
 <div style={{margin:'10px 24px',borderTop:'1px solid #e7ece7',paddingTop:13}}><P size={15} color="#477c72" weight={800}>اعلان مرحله بعدی در همین صفحه</P></div>
 </div>;
};
const FeedbackScreen:React.FC<{f:number}> = ({f})=><div><AppHeader label="نظر شما"/><div style={{padding:'30px 24px 8px'}}><P size={26} weight={900}>غذا چطور بود؟</P><P size={16} color="#829594">نظر شما کمک می‌کند بهتر شویم</P></div>
 <div style={{display:'flex',justifyContent:'center',gap:8,padding:'25px 0',direction:'ltr'}}>{Array.from({length:5},(_,i)=><span key={i} style={{fontSize:44,color:i<5?'#f4ad4e':'#cbd2cb',transform:'scale('+(1+E(f,42+i*.1,42.4+i*.1)*.08)+')'}}>★</span>)}</div>
 <div style={{margin:'12px 24px',borderRadius:17,padding:'25px 17px',background:'#f1f5f1',minHeight:82}}><P size={17} color="#647d79">غذا خوشمزه بود و سرویس سریع انجام شد.</P></div>
 <div style={{margin:'24px 24px',borderRadius:16,textAlign:'center',background:teal,padding:'18px',color:'#fff',fontSize:17,fontWeight:900}}>ثبت نظر</div>
 <div style={{padding:'20px'}}><P size={15} color="#4a8374">بدون نیاز به نصب برنامه یا فرم طولانی</P></div>
 {f>45*30&&<div style={{position:'absolute',left:35,top:270,right:35,padding:26,borderRadius:20,background:'#e8f9ee',border:'1px solid #4abf9d',boxShadow:'0 16px 45px #0013'}}><P size={22} color="#148774" weight={900}>✓ نظرتان ثبت شد</P></div>}
 </div>;
const PhoneExperience:React.FC<{f:number}> = ({f}) => {
 const appear=E(f,5.2,8),out=E(f,47,51);
 const screenDefs=[
  {key:'browse',range:[7,17.6],el:<BrowseScreen f={f}/>},
  {key:'add',range:[17.5,23.5],el:<AddonScreen/>},
  {key:'order',range:[23.4,40.5],el:<OrderScreen f={f}/>},
  {key:'feedback',range:[40.3,47.9],el:<FeedbackScreen f={f}/>},
 ];
 const scale=.78+.15*E(f,7,11)-.02*E(f,23,26);
 const translateX=1325-155*E(f,19,27)+145*E(f,47,52);
 const translateY=146+8*Math.sin(f/45);
 return <div style={{position:'absolute',left:0,top:0,zIndex:9,opacity:appear*(1-out),transform:move(translateX,translateY,scale,-8+6*E(f,9,15)),transformOrigin:'top left'}}>
  <MobileDevice screenStyle={{position:'relative',overflow:'hidden',fontFamily:font,direction:'rtl'}}>
   {screenDefs.map(({key,range,el})=><div key={key} style={{position:'absolute',inset:0,opacity:visible(f,range[0],range[1],.75),transform:'translateY('+((1-E(f,range[0]-.7,range[0]+.5))*35)+'px)',pointerEvents:'none',background:'#f7f8f5'}}>{el}</div>)}
  </MobileDevice>
 </div>;
};

const OrderSignal:React.FC<{f:number}> = ({f}) => {
 const enter=E(f,21,21.4),leave=E(f,24.5,25.5),progress=E(f,21.2,23.8);
 const x=1130+360*progress,y=675-180*Math.sin(Math.PI*progress);
 return <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:11,opacity:enter*(1-leave)}}>
  <svg width="1920" height="1080" viewBox="0 0 1920 1080"><path d="M1130 675 Q1310 300 1490 675" fill="none" stroke="#69ffcb" strokeWidth="4" strokeDasharray="8 14" opacity=".55"/><circle cx={x} cy={y} r="25" fill={teal} stroke="#cffff0" strokeWidth="5"/><path d={'M'+(x-10)+' '+y+' h20'} stroke="#fff" strokeWidth="4"/></svg>
  <Bubble x={1350} y={335} opacity={E(f,22.4,23)}><P size={18} color="#127c68" weight={900}>سفارش به گارسون رسید</P></Bubble>
 </div>;
};
const WaiterNotice:React.FC<{f:number}> = ({f}) => {
 const shown=visible(f,22.2,33.7,1);
 const confirmed=E(f,27.2,27.9);
 return <GlassCard style={{position:'absolute',left:310,top:545,width:510,padding:25,opacity:shown,transform:move(0,(1-E(f,22,23))*75,1),zIndex:16,direction:'rtl'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><P size={24} weight={900}>سفارش جدید</P><Tag dark>میز ۸</Tag></div>
  <div style={{borderTop:'1px solid #d9e6df',margin:'17px 0'}}/>
  <P size={20}>۱ × برگر مخصوص</P><P size={20}>۱ × لیموناد</P>
  <div style={{position:'relative',height:57,marginTop:25}}>
   <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',borderRadius:16,background:teal,color:'#fff',fontFamily:font,fontWeight:900,fontSize:19,opacity:1-confirmed}}>تأیید سفارش توسط گارسون</div>
   <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',borderRadius:16,background:'#dcf8ed',color:'#0a8067',fontFamily:font,fontWeight:900,fontSize:18,opacity:confirmed}}>✓ در انتظار تأیید آشپزخانه</div>
  </div>
 </GlassCard>;
};
const ManagerPanel:React.FC<{f:number}> = ({f}) => {
 const show=E(f,47,49),exit=E(f,57,59);
 const priceDone=E(f,50,51),soldDone=E(f,52,53),discountDone=E(f,54,55);
 return <div style={{position:'absolute',left:845,top:157,zIndex:16,opacity:show*(1-exit),transform:move((1-show)*450,0,1),transformOrigin:'center'}}>
  <GlassCard style={{width:920,height:738,overflow:'hidden',background:'#f9fbf7'}}>
   <div style={{background:ink,padding:'23px 30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <P size={23} color="#fff" weight={900}>داشبورد مدیریت میزاتو</P><span style={{fontSize:15,color:'#88cbbd',direction:'rtl',fontFamily:font}}>مدیریت زنده رستوران</span>
   </div>
   <div style={{display:'flex',height:660,direction:'rtl'}}>
    <div style={{width:202,background:'#eaf3ee',borderLeft:'1px solid #d3e4dd',padding:20}}>
      {['نمای کلی','منوی غذا','سفارش‌ها','نظرات مشتریان','تخفیف‌ها'].map((item,i)=><div key={item} style={{background:i===1?'#d0ede1':'transparent',padding:'14px 12px',borderRadius:12,marginBottom:12}}><P size={16} color={i===1?'#08745d':'#68827b'} weight={i===1?900:600}>{item}</P></div>)}
    </div>
    <div style={{flex:1,padding:25}}>
     <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}><P size={26} weight={900}>مدیریت منو</P><Tag dark>همه تغییرات یک‌جا</Tag></div>
     <GlassCard style={{padding:15,display:'flex',alignItems:'center',direction:'rtl',marginBottom:20,background:'#fff'}}>
       <Food kind="burger" size={145}/>
       <div style={{flex:1}}><P size={21} weight={900}>برگر مخصوص</P><P size={16} color="#849a97">قیمت غذا</P></div>
       <div style={{textAlign:'center'}}><P size={20} weight={900} color={priceDone>.5?'#168a75':ink}>{priceDone>.5?'۳۷۸٬۰۰۰':'۳۹۸٬۰۰۰'} تومان</P><P size={13} color="#128d75">{priceDone>.5?'✓ قیمت تغییر کرد':'ویرایش قیمت'}</P></div>
     </GlassCard>
     <GlassCard style={{padding:19,display:'flex',justifyContent:'space-between',marginBottom:19,alignItems:'center'}}><P size={20} weight={850}>سالاد فصل</P><div style={{display:'flex',alignItems:'center',gap:11}}><P size={15} color={soldDone>.5?'#a95e45':'#168f7b'}>{soldDone>.5?'ناموجود':'موجود'}</P><div style={{width:61,height:32,borderRadius:35,background:soldDone>.5?'#c3cac5':teal,position:'relative'}}><div style={{position:'absolute',top:4,left:soldDone>.5?4:33,width:24,height:24,borderRadius:'50%',background:'#fff'}}/></div></div></GlassCard>
     <GlassCard style={{padding:18,display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:19}}><P size={20} weight={850}>تخفیف ویژه</P><div style={{borderRadius:25,background:discountDone>.5?'#d7f5e3':'#e2e5e2',padding:'9px 18px'}}><P size={18} weight={900} color={discountDone>.5?'#12886c':'#788d86'}>{discountDone>.5?'۱۰٪ فعال شد':'غیرفعال'}</P></div></GlassCard>
     <div style={{display:'flex',justifyContent:'space-between',gap:12,marginTop:27}}>{[['سفارش‌های امروز','۲۴'],['بازخوردهای جدید','۳'],['آیتم‌های منو','۳۸']].map(([a,b])=><div key={a} style={{flex:1,background:'#eaf5ee',borderRadius:12,padding:'18px 10px',textAlign:'center'}}><P size={14} color="#59837b">{a}</P><P size={26} weight={900} color="#0d8470">{b}</P></div>)}</div>
    </div>
   </div>
  </GlassCard>
 </div>;
};
const FeedbackToManager:React.FC<{f:number}> = ({f})=><Bubble x={765} y={512} opacity={visible(f,45.3,50.5)} scale={.85+E(f,45,47)*.15}><P size={18} color="#14856d" weight={900}>★★★★★ نظر مشتری به پنل مدیر رسید</P></Bubble>;
const ConnectedEnd:React.FC<{f:number}> = ({f})=>{
 const show=E(f,56.7,59);
 return <div style={{position:'absolute',inset:0,opacity:show,zIndex:25,pointerEvents:'none'}}>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(120deg,#082530ef,#0c4445f1)'}}/>
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,opacity:.65}}>
   <path d="M370 560C680 260 1000 270 1280 560S1580 820 1790 580" fill="none" stroke="#72eac7" strokeWidth="5" strokeDasharray="14 16"/>
   {[[370,560],[780,390],[1280,560],[1650,685]].map(([cx,cy],i)=><g key={i}><circle cx={cx} cy={cy} r="62" stroke="#74cfb4" strokeWidth="2" fill="#0f5455"/><circle cx={cx} cy={cy} r={18+14*Math.sin(f/20+i)} fill="#9bffe2" opacity=".35"/></g>)}
  </svg>
  <div style={{position:'absolute',left:170,top:225,right:170,textAlign:'center',direction:'rtl',fontFamily:font,color:'#fff',fontSize:52,fontWeight:900}}>مشتری راحت‌تر. گارسون آزادتر. مدیر مسلط‌تر.</div>
  <div style={{position:'absolute',left:165,top:605,width:165}}><P size={25} color="#fff" style={{textAlign:'center'}}>مشتری</P></div>
  <div style={{position:'absolute',left:680,top:430,width:190}}><P size={25} color="#fff" style={{textAlign:'center'}}>گارسون</P></div>
  <div style={{position:'absolute',left:1180,top:595,width:190}}><P size={25} color="#fff" style={{textAlign:'center'}}>آشپزخانه</P></div>
  <div style={{position:'absolute',left:1555,top:735,width:190}}><P size={25} color="#fff" style={{textAlign:'center'}}>مدیریت</P></div>
  <div style={{position:'absolute',left:745,top:808}}><Logo big/></div>
 </div>;
};

const Headlines:React.FC<{f:number}> = ({f}) =>
 <div style={{position:'absolute',inset:0,zIndex:14,pointerEvents:'none'}}>
 {flowScript.beats.map((beat,i)=><div key={beat.id} style={{
  position:'absolute',right:i===0?85:undefined,left:i>0?80:undefined,top:170,
  width:i===0?720:655,boxSizing:'border-box',padding:i===0?0:'24px 28px',
  borderRadius:26,background:i===0?'transparent':'linear-gradient(90deg,#082a32eb,#092e33a4 78%,#092e3314)',
  opacity:visible(f,beat.from,beat.to,1),
  transform:'translateY('+((1-E(f,beat.from-.8,beat.from+.65))*24)+'px)',
  textAlign:'right'}}>
  <Tag>{beat.eyebrow}</Tag>
  <P size={beat.title.length>42?38:47} color="#fff" weight={900} style={{marginTop:18,lineHeight:1.46,textShadow:'0 3px 16px #001d25bb'}}>{beat.title}</P>
  <P size={22} color="#d4f2e9" style={{marginTop:12,maxWidth:610,marginLeft:'auto',textShadow:'0 2px 10px #001c20'}}>{beat.subtitle}</P>
 </div>)}
 </div>;
const Footer:React.FC<{f:number}> = ({f})=>{
 const active=Math.min(flowScript.beats.length-1,Math.max(0,flowScript.beats.findIndex(beat=>t(f)>=beat.from&&t(f)<beat.to)));
 return <div style={{position:'absolute',bottom:35,left:75,right:75,zIndex:30,display:'flex',justifyContent:'space-between',alignItems:'end'}}>
  <div style={{display:'flex',alignItems:'center',gap:9}}>{flowScript.beats.map((beat,i)=><div key={beat.id} style={{width:i===active?53:13,height:7,borderRadius:20,background:i===active?teal:'#d4f0e866',transition:'none'}}/>)}</div>
  <div style={{borderRadius:40,background:'#031c22da',border:'1px solid #ffffff35',padding:'10px 22px',minWidth:400,textAlign:'right'}}><P size={19} color="#fff" weight={800}>{flowScript.beats[active].strap}</P></div>
 </div>;
};
export const MizatoFlow:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#0c2831',overflow:'hidden',fontFamily:font}}>
  <Soundtrack file="mizato-flow-bed.wav" volume={0.55}/>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 15% 48%,#176861 0%,#0e3b45 45%,#071d2c 100%)'}}/>
  <div style={{position:'absolute',width:1000,height:1000,borderRadius:'50%',border:'1px solid #83d8c620',left:-370,top:-500}}/>
  <div style={{position:'absolute',left:65,top:50,zIndex:40}}><Logo/></div>
  <div style={{position:'absolute',right:80,top:55,color:'#9ed7cb',fontSize:16,fontWeight:700,letterSpacing:2}}>A BETTER RESTAURANT EXPERIENCE</div>
  <RestaurantWorld f={f}/>
  <Headlines f={f}/>
  <div style={{position:'absolute',left:1080,top:150,opacity:visible(f,4.5,10),transform:move(-250*E(f,5,8),180*E(f,7,9),.8+.3*E(f,5,7)),zIndex:12}}>
   <GlassCard style={{padding:24,display:'grid',placeItems:'center',width:246,height:280,boxSizing:'border-box'}}><QR size={202}/><P color="#768f8b" size={17}>اسکن منو</P></GlassCard>
  </div>
  <PhoneExperience f={f}/>
  <OrderSignal f={f}/>
  <WaiterNotice f={f}/>
  <FeedbackToManager f={f}/>
  <ManagerPanel f={f}/>
  <ConnectedEnd f={f}/>
  <Footer f={f}/>
  <div style={{position:'absolute',left:0,bottom:0,height:5,width:(100*f/(FLOW_FRAMES-1))+'%',background:coral,zIndex:45}}/>
 </AbsoluteFill>;
};
