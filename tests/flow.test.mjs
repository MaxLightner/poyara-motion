import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const script=JSON.parse(readFileSync('src/projects/mizato/flow-script.json','utf8'));
test('Mizato Flow V2 timeline is contiguous and exactly 63 seconds',()=>{
 assert.equal(script.id,'MizatoFlow');
 assert.equal(script.fps,30);
 assert.equal(script.duration,63);
 assert.ok(script.beats.length>=8);
 script.beats.forEach((b,i)=>{
  assert.equal(b.from,i===0?0:script.beats[i-1].to);
  assert.ok(b.to>b.from);
  assert.ok(b.title.length>8 && b.strap.length>8);
 });
 assert.equal(script.beats.at(-1).to,script.duration);
 assert.ok(existsSync('src/projects/mizato/scenes/Flow.tsx'));
});
