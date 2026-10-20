import React from 'react';
/** Device chrome independent of product-specific screen content. Native canvas size: 420×784. */
export const MobileDevice: React.FC<{children:React.ReactNode;compact?:boolean;screenStyle?:React.CSSProperties}> = ({children,compact=false,screenStyle}) =>
 <div style={{width:420,height:784,background:'#17232b',border:'10px solid #17232b',borderRadius:55,boxShadow:'17px 36px 78px #00101975, inset 0 0 0 2px #57616a',position:'relative',overflow:'hidden',transform:compact?'scale(.80)':'none',transformOrigin:'center'}}>
  <div style={{position:'absolute',top:0,left:125,width:150,height:25,background:'#17232b',borderRadius:'0 0 20px 20px',zIndex:4}}/>
  <div style={{height:'100%',borderRadius:44,overflow:'hidden',background:'#f8f7f4',color:'#0b1820',...screenStyle}}>{children}</div>
 </div>;
