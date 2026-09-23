// Archive only known synthetic pilot outputs; inspect before publishing.
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,hash,readJSON,writeJSON} from './lib.mjs';
const source=process.argv[2];
if(!source)throw new Error('Usage: node scripts/archive-pilot.mjs PILOT_DIRECTORY');
const names=['learning-skilled','inline-learning-baseline','inline-learning-skilled','inline-ros-baseline','inline-ros-skilled'];
const rows=[];
const localUsername=process.env.USERNAME??process.env.USER??'';
const redact=s=>(localUsername?s.replaceAll(localUsername,'USER'):s).replace(/("thread_id"\s*:\s*)"[^"]+"/g,'$1"[redacted]"');
for(const name of names) {
  const dir=path.join(source,name),dest=path.join(ROOT,'docs/evidence/pilot',name);
  if(!fs.existsSync(path.join(dir,'execution.json')))throw new Error('Missing execution '+name);
  fs.mkdirSync(dest,{recursive:true});
  const archived=[];
  for(const file of ['manifest.json','execution.json','prompt.txt','effective-prompt.txt','stdout.jsonl','stderr.txt','answer.md']){
    const p=path.join(dir,file);
    if(!fs.existsSync(p))continue;
    const raw=fs.readFileSync(p,'utf8'),clean=redact(raw);
    fs.writeFileSync(path.join(dest,file),clean);
    archived.push({file,original_sha256:hash(raw),archived_sha256:hash(clean)});
  }
  const execution=readJSON(path.join(dir,'execution.json'));
  rows.push({run:name,case:execution.case,condition:execution.condition,input_mode:execution.input_mode??'workspace',
    source_digest:execution.source_digest,elapsed_ms:execution.elapsed_ms,usage:execution.usage,
    transport_status:execution.status,task_status:name==='learning-skilled'?'blocked-by-local-tool-policy':'answered',
    files:archived});
}
writeJSON(path.join(ROOT,'docs/evidence/pilot/index.json'),{
  provenance:'Actual local Codex runs on synthetic development fixtures.',
  redactions:'Local username replaced with USER; thread identifiers removed. Review all artifacts before publication.',
  model:'CLI default; exact backend model version was not emitted by JSON records and is not pinned.',
  cli:'codex-cli 0.155.0-alpha.9.2',node:process.version,platform:process.platform,
  independent_review:false,rows
});
for(const [example,run] of [['manipulation','inline-learning-skilled'],['navigation','inline-ros-skilled']])
  fs.copyFileSync(path.join(ROOT,'docs/evidence/pilot',run,'answer.md'),path.join(ROOT,'examples',example,'actual-output.md'));
console.log(JSON.stringify(rows.map(({run,task_status,elapsed_ms,usage})=>({run,task_status,elapsed_ms,usage})),null,2));

