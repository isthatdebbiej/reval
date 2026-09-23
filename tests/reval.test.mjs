import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {ROOT,prepare,readJSON,walk,inside,freeze} from '../scripts/lib.mjs';
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'reval-tests-'));
test.after(()=>fs.rmSync(temp,{recursive:true,force:true}));

test('baseline exports only evidence, never skills or grading keys',()=>{
  const out=path.join(temp,'baseline');
  prepare({id:'audit-learning-01',agent:'codex',condition:'baseline',out});
  assert.deepEqual(walk(path.join(out,'workspace')).map(p=>path.basename(p)),['evidence.json']);
  const evidence=readJSON(path.join(out,'workspace/evidence.json'));
  assert.equal(evidence.episodes.length,10);
  assert.equal(evidence.episodes.filter(e=>e.reported_success&&!e.operator_intervention).length,6);
});
test('skilled workspace has six independently packaged skills and no answer material',()=>{
  const out=path.join(temp,'skilled');
  prepare({id:'score-ros-01',agent:'claude-code',condition:'skilled',out});
  const files=walk(path.join(out,'workspace'));
  assert.equal(files.filter(p=>p.endsWith('SKILL.md')).length,6);
  assert(!files.some(p=>/rubric|private|walkthrough|answer/i.test(p)));
});
test('baseline and skilled requests and raw evidence are identical',()=>{
  const a=path.join(temp,'a'),b=path.join(temp,'b');
  prepare({id:'compare-learning-01',agent:'codex',condition:'baseline',out:a});
  prepare({id:'compare-learning-01',agent:'codex',condition:'skilled',out:b});
  for(const p of ['prompt.txt','workspace/evidence.json'])
    assert.equal(fs.readFileSync(path.join(a,p),'utf8'),fs.readFileSync(path.join(b,p),'utf8'));
});
test('unknown cases, conditions and overwrite are rejected',()=>{
  assert.throws(()=>prepare({id:'bad',agent:'codex',condition:'baseline',out:path.join(temp,'bad')}));
  assert.throws(()=>prepare({id:'route-audit',agent:'other',condition:'baseline',out:path.join(temp,'bad')}));
  assert.throws(()=>prepare({id:'route-audit',agent:'codex',condition:'other',out:path.join(temp,'bad')}));
  assert.throws(()=>prepare({id:'route-audit',agent:'codex',condition:'baseline',out:path.join(temp,'baseline')}));
});
test('path traversal cannot reach grading keys through an artifact path',()=>{
  assert.throws(()=>inside(ROOT,'../outside.json'));
});
test('freeze is stable and covers skills and grading references',()=>{
  const a=freeze(),b=freeze();
  assert.equal(a.digest,b.digest);
  assert(a.files['skills/reval-score/SKILL.md']);
  assert(a.files['evals/private/rubrics.json']);
});
test('fixture arithmetic uses correct denominators',()=>{
  const load=id=>readJSON(path.join(ROOT,'evals/fixtures',id,'evidence.json'));
  const nav=load('audit-ros-01');
  assert.equal(nav.attempts.filter(x=>x.arrival_verified).length,4);
  assert.equal(nav.attempts.length,6);
  const rows=load('score-learning-02').rows;
  const labeled=rows.filter(r=>r.reference!=='unknown');
  const scored=labeled.filter(r=>r.prediction!=='unknown');
  assert.equal(labeled.length,5);assert.equal(scored.length,4);
  for(const ref of ['success','failure'])for(const pred of ['success','failure'])
    assert.equal(scored.filter(r=>r.reference===ref&&r.prediction===pred).length,1);
  const pairs=load('compare-learning-01').paired_trials;
  assert.equal(pairs.filter(p=>p.A).length,7);assert.equal(pairs.filter(p=>p.B).length,8);
  assert.equal(pairs.filter(p=>p.A&&!p.B).length,1);assert.equal(pairs.filter(p=>!p.A&&p.B).length,2);
});

test('review pack strips condition metadata and keeps unreviewed grades null',async()=>{
  const {spawnSync}=await import('node:child_process');
  const run=path.join(temp,'review-source','run-1');
  prepare({id:'audit-learning-01',agent:'codex',condition:'skilled',out:run});
  fs.writeFileSync(path.join(run,'answer.md'),'The fixture includes assisted completions.\n');
  const manifest=readJSON(path.join(run,'manifest.json'));
  fs.writeFileSync(path.join(run,'execution.json'),JSON.stringify({...manifest,status:'completed',input_mode:'inline'}));
  const dest=path.join(temp,'review-pack');
  const pack=spawnSync(process.execPath,[path.join(ROOT,'scripts/review.mjs'),'pack','--runs',path.dirname(run),'--out',dest],{encoding:'utf8'});
  assert.equal(pack.status,0,pack.stderr);
  const map=readJSON(path.join(dest,'coordinator-map.json'));
  assert.equal(map.length,1);
  const reviewer=path.join(dest,'reviewer',map[0].blind_id);
  assert(!walk(reviewer).some(p=>/manifest|execution|coordinator|prompt/.test(path.basename(p))));
  const grade=readJSON(path.join(reviewer,'grade.json'));
  assert.equal(grade.status,'unreviewed');
  assert(grade.findings.every(f=>f.score===null));
  const summary=path.join(temp,'summary.json');
  const result=spawnSync(process.execPath,[path.join(ROOT,'scripts/review.mjs'),'summarize','--review',dest,'--out',summary],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  assert.equal(readJSON(summary).reviewed,0);
  assert.equal(readJSON(summary).rows[0].score,null);
});
test('review summary rejects invented reviewed status without evidence',async()=>{
  const {spawnSync}=await import('node:child_process');
  const dest=path.join(temp,'invalid-review');
  fs.mkdirSync(path.join(dest,'reviewer','id'),{recursive:true});
  fs.writeFileSync(path.join(dest,'coordinator-map.json'),JSON.stringify([{blind_id:'id'}]));
  fs.writeFileSync(path.join(dest,'reviewer/id/grade.json'),JSON.stringify({status:'reviewed',reviewer:null}));
  const result=spawnSync(process.execPath,[path.join(ROOT,'scripts/review.mjs'),'summarize','--review',dest,'--out',path.join(temp,'invalid-summary.json')],{encoding:'utf8'});
  assert.notEqual(result.status,0);
  assert(!fs.existsSync(path.join(temp,'invalid-summary.json')));
});

