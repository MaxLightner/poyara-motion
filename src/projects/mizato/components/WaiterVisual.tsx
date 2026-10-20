import React from 'react';
import {Face} from './Face';
import {Ticket} from './Ticket';
import {s} from '../../../core/animation/easing';

export const WaiterVisual:React.FC<{frame:number}> = ({frame}) => <div style={{position:'relative',width:830,height:660}}>
  <div style={{position:'absolute',left:110,top:5,transform:`translateY(${Math.sin(frame/13)*6}px) scale(1.65)`,transformOrigin:'top center'}}><Face shirt="#254a57" size={200}/></div>
  <div style={{position:'absolute',top:180,left:390,transform:`rotate(${-9+s(frame,30,50)*8}deg)`}}><Ticket frame={frame} approved={frame>=142} compact/></div>
  <div style={{position:'absolute',top:105,left:490,width:104,height:45,borderRadius:24,background:'#f4dcb2',transform:'rotate(17deg)',zIndex:1}}/>
</div>;
