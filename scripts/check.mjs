import fs from 'node:fs';
import path from 'node:path';
import {ROOT,SKILLS,readJSON,walk,inside} from './lib.mjs';

const failures=[];
const assert=(condition,message)=>{if(!condition)failures.push(message);};
for(const name of SKILLS) {
  const dir=path.join(ROOT,'skills',name), text=fs.readFileSync(path.join(dir,'SKILL.md'),'utf8');
  assert(text.startsWith('---\n'),'Frontmatter missing: '+name);
  const front=text.split('---\n')[1]??'';
  assert(front.includes('name: '+name+'\n'),'Name mismatch: '+name);
  assert(/^description: .{30,}$/m.test(front),'Description too short: '+name);
  assert(!/\b(TODO|FIXME|PLACEHOLDER)\b/.test(text),'Scaffold marker: '+name);
  assert(text.split('\n').length<=140,'Entrypoint too long: '+name);
  assert(!walk(dir).some(p=>/rubric|answer-key|evals[\\/]/i.test(p)),'Answer material inside skill: '+name);
}
const cases=readJSON(path.join(ROOT,'evals/cases.json'));
const rubrics=readJSON(path.join(ROOT,'evals/private/rubrics.json'));
assert(cases.length===24,'Expected 24 initial cases');
assert(new Set(cases.map(c=>c.id)).size===cases.length,'Duplicate case IDs');
for(const skill of SKILLS.filter(s=>s!=='reval')) for(const domain of ['learning','ros'])
  assert(cases.filter(c=>c.skill===skill&&c.domain===domain).length===2,'Coverage missing: '+skill+'/'+domain);
assert(cases.filter(c=>c.skill==='reval').length===4,'Expected four routing cases');
for(const c of cases) {
  assert(SKILLS.includes(c.skill),'Unknown skill '+c.id);
  assert(c.split==='development','Initial public fixtures must be declared development');
  assert(typeof c.prompt==='string'&&c.prompt.length>20,'Missing prompt '+c.id);
  assert(rubrics[c.id]?.expected.length>=2&&rubrics[c.id]?.critical.length>0,'Missing rubric '+c.id);
  for(const p of c.artifacts) {
    const full=inside(ROOT,p);
    assert(p.startsWith('evals/fixtures/'),'Unexpected artifact path '+p);
    const data=readJSON(full);
    assert(data.provenance?.startsWith('Synthetic fixture'),'Missing synthetic provenance '+p);
  }
}
const docs=[...fs.readdirSync(ROOT).filter(p=>p.endsWith('.md')).map(p=>path.join(ROOT,p)), ...['skills','docs','examples','evals'].flatMap(d=>walk(path.join(ROOT,d)).filter(p=>p.endsWith('.md')))];
for(const p of docs) {
  const text=fs.readFileSync(p,'utf8');
  for(const match of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target=match[1];
    if(/^(https?:|mailto:|#)/.test(target))continue;
    const dest=path.resolve(path.dirname(p),decodeURIComponent(target.split('#')[0]));
    assert(fs.existsSync(dest),'Broken link in '+path.relative(ROOT,p)+': '+target);
  }
}
for(const name of ['manipulation','navigation']) {
  const e=readJSON(path.join(ROOT,'examples',name,'evidence.json'));
  assert(e.provenance.includes('Synthetic'),'Example provenance '+name);
}
if(failures.length) {console.error(failures.join('\n'));process.exit(1);}
console.log(JSON.stringify({status:'passed',skills:SKILLS.length,cases:cases.length,markdown_files:docs.length},null,2));

