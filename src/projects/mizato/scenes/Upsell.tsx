import React from 'react';
import {s,pulse} from '../../../core/animation/easing';
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
export const Upsell:React.FC<{f:number}> = ({f}) => <>
<div style={{position:'absolute',left:180,top:162,transform:`translateY(${(1-s(f,0,25))*750}px) rotate(-5deg) scale(.92)`}}><Phone frame={f} mode="addon"/></div>
        <div style={{position:'absolute',right:130,top:215,width:600,opacity:s(f,10,30),direction:'rtl'}}><Tag>یک فرصت در لحظه انتخاب</Tag><Text size={60} style={{fontWeight:900,lineHeight:1.45,marginTop:25}}>«کنارش چی<br/><span style={{color:'#ffd18c'}}>میل دارید؟»</span></Text><Text size={27} style={{marginTop:25,color:'#c2ded7'}}>نوشیدنی و دسر مرتبط، همان‌جا پیشنهاد می‌شوند؛ بدون فشار به مشتری.</Text></div>
        <div style={{position:'absolute',right:170,top:580,transform:`translateY(${(1-s(f,55,88))*120}px) rotate(${pulse(f)*3}deg)`}}><Food kind="drink" size={220}/></div>
        <div style={{position:'absolute',right:380,top:640,transform:`translateY(${(1-s(f,75,105))*140}px)`}}><Food kind="dessert" size={190}/></div>
        <div style={{position:'absolute',right:225,bottom:190,background:teal,borderRadius:30,padding:'12px 24px',fontSize:22,fontWeight:900,color:'#fff',opacity:s(f,100,128)}}>+ یک نوشیدنی به سبد اضافه شد</div>
</>;
