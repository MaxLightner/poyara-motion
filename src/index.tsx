import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {MotionPost} from './motion';
import {MizatoFilm, MIZATO_FRAMES} from './mizato';
import sample from '../posts/sample.json';
import {framesFor, postSchema} from './schema.mjs';

const Root: React.FC = () => <><Composition id="MizatoExplainer" component={MizatoFilm} width={1920} height={1080} fps={30} durationInFrames={MIZATO_FRAMES}/>{[1080, 1350].map(height => <Composition
  key={height} id={height === 1080 ? 'PoyaraSquare' : 'PoyaraPortrait'}
  component={MotionPost} width={1080} height={height} fps={30}
  durationInFrames={framesFor(sample)} defaultProps={postSchema.parse(sample)}
  calculateMetadata={({props}: {props: React.ComponentProps<typeof MotionPost>}) => ({durationInFrames: framesFor(postSchema.parse(props))})}
/>)}</>;
registerRoot(Root);
