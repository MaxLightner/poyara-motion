import React from 'react';

export type DishType = 'burger' | 'pizza' | 'salad' | 'drink' | 'dessert';
export const Food: React.FC<{kind:DishType;size?:number}> = ({kind,size=180}) => {
  const plate = <><ellipse cx="110" cy="94" rx="93" ry="58" fill="#ffffff" opacity=".16"/><ellipse cx="110" cy="94" rx="80" ry="51" fill="#f7f1e5"/><ellipse cx="110" cy="94" rx="69" ry="42" fill="#d8d9ca"/></>;
  return <svg viewBox="0 0 220 180" width={size} height={size*.82} style={{filter:'drop-shadow(0 12px 14px #0003)',overflow:'visible'}}>
    <defs>
      <linearGradient id="bun" x2="0" y2="1"><stop stopColor="#ffd78c"/><stop offset="1" stopColor="#d99144"/></linearGradient>
      <linearGradient id="juice" x2="0" y2="1"><stop stopColor="#f9ca9f"/><stop offset="1" stopColor="#e87d53"/></linearGradient>
    </defs>
    {kind !== 'drink' && kind !== 'dessert' && plate}
    {kind === 'burger' && <g>
      <ellipse cx="110" cy="119" rx="65" ry="17" fill="#994e27"/>
      <rect x="50" y="99" width="120" height="21" rx="12" fill="#5e2b20"/>
      <path d="M48 99 Q76 89 90 99 Q108 88 126 98 Q150 89 173 101" stroke="#65ad46" strokeWidth="11" fill="none"/>
      <rect x="65" y="90" width="96" height="10" rx="5" fill="#fbcd55"/>
      <rect x="59" y="85" width="110" height="8" rx="4" fill="#c84e42"/>
      <path d="M50 85 Q51 39 111 39 Q168 39 171 85 Z" fill="url(#bun)"/>
      {[[76,58],[100,52],[132,55],[150,70],[86,72],[117,65]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="4" ry="1.5" transform={`rotate(-25 ${x} ${y})`} fill="#fff0ba"/>)}
    </g>}
    {kind === 'pizza' && <g>
      <circle cx="110" cy="94" r="64" fill="#d99a47"/>
      <circle cx="110" cy="94" r="56" fill="#f9d078"/>
      <path d="M110 37V150M55 59L165 130M164 57L54 132" stroke="#e99a40" strokeWidth="3"/>
      {[[77,67],[134,60],[108,105],[148,108],[79,122],[108,82]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={9+i%3} fill="#bd473d" stroke="#ee8775" strokeWidth="2"/>)}
      {[[90,101],[141,87],[71,90]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="10" ry="4" transform={`rotate(-26 ${x} ${y})`} fill="#56a35c"/>)}
    </g>}
    {kind === 'salad' && <g>
      <ellipse cx="110" cy="95" rx="66" ry="41" fill="#f7f7eb"/>
      {[[71,88],[88,74],[109,85],[132,74],[146,96],[115,108],[84,110]].map(([x,y],i)=><ellipse key={i} cx={x} cy={y} rx="25" ry="14" fill={i%2?'#6bae57':'#34835b'} transform={`rotate(${i*41} ${x} ${y})`}/>)}
      {[[84,79],[116,99],[143,87]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="9" fill="#d85c44"/>)}
      <path d="M53 102Q60 149 110 146Q160 149 167 102Z" fill="#f3e7d0" opacity=".95"/>
    </g>}
    {kind === 'drink' && <g>
      <ellipse cx="112" cy="159" rx="54" ry="11" fill="#0d2025" opacity=".14"/>
      <path d="M80 41H151L144 153Q116 165 89 153Z" fill="#fff" opacity=".8"/>
      <path d="M85 68H147L142 149Q115 156 92 149Z" fill="url(#juice)"/>
      <path d="M110 73L100 123M130 77L120 132" stroke="#ffe4b8" strokeWidth="7" opacity=".65"/>
      <path d="M111 50L154 18" stroke="#2a9891" strokeWidth="7" strokeLinecap="round"/>
      <circle cx="135" cy="61" r="25" fill="none" stroke="#ffc85c" strokeWidth="9"/>
      <path d="M79 44Q112 52 152 44" fill="none" stroke="#fff" strokeWidth="5"/>
    </g>}
    {kind === 'dessert' && <g>
      <ellipse cx="110" cy="150" rx="80" ry="16" fill="#fcf0d9"/>
      <path d="M53 109L152 91L166 140L72 148Z" fill="#bb6a4c"/>
      <path d="M53 108L152 91L144 110L63 127Z" fill="#fbebd3"/>
      <path d="M63 126L144 110L152 122L68 137Z" fill="#55382e"/>
      <path d="M51 110Q95 87 157 91" fill="none" stroke="#fff5e5" strokeWidth="12"/>
      <circle cx="113" cy="89" r="13" fill="#ba4544"/>
      <path d="M112 81Q104 69 124 70" stroke="#4a9154" strokeWidth="5" fill="none"/>
    </g>}
  </svg>;
};
