import React from 'react';
import {ink} from '../theme';

export const QR: React.FC<{size?:number}> = ({size=164}) => {
  const cells:Array<React.ReactElement> = [];
  const inFinder=(x:number,y:number,fx:number,fy:number)=> x>=fx&&x<fx+7&&y>=fy&&y<fy+7;
  for(let y=0;y<21;y++) for(let x=0;x<21;x++){
    let on = ((x*x + 3*y*y + 7*x*y + x*11+y*13)%11)<5;
    for(const [fx,fy] of [[0,0],[14,0],[0,14]]){
      if(inFinder(x,y,fx,fy)){
        const a=x-fx,b=y-fy;
        on=a===0||b===0||a===6||b===6||(a>=2&&a<=4&&b>=2&&b<=4);
        break;
      }
    }
    if(on) cells.push(<rect key={x+'-'+y} x={x*5} y={y*5} width="5" height="5" fill={ink}/>);
  }
  return <svg width={size} height={size} viewBox="0 0 105 105" style={{background:'#fff',padding:8,borderRadius:12,boxSizing:'border-box'}}>{cells}</svg>;
};
