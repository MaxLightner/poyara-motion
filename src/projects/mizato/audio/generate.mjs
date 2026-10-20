// Generate an original, royalty-free electronic backing bed with no external assets.
// This is deliberately instrumental: the Persian copy is on-screen, not robotic TTS.
import {mkdirSync, writeFileSync} from 'node:fs';
const rate=22050,duration=50,beat=60/124,n=rate*duration;
const pcm=Buffer.alloc(n*2);
const pitch=(m)=>440*2**((m-69)/12);
const chords=[[45,52,57,60],[41,48,53,57],[48,55,60,64],[43,50,55,59]];
const minor=[69,72,76,72,67,72,76,79,69,72,76,72,65,69,72,76];
const frac=(x)=>x-Math.floor(x);
for(let i=0;i<n;i++){
  const t=i/rate, beatIndex=Math.floor(t/beat), phase=(t%beat)/beat;
  const eighth=Math.floor(t/(beat/2)),step=t%(beat/2);
  const bar=Math.floor(beatIndex/16)%4, chord=chords[bar];
  let v=0;
  // Low kick, tightly damped
  const kt=t%beat;
  v+=.37*Math.exp(-kt*26)*Math.sin(2*Math.PI*(51*kt+35*kt*Math.exp(-kt*22)));
  // Handclap on beats 2 & 4
  if(beatIndex%4===1||beatIndex%4===3){
    const st=kt; v+=.115*Math.exp(-st*31)*(Math.sin(2*Math.PI*2200*st)*Math.sin(2*Math.PI*3377*st));
  }
  // Crisp eighth hats, accent every second hit
  const noise=Math.sin(i*7.221)*Math.sin(i*4.517)*Math.sin(i*.703);
  v+=noise*(eighth%2===0?.073:.042)*Math.exp(-step*110);
  // Warm pulsing bass
  const bass=pitch(chord[0]-12), bt=t%(beat*2);
  v+=.13*Math.sin(2*Math.PI*bass*t)*Math.exp(-bt*2.2);
  // Soft chord pad
  for(const note of chord.slice(1)){
    v+=.023*Math.sin(2*Math.PI*pitch(note+12)*t);
  }
  // A short repeating pluck doubles the visual cadence
  const idx=Math.floor(t/(beat/2))%minor.length, pluckTime=t%(beat/2);
  const pluckHz=pitch(minor[idx]);
  v+=.064*Math.exp(-pluckTime*10)*(Math.sin(2*Math.PI*pluckHz*t)+.25*Math.sin(2*Math.PI*2*pluckHz*t));
  const fade=Math.min(1,t/.6,(duration-t)/1.8);
  const out=Math.max(-1,Math.min(1,v*.72*Math.max(0,fade)));
  pcm.writeInt16LE(Math.round(out*32767),i*2);
}
const h=Buffer.alloc(44);
h.write('RIFF',0);h.writeUInt32LE(36+pcm.length,4);h.write('WAVE',8);h.write('fmt ',12);
h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);
h.writeUInt32LE(rate,24);h.writeUInt32LE(rate*2,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);
h.write('data',36);h.writeUInt32LE(pcm.length,40);
mkdirSync('public',{recursive:true});writeFileSync('public/mizato-bed.wav',Buffer.concat([h,pcm]));
console.log('Generated original 50s Mizato soundtrack.');
