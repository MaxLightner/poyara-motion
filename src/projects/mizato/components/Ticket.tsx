import React from 'react';
import {Glass} from '../../../core/components/Glass';
import {s} from '../../../core/animation/easing';
import {ink, font, teal} from '../theme';

export const Ticket:React.FC<{frame:number;approved?:boolean;compact?:boolean}> = ({frame,approved=false,compact=false}) => <Glass style={{width:compact?400:525,padding:29,boxSizing:'border-box',direction:'rtl',fontFamily:font,color:ink,transform:`translateY(${(1-s(frame,0,14))*65}px)`,opacity:s(frame,0,12)}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><b style={{fontSize:25}}>سفارش جدید</b><span style={{background:'#e7f4ef',color:'#168b74',borderRadius:30,padding:'8px 14px',fontSize:15}}>میز ۸</span></div>
  <div style={{borderTop:'1px dashed #bacac7',margin:'17px 0'}}/>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:20,marginBottom:17}}><span>۱ × برگر مخصوص</span><b>۳۹۸٬۰۰۰</b></div>
  <div style={{display:'flex',justifyContent:'space-between',fontSize:20}}><span>۱ × لیموناد</span><b>۸۹٬۰۰۰</b></div>
  <div style={{borderTop:'1px solid #dfebe8',margin:'20px 0'}}/>
  {approved?<div style={{background:'#e6f8f3',color:'#087e69',padding:'18px 15px',borderRadius:14,fontSize:18,fontWeight:900,textAlign:'center'}}>✓ در انتظار تأیید آشپزخانه</div>:<div style={{background:teal,color:'#fff',padding:'17px 14px',borderRadius:14,fontSize:19,fontWeight:900,textAlign:'center',boxShadow:'0 10px 25px #20b89f66'}}>تأیید سفارش</div>}
</Glass>;
