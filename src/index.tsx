import React from 'react';
import {registerRoot,Composition} from 'remotion';
import {MotionPost} from './projects/poyara/MotionPost';
import {MizatoFilm,MIZATO_FRAMES} from './projects/mizato/scenes/Film';
import sample from './projects/poyara/posts/sample.json';
import {framesFor,postSchema} from './projects/poyara/schema.mjs';
// Only compositions registered here appear in Remotion Studio.
const Root:React.FC=()=><>
 <Composition id="MizatoExplainer" component={MizatoFilm} width={1920} height={1080} fps={30} durationInFrames={MIZATO_FRAMES}/>
 {[1080,1350].map(height=><Composition key={height} id={height===1080?'PoyaraSquare':'PoyaraPortrait'}
  component={MotionPost} width={1080} height={height} fps={30}
  durationInFrames={framesFor(sample)} defaultProps={postSchema.parse(sample)}
  calculateMetadata={({props}:{props:React.ComponentProps<typeof MotionPost>})=>({durationInFrames:framesFor(postSchema.parse(props))})}
 />)}
 </>;
registerRoot(Root);
