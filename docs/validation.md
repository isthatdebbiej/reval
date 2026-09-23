# Reproducing validation

## Offline checks

Node.js 22 or newer is needed for repository tooling; no npm dependencies are required.

```sh
npm run check
npm test
node scripts/eval.mjs freeze --out .runs/freeze.json
node scripts/eval.mjs matrix --out .runs/matrix.json
```

The matrix contains 24 cases × 2 agents × 2 conditions × 3 repetitions = 288
**planned** runs. Generating it makes no model calls. Existing outputs are not
overwritten. Use a new filename or directory for a new experiment.

## Prepare one matched pair

```sh
node scripts/eval.mjs prepare --case audit-learning-01 --agent codex --condition baseline --out .runs/audit-base-1
node scripts/eval.mjs prepare --case audit-learning-01 --agent codex --condition skilled --out .runs/audit-skill-1
```

Both workspaces receive identical raw evidence and prompts. Only the skilled
workspace receives the six skills. The prompt does not name the intended specialist.
The case catalog and rubrics are not copied. Prompts and manifests are outside
the workspace; the runner sends only the prompt to the agent.

This is file minimization, not an OS security boundary. For blinded independent
evaluation, mount only the prepared workspace in a fresh container or restricted
account with no access to the source checkout, grading files, user skills, memory,
or prior conversations. The baseline must not inherit globally installed Reval.
Do not claim the local smoke runs provide this stronger isolation.

## Execute one run

Install and authenticate the relevant agent first. The runner never installs it.

```sh
node scripts/run.mjs --run .runs/audit-base-1 --timeout-seconds 180 --max-runs 1
node scripts/run.mjs --run .runs/audit-skill-1 --timeout-seconds 180 --max-runs 1
```

For Claude Code, prepare with `--agent claude-code` and use the same runner.
The runner restricts Claude's available tools to Read, Glob, and Grep.
Codex runs read-only with ephemeral sessions and ignores user configuration.
Neither mechanism is a replacement for OS isolation or review of external tools.
Optional `--model` pins a model; use the same version and settings within each pair.
Set REVAL_CODEX_BIN or REVAL_CLAUDE_BIN to an executable path if needed.

The timeout and single-run cap bound work, **not money**. Model providers may bill
before timeout. Measure pilot usage, choose an explicit external spending limit,
and confirm access before a full study. The runner records reported token/cost
usage when available; unavailable cost is null, never zero.
On POSIX the timeout terminates the agent process; use a container supervisor to
ensure any descendant tools are also terminated.

## Review without rewarding wording

Keep rubrics in `evals/private/rubrics.json` away from the evaluated agent.
"Private" means evaluator-side separation, not secrecy: these are public development
fixtures. Fresh held-out assignments must be collected separately.

Score expected findings 0 (absent/wrong), 1 (partial), or 2 (correct with evidence).
Record critical misses, unsupported claims, evidence errors, and human correction
time separately. Accept equivalent wording and valid alternative analyses.
Rename outputs to random IDs and hide condition labels before human review;
retain the mapping with the study coordinator, not the reviewer.

Report per-case scores, per-domain scores, denominators, failures, and all runs.
Aggregate by assignment with repeats nested inside assignments; do not pretend
three repeats create three independent task families. Do not use phrase matching
as proof of evaluation correctness.

## Freeze and interpretation

Record source hashes, model/CLI versions, settings, environment, timing, and
grader identity. Choose criteria before inspecting final results.
If failures guide skill changes, retire those cases from held-out status.
The public 24-case suite is a development pilot; it cannot establish broad adoption,
physical reliability, or unbiased generalization to unseen robotics projects.

A complete release study needs both agent environments, independent review,
redaction review, a budgeted repeated experiment, and negative results retained.
See [current status](results.md).

## Tool-free diagnostic mode

When local tool execution is unavailable, prepare a NEW pair and pass
`--input-mode inline` to the runner. It supplies the fixture and, for the skilled
condition, all packaged skill Markdown directly in the prompt. No file inspection
is needed. The effective prompt is retained for reproducibility.

Label these runs **inline-content diagnostics**. They test reasoning under supplied
guidance, not automatic loading or end-to-end artifact inspection. Do not pool them
with workspace-mode results. A transport exit code of zero means the agent returned,
not that it completed the evaluation task; reviewers must classify blocked answers.

## Prepare blinded review packets

```sh
node scripts/review.mjs pack --runs /path/to/prepared-runs --out .runs/review-round-1
node scripts/review.mjs summarize --review .runs/review-round-1 --out .runs/review-summary.json
```

Share only the generated `reviewer/` directory, not `coordinator-map.json`.
Reviewers fill each `grade.json`, including finding-level evidence. Unreviewed
entries remain null; the summarizer never turns missing grades into zero or pass.
Output text may reveal its condition, so assess blinding quality rather than
assuming random filenames make review perfectly blind.

