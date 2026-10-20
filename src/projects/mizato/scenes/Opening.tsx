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
export const Opening:React.FC<{f:number}> = ({f}) => <>
{/* Entrance intentionally ramps restaurant visibility over the opening beat. */}

<div style={{position:'absolute',right:110,top:240,width:480,opacity:s(f,8,22),transform:`translateY(${(1-s(f,5,26))*50}px)`}}><Tag>یک مسئله آشنا</Tag><Text size={63} style={{fontWeight:900,marginTop:20,lineHeight:1.45,direction:'rtl'}}>مشتری هنوز<br/><span style={{color:'#ffc18a'}}>داره انتخاب می‌کنه.</span></Text><Text size={24} style={{direction:'rtl',marginTop:27,opacity:.7}}>گارسون منتظره. منوی کاغذی هم کمکی نمی‌کنه.</Text></div>
        <div style={{position:'absolute',left:70,top:230,transform:`scale(${.92+s(f,0,65)*.07})`,transformOrigin:'left top',opacity:s(f,20,50)}}><Restaurant frame={f}/></div>
        <div style={{position:'absolute',right:170,top:660,opacity:s(f,58,77),transform:`scale(${.5+s(f,57,88)*.5})`}}><div style={{width:240,height:135,borderRadius:25,background:'#fff',display:'grid',placeItems:'center',color:ink,fontSize:27,fontWeight:900,direction:'rtl',boxShadow:'0 15px 35px #0017'}}>راه بهتری هست ↗</div></div>
</>;
