# Episode review guide

## Evidence ledger
Use existing IDs. For each observation save episode, timestamp or row,
modality, reviewer, label, uncertainty, and annotation revision.
Record clock offsets and whether alignment was measured or assumed.

## Review loop
Start with coverage plus a random sample. Ask the reviewer to describe what
happened. Consolidate categories after observations, then sample counterexamples.
Keep original notes. Resolve disagreements explicitly or leave them unresolved.

## Frequency
A sample chosen because it failed cannot estimate failure frequency.
Report "7 of 12 reviewed failures" rather than "58% of robot runs".
If an operational random sample exists, calculate prevalence from that sample.

## Cause
Visible slip supports "lost retention". It does not distinguish friction,
grip force, motion acceleration, or perception error without extra evidence.
Localization loss before navigation oscillation supports temporal ordering,
not proof that localization caused the oscillation.

## Review artifact
Prefer the user's existing viewer. If generating HTML, use local media and a
shared timeline, clearly label missing channels, and retain annotations separately.
Verify navigation, timestamps, labels, and export before delivering the artifact.
Do not upload private media to an external service without authorization.
