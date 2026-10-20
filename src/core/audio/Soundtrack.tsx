import React from 'react';
import {Audio, staticFile} from 'remotion';
/** Reusable deterministic backing-track component; audio file lives in public/. */
export const Soundtrack: React.FC<{file:string;volume?:number}> = ({file,volume=0.44}) => <Audio src={staticFile(file)} volume={volume}/>;
