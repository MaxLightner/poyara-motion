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
export const Final:React.FC<{f:number}> = ({f}) => <>
<div style={{position:'absolute',left:40,top:190,opacity:s(f,0,24),transform:`translateX(${(1-s(f,0,45))*-130}px) scale(.83)`,transformOrigin:'left top'}}><Restaurant frame={f} busy={false}/></div>
        <div style={{position:'absolute',right:100,top:250,direction:'rtl',width:750,opacity:s(f,11,32)}}><Text size={44} style={{color:'#9cddca',fontWeight:800}}>انتخاب بهتر برای مشتری.</Text><Text size={44} style={{fontWeight:800}}>سفارش‌گیری روان‌تر برای پرسنل.</Text><div style={{width:190,height:6,background:coral,borderRadius:8,margin:'35px 0'}}/><Text size={23} style={{color:'#b9d6d1'}}>از دیدن منو تا تأیید سفارش، در یک تجربه یکپارچه.</Text></div>
        <div style={{position:'absolute',bottom:225,right:255,transform:`translateY(${(1-s(f,40,70))*60}px) scale(${.9+s(f,50,70)*.1})`,opacity:s(f,30,56)}}><Logo big/></div>
</>;
