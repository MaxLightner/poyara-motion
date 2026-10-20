import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {MotionPost} from './motion';
import sample from '../posts/sample.json';
import {framesFor, postSchema} from './schema.mjs';

const Root: React.FC = () => <>{[1080, 1350].map(height => <Composition
  key={height} id={height === 1080 ? 'PoyaraSquare' : 'PoyaraPortrait'}
  component={MotionPost} width={1080} height={height} fps={30}
  durationInFrames={framesFor(sample)} defaultProps={postSchema.parse(sample)}
  calculateMetadata={({props}) => ({durationInFrames: framesFor(postSchema.parse(props))})}
/>)}</>;
registerRoot(Root);
