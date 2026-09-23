import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SKILLS = ['reval', 'reval-audit', 'reval-failures', 'reval-score', 'reval-cases', 'reval-compare'];
export const readJSON = p => JSON.parse(fs.readFileSync(p, 'utf8'));
export const hash = data => crypto.createHash('sha256').update(data).digest('hex');
export function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => {
    const p = path.join(dir, e.name);
    if(e.isSymbolicLink()) throw new Error('Symlinks are not accepted: ' + p);
    return e.isDirectory() ? walk(p) : [p];
  }).sort();
}
export function inside(root, relative) {
  const p = path.resolve(root, relative), rel = path.relative(root, p);
  if (rel === '..' || rel.startsWith('..' + path.sep) || path.isAbsolute(rel))
    throw new Error('Path escapes root: ' + relative);
  return p;
}
export function writeJSON(p, value) {
  fs.mkdirSync(path.dirname(p), {recursive:true});
  fs.writeFileSync(p, JSON.stringify(value, null, 2) + '\n');
}
export function freeze(root = ROOT) {
  const dirs = ['skills', 'evals/fixtures', 'evals/private', 'scripts', 'tests'];
  const paths = dirs.flatMap(d => walk(path.join(root,d)));
  paths.push(path.join(root,'evals/cases.json'),path.join(root,'package.json'));
  const files = Object.fromEntries(paths.sort().map(p => [
    path.relative(root,p).split(path.sep).join('/'), hash(fs.readFileSync(p))
  ]));
  return {algorithm:'sha256', digest:hash(JSON.stringify(files)), files};
}
export function prepare({id, condition, agent, out, root = ROOT}) {
  if(!['baseline','skilled'].includes(condition)) throw new Error('Invalid condition');
  if(!['codex','claude-code'].includes(agent)) throw new Error('Invalid agent');
  const spec = readJSON(path.join(root,'evals/cases.json')).find(c=>c.id===id);
  if(!spec) throw new Error('Unknown case: ' + id);
  const destination = path.resolve(out);
  if(fs.existsSync(destination)) throw new Error('Output already exists; choose a fresh directory');
  fs.mkdirSync(destination,{recursive:true});
  const workspace = path.join(destination,'workspace');
  fs.mkdirSync(workspace);
  for (const artifact of spec.artifacts) {
    const source = inside(root,artifact);
    // The author-side case catalog cannot export grading material.
    if(!artifact.startsWith('evals/fixtures/')) throw new Error('Only fixture artifacts can be exported');
    if(fs.lstatSync(source).isSymbolicLink()) throw new Error('Symlink artifact');
    const name = path.basename(source);
    if(fs.existsSync(path.join(workspace,name))) throw new Error('Duplicate artifact basename');
    fs.copyFileSync(source,path.join(workspace,name));
  }
  if(condition==='skilled') {
    const install = path.join(workspace,agent==='codex'?'.agents':'.claude','skills');
    fs.mkdirSync(install,{recursive:true});
    for(const name of SKILLS) {
      const source=path.join(root,'skills',name);
      walk(source); // reject symlinks before copying
      fs.cpSync(source,path.join(install,name),{recursive:true,errorOnExist:true});
    }
  }
  const prompt=spec.prompt+'\n\nInspect evidence.json. Use applicable installed skills if present. '+
    'Work offline and read-only. Do not run a robot, install packages, or fetch external material. '+
    'State evidence locations and uncertainty. Return your findings in your final response.\n';
  fs.writeFileSync(path.join(destination,'prompt.txt'),prompt);
  const manifest={case:id,agent,condition,prepared_at:new Date().toISOString(),
    source_digest:freeze(root).digest,fixture_hashes:Object.fromEntries(spec.artifacts.map(p=>[p,hash(fs.readFileSync(inside(root,p)))])),
    isolation:'Minimal workspace, not an OS sandbox. Run in a container for independent blinded evaluation.'};
  writeJSON(path.join(destination,'manifest.json'),manifest);
  return {destination,workspace,manifest};
}

