import React from 'react';

export const Face: React.FC<{shirt:string;skin?:string;size?:number;tilt?:number}> = ({shirt,skin='#dcaa87',size=110,tilt=0}) => <svg width={size} height={size*1.3} viewBox="0 0 110 140" style={{overflow:'visible',transform:`rotate(${tilt}deg)`}}>
  <ellipse cx="55" cy="130" rx="43" ry="8" fill="#000" opacity=".12"/>
  <path d="M17 100Q13 72 39 69H74Q99 76 94 105L95 128H17Z" fill={shirt}/>
  <path d="M40 66V80Q55 92 68 80V67" fill={skin}/>
  <ellipse cx="54" cy="41" rx="28" ry="35" fill={skin}/>
  <path d="M26 39Q23 0 52 4Q89 2 84 38Q73 18 55 25Q40 22 26 39" fill="#273139"/>
  <circle cx="45" cy="45" r="2" fill="#34302e"/><circle cx="65" cy="45" r="2" fill="#34302e"/>
  <path d="M47 60Q54 65 62 59" fill="none" stroke="#8f6053" strokeWidth="2.5" strokeLinecap="round"/>
</svg>;
