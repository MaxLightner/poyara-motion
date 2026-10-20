import React from 'react';
import {s} from '../../../core/animation/easing';
import {Glass} from '../../../core/components/Glass';
import {PersianText as Text} from '../../../core/typography/PersianText';
import {Tag} from '../components/Overlays';
import {Restaurant} from '../components/Restaurant';
import {Phone} from '../components/Phone';
import {Food} from '../components/Food';
import {QR} from '../components/QR';
import {WaiterVisual} from '../components/WaiterVisual';
import {Logo} from '../components/Logo';
import {teal, ink} from '../theme';
export const Service:React.FC<{f:number}> = ({f}) => <>
<div style={{position:'absolute',left:50,top:190,transform:`scale(${.9+s(f,0,60)*.1})`,transformOrigin:'left top'}}><WaiterVisual frame={f}/></div>
        <div style={{position:'absolute',right:88,top:180,width:625,direction:'rtl',opacity:s(f,15,35)}}>
          <Tag>حالا نوبت گارسون است</Tag><Text size={59} style={{fontWeight:900,lineHeight:1.45,marginTop:22}}>سفارش آماده‌ست.<br/><span style={{color:'#65d5bf'}}>جزئیات هم مشخصه.</span></Text>
          <Text size={26} style={{marginTop:25,color:'#b8d4d0'}}>گارسون سفارش میز ۸ را بررسی و تأیید می‌کند.</Text>
        </div>
        <div style={{position:'absolute',right:110,top:615,opacity:s(f,130,155),transform:`translateY(${(1-s(f,130,155))*65}px)`}}><Glass style={{padding:'22px 28px',width:540,direction:'rtl',color:'#198a76',display:'flex',alignItems:'center',gap:14,fontSize:23,fontWeight:800}}><span style={{fontSize:40}}>✓</span> در انتظار تأیید آشپزخانه</Glass></div>
        <svg width="500" height="115" style={{position:'absolute',right:150,bottom:150,opacity:s(f,165,190)}}><path d="M20 55H480" stroke="#58cebb" strokeWidth="5" strokeDasharray="18 13"/><circle cx={20+s(f,170,250)*460} cy="55" r="16" fill="#b9ffdf"/></svg>
</>;
