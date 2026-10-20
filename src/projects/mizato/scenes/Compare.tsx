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
export const Compare:React.FC<{f:number}> = ({f}) => <>
<div style={{position:'absolute',left:160,top:175,transform:`translateX(${(1-s(f,5,32))*-600}px) rotate(-5deg) scale(.92)`}}><Phone frame={f} mode={f<155?'browse':'compare'}/></div>
        <div style={{position:'absolute',right:135,top:190,width:610,direction:'rtl',opacity:s(f,14,35)}}>
          <Tag>فراتر از یک منو</Tag>
          <Text size={61} style={{fontWeight:900,lineHeight:1.55,marginTop:20}}>اول ببین.<br/><span style={{color:'#61d4bd'}}>بعد مقایسه کن.</span></Text>
          <Text size={27} style={{marginTop:26,color:'#bed9d5'}}>عکس غذا، قیمت و جزئیات کنار هم؛<br/>مشتری با اطمینان بیشتری انتخاب می‌کنه.</Text>
        </div>
        <div style={{position:'absolute',right:115,bottom:210,display:'flex',gap:22,transform:`translateX(${(1-s(f,40,70))*500}px)`}}><Glass style={{padding:'13px 20px',fontSize:23,color:ink,fontWeight:800}}>عکس واضح ✓</Glass><Glass style={{padding:'13px 20px',fontSize:23,color:ink,fontWeight:800}}>مقایسه ✓</Glass></div>
        {f>145&&<div style={{position:'absolute',left:420,top:285,background:teal,color:'#fff',borderRadius:40,padding:'12px 22px',fontSize:22,fontWeight:900,transform:`scale(${.7+s(f,145,165)*.3})`,boxShadow:'0 20px 55px #0005'}}>↗ مقایسه غذاها</div>}
</>;
