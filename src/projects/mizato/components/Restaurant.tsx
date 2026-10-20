import React from 'react';
import {pulse} from '../../../core/animation/easing';
import {Glass} from '../../../core/components/Glass';
import {Food} from './Food';
import {Face} from './Face';

export const Restaurant:React.FC<{frame:number;busy?:boolean}> = ({frame,busy=true}) => <div style={{width:920,height:590,position:'relative',transform:`perspective(1100px) rotateX(6deg) rotateY(-8deg) translateY(${pulse(frame,0.4)*5}px)`}}>
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
