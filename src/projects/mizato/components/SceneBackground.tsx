import React from 'react';
import {AbsoluteFill} from 'remotion';

export const SceneBackground: React.FC<{children:React.ReactNode;frame:number;light?:boolean}> = ({children,frame,light=false})=><AbsoluteFill style={{background:light?'#e8eee8':'linear-gradient(125deg,#071a21,#12373b 64%,#224e4e)',overflow:'hidden'}}>
  <div style={{position:'absolute',width:1080,height:1080,background:'radial-gradient(circle,#48c2ab35,transparent 67%)',top:-410,left:-230,transform:`translateX(${Math.sin(frame/60)*40}px)`}}/>
  <div style={{position:'absolute',width:750,height:750,background:'radial-gradient(circle,#f06b5033,transparent 70%)',bottom:-410,right:-150}}/>
  <svg style={{position:'absolute',inset:0,opacity:light ? 0.11 : 0.13}} width="1920" height="1080">{Array.from({length:22},(_,i)=><line key={i} x1={i*94} x2={i*94} y1="0" y2="1080" stroke="#fff" strokeWidth="1"/>)}{Array.from({length:13},(_,i)=><line key={i} x1="0" x2="1920" y1={i*94} y2={i*94} stroke="#fff" strokeWidth="1"/>)}</svg>
  {children}
</AbsoluteFill>;
