import React from 'react';
import {s} from '../../../core/animation/easing';
import {Glass} from '../../../core/components/Glass';
import {MobileDevice} from '../../../core/components/MobileDevice';
import {Food, DishType} from './Food';
import {ink, coral, teal, font} from '../theme';

type PhoneMode = 'browse' | 'compare' | 'addon' | 'cart';
export const Phone: React.FC<{mode:PhoneMode;frame:number;compact?:boolean}> = ({mode,frame,compact=false}) => {
  const add = mode==='addon'||mode==='cart';
  return <MobileDevice compact={compact} screenStyle={{direction:'rtl',fontFamily:font}}>
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
  </MobileDevice>;
};
