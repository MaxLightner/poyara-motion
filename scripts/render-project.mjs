/** Uniform entry point for all registered Remotion products. */
import {existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const [project='mizato',output='out/mizato-explainer.mp4',format='landscape',props]=process.argv.slice(2);
const compositions={mizato:{id:'MizatoExplainer',formats:['landscape']},poyara:{id:format==='portrait'?'PoyaraPortrait':'PoyaraSquare',formats:['square','portrait']}};
if(!compositions[project])throw Error('Unknown project. Choose mizato or poyara.');
if(!compositions[project].formats.includes(format))throw Error('Unsupported format for '+project);
if(!output.endsWith('.mp4'))throw Error('Output must have .mp4 extension');
if(!existsSync('node_modules/@remotion/cli/remotion-cli.js'))throw Error('Run npm ci first');
if(project==='mizato'){
 const g=spawnSync(process.execPath,['scripts/music.mjs'],{stdio:'inherit'});
 if(g.status!==0)process.exit(g.status??1);
}
mkdirSync(resolve(output,'..'),{recursive:true});
const args=['node_modules/@remotion/cli/remotion-cli.js','render','src/index.tsx',compositions[project].id,resolve(output),'--codec=h264','--pixel-format=yuv420p','--crf=20','--concurrency=2'];
if(props)args.push(`--props=${resolve(props)}`);
const browser=process.env.REMOTION_BROWSER_EXECUTABLE;
if(browser)args.push(`--browser-executable=${browser}`);
const r=spawnSync(process.execPath,args,{stdio:'inherit'});
process.exit(r.status??1);
