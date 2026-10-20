import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {postSchema, framesFor} from '../src/schema.mjs';
test('Both samples validate and produce 13-second timelines', () => {
  for (const name of ['sample', 'persian']) {
    const post = postSchema.parse(JSON.parse(readFileSync(`posts/${name}.json`, 'utf8')));
    assert.equal(framesFor(post), 390);
  }
});
test('Reject missing steps and unbounded duration', () => {
  const base = {footer:'Test', scenes:[{layout:'steps',eyebrow:'Test',title:'Test',duration:4}]};
  assert.equal(postSchema.safeParse(base).success, false);
  base.scenes[0].items = ['One']; base.scenes[0].duration = 100;
  assert.equal(postSchema.safeParse(base).success, false);
});
