import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {getVideoMetadata} from '@remotion/renderer';
import {postSchema, framesFor} from '../src/schema.mjs';
const [file = 'out/poyara-sample.mp4', input = 'posts/sample.json', format = 'square'] = process.argv.slice(2);
const post = postSchema.parse(JSON.parse(readFileSync(input, 'utf8')));
const metadata = await getVideoMetadata(resolve(file));
assert.equal(metadata.width, 1080);
assert.equal(metadata.height, format === 'portrait' ? 1350 : 1080);
assert.equal(metadata.codec, 'h264');
// FFmpeg may report full-range 4:2:0 as yuvj420p.
assert.ok(['yuv420p', 'yuvj420p'].includes(metadata.pixelFormat));
assert.equal(metadata.fps, 30);
assert.ok(Math.abs(metadata.durationInSeconds - framesFor(post) / 30) < 0.1);
console.log(JSON.stringify(metadata, null, 2));
