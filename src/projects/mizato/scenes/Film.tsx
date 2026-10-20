import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Soundtrack} from '../../../core/audio/Soundtrack';
import {s} from '../../../core/animation/easing';
import {ink, coral} from '../theme';
import {Logo} from '../components/Logo';
import {Caption} from '../components/Overlays';
import {SceneBackground} from '../components/SceneBackground';
import script from '../script.json';
import {Opening} from './Opening';
import {Scan} from './Scan';
import {Compare} from './Compare';
import {Upsell} from './Upsell';
import {Service} from './Service';
import {Final} from './Final';
export const MIZATO_FPS=30;
export const MIZATO_FRAMES=script.scenes.reduce((sum,scene)=>sum+Math.round(scene.duration*MIZATO_FPS),0);
const SCENES=[Opening,Scan,Compare,Upsell,Service,Final];
// Timing/captions live in script.json; visual scenes live in individual components.
export const MizatoFilm:React.FC = () => {
 const frame=useCurrentFrame();
 const ends=script.scenes.map((_,i)=>script.scenes.slice(0,i+1).reduce((sum,scene)=>sum+Math.round(scene.duration*MIZATO_FPS),0));
 const sceneIndex=Math.max(0,ends.findIndex(end=>frame<end));
 const start=sceneIndex===0?0:ends[sceneIndex-1];
 const f=frame-start;
 const Scene=SCENES[sceneIndex];
 return <AbsoluteFill style={{fontFamily:'Arial,sans-serif',background:ink}}>
  <Soundtrack file="mizato-bed.wav" volume={0.44}/>
  <SceneBackground frame={frame} light={sceneIndex===1}>
   <div style={{position:'absolute',left:76,top:56,zIndex:20,transform:`scale(${.9+s(f,0,14)*.1})`,transformOrigin:'top left'}}><Logo dark={sceneIndex===1}/></div>
   <div style={{position:'absolute',right:80,top:70,color:sceneIndex===1?ink:'#d4e8e2',fontSize:18,letterSpacing:2,fontWeight:700}}>MIZATO / RESTAURANT EXPERIENCE</div>
   <Scene f={f}/>
   <Caption text={script.scenes[sceneIndex].caption} frame={f}/>
   <div style={{position:'absolute',bottom:0,left:0,right:0,height:7,background:'#ffffff20'}}><div style={{background:coral,height:'100%',width:`${frame/(MIZATO_FRAMES-1)*100}%`}}/></div>
  </SceneBackground>
 </AbsoluteFill>;
};
