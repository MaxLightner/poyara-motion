import React from 'react';
import {ink, coral} from '../theme';

export const Logo: React.FC<{dark?:boolean;big?:boolean}> = ({dark=false,big=false})=><div style={{display:'flex',alignItems:'center',gap:big?20:10,direction:'ltr'}}>
  <div style={{height:big?72:40,width:big?72:40,background:coral,borderRadius:big?20:11,display:'grid',placeItems:'center',transform:'rotate(-7deg)',boxShadow:'0 12px 30px #0002'}}>
    <div style={{display:'flex',gap:4,alignItems:'end',transform:'rotate(7deg)'}}><span style={{width:7,height:20,background:'#fff',borderRadius:5}}/><span style={{width:7,height:30,background:'#fff',borderRadius:5}}/><span style={{width:7,height:24,background:'#fff',borderRadius:5}}/></div>
  </div>
  <span style={{fontFamily:'Arial,sans-serif',fontWeight:900,letterSpacing:big?4:2,fontSize:big?62:30,color:dark?ink:'#fff'}}>MIZATO</span>
</div>;
