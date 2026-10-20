import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {postSchema} from './schema.mjs';
type Post = z.infer<typeof postSchema>;
type Scene = Post['scenes'][number];
const accent = '#d8a079';

const Card: React.FC<{scene: Scene; direction: Post['direction']; index: number}> = ({scene, direction, index}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const n = Math.round(scene.duration * fps);
  const rise = spring({frame: f, fps, config: {damping: 200}, durationInFrames: 26});
  const opacity = interpolate(f, [0, 12, n - 12, n - 1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{padding: '235px 88px 170px', justifyContent: 'center', direction, opacity, transform: `translateY(${(1-rise)*42}px)`}}>
    <div style={{color: accent, fontSize: 22, letterSpacing: direction === 'rtl' ? 0 : 4, marginBottom: 32}}>{scene.eyebrow}</div>
    <h1 style={{fontSize: 84, lineHeight: 1.16, letterSpacing: direction === 'rtl' ? 0 : -3, fontWeight: 600, margin: '0 0 36px', whiteSpace: 'pre-line', overflowWrap: 'anywhere'}}>{scene.title}</h1>
    {scene.layout === 'statement' && scene.body && <p style={{fontSize: 32, color: '#b4b5b0', lineHeight: 1.65, maxWidth: 820, margin: 0}}>{scene.body}</p>}
    {scene.layout === 'steps' && <div style={{display: 'grid', gap: 20}}>{scene.items?.map((item, i) => {
      const enter = spring({frame: f-12-i*8, fps, config: {damping: 200}});
      return <div key={i} style={{display:'flex', alignItems:'center', gap:24, opacity:enter, transform:`translateY(${(1-enter)*22}px)`, borderTop:'1px solid #3b3c3a', paddingTop:20, fontSize:31}}><span style={{fontSize:20,color:accent}}>0{i+1}</span>{item}</div>;
    })}</div>}
    <div style={{position:'absolute', top:180, right:88, fontSize:18, color:'#929390'}}>0{index+1}</div>
  </AbsoluteFill>;
};

export const MotionPost: React.FC<Post> = raw => {
  const post = postSchema.parse(raw);
  const f = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  let offset = 0;
  return <AbsoluteFill style={{background:'#151617', color:'#eeeeeb', fontFamily:'Arial, sans-serif'}}>
    <AbsoluteFill style={{backgroundImage:'radial-gradient(#55564f55 1px, transparent 1px)', backgroundSize:'28px 28px', opacity:0.55}}/>
    <div style={{position:'absolute',width:560,height:560,border:`1px solid ${accent}28`,borderRadius:'50%',right:-210,top:-160,transform:`rotate(${f/4}deg) scale(${1+Math.sin(f/40)*0.04})`}}><div style={{position:'absolute',inset:50,border:`1px solid ${accent}22`,borderRadius:'50%'}}/></div>
    <div style={{position:'absolute',top:78,left:88,fontSize:31,letterSpacing:7,fontWeight:700}}>POYARA<span style={{color:accent}}>.</span></div>
    {post.scenes.map((scene,i) => {
      const durationInFrames = Math.round(scene.duration * fps);
      const from = offset; offset += durationInFrames;
      return <Sequence key={i} from={from} durationInFrames={durationInFrames}><Card scene={scene} direction={post.direction} index={i}/></Sequence>;
    })}
    <div style={{position:'absolute',bottom:72,left:88,right:88,borderTop:'1px solid #363735',paddingTop:25,display:'flex',justifyContent:'space-between',fontSize:21,color:'#a2a39e'}}><span dir={post.direction}>{post.footer}</span><span style={{color:accent}}>POYARA / NOTES</span></div>
    <div style={{position:'absolute',bottom:0,height:5,background:accent,width:`${100*(f+1)/durationInFrames}%`}}/>
  </AbsoluteFill>;
};
