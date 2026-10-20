import React from 'react';
import {s} from '../../../core/animation/easing';
import {font} from '../theme';

export const Tag:React.FC<{children:React.ReactNode}> = ({children})=><div style={{display:'inline-flex',padding:'8px 20px',borderRadius:35,background:'#ffffff16',border:'1px solid #ffffff24',fontWeight:700,fontSize:20,fontFamily:font,color:'#d7ede6',direction:'rtl'}}>{children}</div>;
export const Caption: React.FC<{text:string;frame:number}> = ({text,frame})=><div style={{position:'absolute',bottom:64,left:100,right:100,display:'flex',alignItems:'center',justifyContent:'center',zIndex:30,opacity:s(frame,0,13)}}>
  <div dir="rtl" style={{background:'#07191fe8',border:'1px solid #ffffff24',padding:'12px 28px',borderRadius:40,color:'#fff',fontFamily:font,fontSize:24,fontWeight:700,textAlign:'center',boxShadow:'0 12px 30px #00101845'}}>{text}</div>
</div>;
