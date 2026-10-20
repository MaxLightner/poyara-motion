import React from 'react';
import {PERSIAN_FONT_STACK} from './fonts';
export const PersianText:React.FC<{children:React.ReactNode;size?:number;color?:string;style?:React.CSSProperties}> = ({children,size=36,color='#fff',style}) => <div style={{fontFamily:PERSIAN_FONT_STACK,color,fontSize:size,lineHeight:1.6,...style}}>{children}</div>;
