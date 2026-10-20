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
export const Scan:React.FC<{f:number}> = ({f}) => <>
<div style={{position:'absolute',left:210,top:210,transform:`scale(${.7+s(f,4,28)*.3}) rotate(${-10+s(f,30,60)*10}deg)`,transformOrigin:'center center'}}><div style={{background:'#fff',borderRadius:38,padding:30,boxShadow:'20px 28px 45px #14453f38',display:'grid',placeItems:'center',width:325,height:355,boxSizing:'border-box'}}><QR size={250}/><div style={{color:ink,fontSize:17,fontWeight:800,letterSpacing:2,marginTop:9}}>SCAN TO ORDER</div></div></div>
        <div style={{position:'absolute',left:545,top:420,height:3,width:340,background:'#23bfa6',transform:`scaleX(${s(f,38,74)})`,transformOrigin:'left center',boxShadow:'0 0 25px #23bfa6'}}/>
        <div style={{position:'absolute',left:820,top:160,transform:`translateY(${(1-s(f,27,62))*820}px) rotate(${-12+s(f,45,93)*8}deg) scale(.78)`,transformOrigin:'center top'}}><Phone frame={f} mode="browse"/></div>
        <div style={{position:'absolute',right:80,top:245,width:410,opacity:s(f,45,69)}}><Text color={ink} size={60} style={{fontWeight:900,direction:'rtl'}}>فقط یک اسکن.</Text><Text color="#347166" size={38} style={{direction:'rtl',fontWeight:700,marginTop:15}}>منوی تصویری<br/>روی گوشی مشتری</Text><Text color="#58746d" size={22} style={{direction:'rtl',marginTop:24}}>بدون نصب اپلیکیشن</Text></div>
</>;
