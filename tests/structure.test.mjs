import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const root='src/projects/mizato/';
const script=JSON.parse(readFileSync(root+'script.json','utf8'));
test('Mizato script duration and scene files match the 50s, 30fps registered composition',()=>{
 assert.equal(script.id,'MizatoExplainer');
 assert.equal(script.fps,30);
 assert.equal(script.scenes.reduce((n,x)=>n+x.duration,0),50);
 for(const scene of script.scenes) {
  assert.ok(scene.caption.length>8);
  const moduleName={opening:'Opening',scan:'Scan',compare:'Compare',upsell:'Upsell',service:'Service',final:'Final'}[scene.id];
  assert.ok(existsSync(root+`scenes/${moduleName}.tsx`));
 }
});
test('Core modules and branded projects exist',()=>{
 for(const path of ['src/core/animation/easing.ts','src/core/components/MobileDevice.tsx','src/core/typography/PersianText.tsx','src/core/audio/Soundtrack.tsx','src/projects/poyara/MotionPost.tsx','src/projects/chido/README.md','src/projects/kamcheh/README.md']){
  assert.ok(existsSync(path),path);
 }
});
