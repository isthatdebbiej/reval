# Validation results

**Development preview — 2026-09-23 UTC.** Reval is implemented and locally
installable. Its effectiveness is not established by this small diagnostic.

## What was executed

| Check | Observed result |
| --- | --- |
| Skill and fixture validation | Six skills, 24 synthetic development cases; passed |
| Standard skill validator | All six skills passed; temporary PyYAML dependency only |
| Helper tests | Nine tests passed |
| Single specialist install | reval-audit and its reference installed correctly |
| Codex project-local installation | skills@1.7.0 installed all six skills; all 11 packaged files matched source hashes |
| Claude Code project-local installation | skills@1.7.0 installed all six skills; all 11 packaged files matched source hashes |
| Codex workspace-mode audit | Agent selected reval-audit, but local execution policy blocked file reads; task not completed |
| Codex inline diagnostic | Four completed calls: two fixtures, baseline and skilled, one run each |
| Live Claude Code behavior | Not run; executable unavailable on PATH |
| Full repeated study | Not run; 288-run matrix prepared |
| Independent human review | Not performed |
| Fresh GitHub clone | Structural checks, nine tests, and frozen source hashes passed |
| GitHub-source installer | All six Codex skills installed from isthatdebbiej/reval |
| Physical robot experiments | Not performed or required for these offline checks |

Installation is not proof of activation or correct behavior. The blocked run
returned normally at the transport layer but did not complete its evaluation task.

## Diagnostic findings

| Assignment | Baseline | With Reval |
| --- | --- | --- |
| Manipulation autonomy accounting | Identified two rescues; 6/10 unassisted candidates | Identified two rescues; 6/10 unassisted candidates |
| ROS navigation denominator | Distinguished 4/4 retained from 4/6 attempted | Distinguished 4/4 retained from 4/6 attempted |

Both conditions identified the central issue. Both also limited claims to the
synthetic evidence. **These observations do not demonstrate a Reval advantage.**
The implementation agent reviewed outputs against the known development rubrics;
this was neither blind nor independent human grading.

The cases are useful smoke tests but too easy and too few to establish comparative
benefit. Next evaluation should include harder independent cases involving
interacting faults, conflicting evidence, and ambiguous outcomes.

## Resource observations

Codex CLI: 0.155.0-alpha.9.2. Node.js: v24.19.0. Host: Windows.
The CLI used its default model; the exact backend model version was not emitted
in the captured JSON and was not pinned. This limits reproducibility.

| Inline run | Elapsed seconds | Reported input tokens | Cached input tokens | Output tokens |
| --- | ---: | ---: | ---: | ---: |
| Manipulation baseline | 13.113 | 15,021 | 12,416 | 282 |
| Manipulation skilled | 21.136 | 20,531 | 12,416 | 464 |
| ROS baseline | 15.948 | 14,740 | 12,416 | 370 |
| ROS skilled | 23.006 | 20,251 | 12,416 | 509 |

These are individual local calls, not latency benchmarks or estimates of average
cost. Input counts include agent context, not just fixture text. Monetary cost
was not supplied; it is unknown, not zero. No full-study spending estimate is
claimed from these default-model runs.

## Artifacts

- [Local verification record](evidence/verification.json)
- [Frozen source manifest](evidence/source-manifest.json)
- [Planned 288-run matrix](evidence/planned-matrix.json)
- [Pilot index and file hashes](evidence/pilot/index.json)
- [Manipulation baseline output](evidence/pilot/inline-learning-baseline/answer.md)
- [Manipulation skilled output](evidence/pilot/inline-learning-skilled/answer.md)
- [ROS baseline output](evidence/pilot/inline-ros-baseline/answer.md)
- [ROS skilled output](evidence/pilot/inline-ros-skilled/answer.md)
- [Blocked workspace output](evidence/pilot/learning-skilled/answer.md)
- [Codex installer transcript](install-codex.txt)
- [Claude installer transcript](install-claude.txt)
- [Protocol](validation.md)

Each run directory retains prompt, available effective prompt, transcript, execution
metadata, and stderr. Local username and thread identifiers were redacted; original
and published hashes document those transformations. Original raw files remain
outside this repository. Evidence contains synthetic fixtures only.

## Limits and next gates

Inline mode supplies guidance directly and does not test automatic file loading.
Local runs did not use OS-isolated, fresh-account containers; baseline contamination
from host context cannot be excluded. Do not pool the blocked workspace run with
inline reasoning results.

Before claiming broadly tested workflows: resolve workspace tool access, pin model
versions, use clean isolated environments, execute both agents, budget repetitions,
collect independent cases, and obtain blinded human review. Public fixtures remain
development cases even after a version is frozen.

