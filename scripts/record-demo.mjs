// Records a real terminal walkthrough; prior model output is explicitly replayed.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT} from './lib.mjs';
const out=process.argv[2]??path.join(ROOT,'docs/demo.cast');
if(fs.existsSync(out))throw new Error('Recording exists; choose another output path');
fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});
const start=Date.now();
fs.writeFileSync(out,JSON.stringify({version:2,width:100,height:32,timestamp:Math.floor(start/1000),
  title:'Reval offline walkthrough: synthetic evidence and replayed actual Codex output',
  env:{TERM:'xterm-256color',SHELL:'node'}})+'\n');
function emit(s) {
  process.stdout.write(s);
  fs.appendFileSync(out,JSON.stringify([(Date.now()-start)/1000,'o',s.replaceAll('\n','\r\n')])+'\n');
}
const pause=()=>new Promise(r=>setTimeout(r,1200));
emit('REVAL / robotics evaluation skills\nSynthetic teaching data. No robot is operated.\n\n');
await pause();
emit('$ node scripts/check.mjs\n');
const checked=spawnSync(process.execPath,['scripts/check.mjs'],{cwd:ROOT,encoding:'utf8'});
emit(checked.stdout+checked.stderr);
if(checked.status!==0)throw new Error('Checks failed');
await pause();
emit('\n$ read examples/manipulation/evidence.json\n');
emit(fs.readFileSync(path.join(ROOT,'examples/manipulation/evidence.json'),'utf8'));
await pause();
emit('\nREPLAY of an actual completed Codex inline diagnostic; this is not a live model call.\n');
emit(fs.readFileSync(path.join(ROOT,'examples/manipulation/actual-output.md'),'utf8'));
await pause();
emit('\nROS counterpart: four verified arrivals out of six attempts; 4/4 retained is conditional.\n');
emit('Both unskilled baselines found the core issues too. No effectiveness advantage is established.\n');
emit('Six skills, 24 public cases, local installer checks. Live Claude and independent study pending.\n');
emit('Read docs/results.md and CONTRIBUTING.md to reproduce or contribute.\n');
console.log('Saved recording: '+out);

