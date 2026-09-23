import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {ROOT,readJSON,writeJSON,walk} from './lib.mjs';

const [command,...args]=process.argv.slice(2), o={};
for(let i=0;i<args.length;i+=2) {
  if(!args[i]?.startsWith('--')||!args[i+1])throw new Error('Expected --key value');
  o[args[i].slice(2)]=args[i+1];
}
if(command==='pack') {
  if(!o.runs||!o.out)throw new Error('pack --runs DIR --out NEW_DIR');
  if(fs.existsSync(o.out))throw new Error('Output exists');
  const cases=readJSON(path.join(ROOT,'evals/cases.json'));
  const rubrics=readJSON(path.join(ROOT,'evals/private/rubrics.json'));
  const executions=walk(path.resolve(o.runs)).filter(p=>path.basename(p)==='execution.json');
  const map=[];
  for(const file of executions) {
    const run=path.dirname(file), execution=readJSON(file);
    const answer=path.join(run,'answer.md');
    if(!fs.existsSync(answer))continue;
    const spec=cases.find(c=>c.id===execution.case);
    if(!spec)throw new Error('Unknown case in execution');
    const blindId=crypto.randomBytes(8).toString('hex');
    const dest=path.join(o.out,'reviewer',blindId);
    fs.mkdirSync(dest,{recursive:true});
    fs.copyFileSync(answer,path.join(dest,'answer.md'));
    fs.copyFileSync(path.join(run,'workspace/evidence.json'),path.join(dest,'evidence.json'));
    fs.writeFileSync(path.join(dest,'task.txt'),spec.prompt+'\n');
    writeJSON(path.join(dest,'rubric.json'),rubrics[execution.case]);
    writeJSON(path.join(dest,'grade.json'),{
      blind_id:blindId,reviewer:null,status:'unreviewed',
      findings:rubrics[execution.case].expected.map(f=>({criterion:f,score:null,evidence:null})),
      critical_misses:null,unsupported_claims:null,correction_minutes:null,notes:null
    });
    map.push({blind_id:blindId,case:execution.case,agent:execution.agent,condition:execution.condition,
      input_mode:execution.input_mode??'workspace',run:path.resolve(run),execution_status:execution.status});
  }
  writeJSON(path.join(o.out,'coordinator-map.json'),map);
  console.log('Prepared '+map.length+' blind review packets. Share ONLY the reviewer directory.');
} else if(command==='summarize') {
  if(!o.review||!o.out)throw new Error('summarize --review DIR --out FILE');
  if(fs.existsSync(o.out))throw new Error('Output exists');
  const map=readJSON(path.join(o.review,'coordinator-map.json'));
  const rows=map.map(m=>{
    const g=readJSON(path.join(o.review,'reviewer',m.blind_id,'grade.json'));
    if(g.status!=='reviewed')return {...m,review_status:'unreviewed',score:null};
    if(!g.reviewer||!Array.isArray(g.critical_misses)||!Array.isArray(g.unsupported_claims))
      throw new Error('Reviewed grade requires reviewer and issue arrays');
    if(!g.findings.every(f=>[0,1,2].includes(f.score)&&typeof f.evidence==='string'&&f.evidence.length))
      throw new Error('Reviewed findings require scores and evidence');
    return {...m,review_status:'reviewed',score:g.findings.reduce((a,f)=>a+f.score,0),
      possible:2*g.findings.length,critical_misses:g.critical_misses,unsupported_claims:g.unsupported_claims,
      correction_minutes:g.correction_minutes};
  });
  writeJSON(o.out,{status:'descriptive-only',reviewed:rows.filter(r=>r.review_status==='reviewed').length,
    total:rows.length,rows});
  console.log('Wrote descriptive review results; no significance or effectiveness claim is inferred.');
} else throw new Error('Commands: pack, summarize');

