import fs from 'node:fs';
import path from 'node:path';
import {ROOT,readJSON,prepare,freeze,writeJSON} from './lib.mjs';

const [command,...args]=process.argv.slice(2);
function options(values) {
  const out={};
  for(let i=0;i<values.length;i+=2) {
    if(!values[i]?.startsWith('--')||!values[i+1]||values[i+1].startsWith('--'))throw new Error('Expected --key value');
    const key=values[i].slice(2);if(key in out)throw new Error('Duplicate option '+key);out[key]=values[i+1];
  }
  return out;
}
try {
  const o=options(args);
  if(command==='prepare') {
    for(const k of ['case','agent','condition','out'])if(!o[k])throw new Error('Missing --'+k);
    const result=prepare({id:o.case,agent:o.agent,condition:o.condition,out:o.out});
    console.log(JSON.stringify({workspace:result.workspace,prompt:path.join(result.destination,'prompt.txt')},null,2));
  } else if(command==='matrix') {
    if(!o.out)throw new Error('Missing --out');
    if(fs.existsSync(o.out))throw new Error('Refusing to overwrite matrix');
    const rows=[];
    for(const c of readJSON(path.join(ROOT,'evals/cases.json')))
      for(const agent of ['codex','claude-code'])
        for(const condition of ['baseline','skilled'])
          for(let repeat=1;repeat<=3;repeat++)rows.push({case:c.id,agent,condition,repeat});
    writeJSON(o.out,{status:'planned-not-executed',runs:rows.length,source:freeze().digest,rows});
    console.log('Prepared '+rows.length+' planned runs; no model calls made.');
  } else if(command==='freeze') {
    if(!o.out)throw new Error('Missing --out');
    if(fs.existsSync(o.out))throw new Error('Refusing to overwrite freeze manifest');
    writeJSON(o.out,freeze());console.log('Saved content hashes; this is not a held-out study.');
  } else {
    throw new Error('Commands: prepare --case ID --agent codex|claude-code --condition baseline|skilled --out DIR; matrix --out FILE; freeze --out FILE');
  }
} catch(e){console.error(e.message);process.exitCode=1;}
