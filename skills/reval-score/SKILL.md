---
name: reval-score
description: Define robot task outcomes and validate evaluators against independent evidence. Use when success criteria, automatic labels, or vision-based judgments may be unreliable.
license: Apache-2.0
---

# Reval Score

Define what the evaluator should measure, then test whether it measures it.

## Establish an outcome contract

- Identify the task, operating conditions, observable evidence, and scoring unit.
- Define completion, failure, timeout, intervention, and unknown outcomes.
- Specify temporal conditions: release, retention, dwell time, and termination.
- Keep task outcome, constraint violations, and assistance as separate fields
  when collapsing them would hide an important difference.
- Record frame, units, tolerances, and clock domain for spatial/temporal checks.
- Distinguish tolerances specified by the user from proposed defaults.
- Do not silently replace the user's intended task with an easier proxy.

## Select an evaluator

Prefer directly supported measurements for measurable criteria.
Use human or vision judgments when the required state is not instrumented.
Do not treat a vision model's confidence as calibrated accuracy.
Allow abstention when occlusion, missing data, or contradictory sensors prevent judgment.
Simulator state may provide an independent reference for a vision evaluator;
do not expose that privileged state to a policy whose contract excludes it.
Inspect benchmark success predicates before treating them as ground truth.

## Build validation examples

Include clear successes, clear failures, boundary cases, and unobservable cases.
For placement: retained grasp, wrong object, transient target entry, and later fall.
For navigation: wrong floor/frame, localization jump, transient goal entry,
operator assistance, and successful status without arrival.
Use independently reviewed labels or instrumented reference checks.
Keep reference construction separate from the evaluator being assessed.
Document reviewer disagreements and adjudication.

## Evaluate agreement

- Split by episode and relevant object/scene/task groups, not adjacent frames.
- Tune thresholds on development data; freeze the evaluator before final tests.
- Define positive class and every metric denominator.
- Report false-success and false-failure counts alongside rates.
- Report abstention coverage and errors conditional on non-abstention.
- Never count unknown reference labels as failures by default.
- Break down results by conditions that may hide systematic errors.
- Include sample counts and uncertainty appropriate to the independent unit.
- Use the supplied data; do not invent a target accuracy or claim validation
  from a handful of illustrative cases.

Read [the calibration guide](references/calibration.md) for confusion counts,
abstention handling, and worked scoring examples.

## Freeze and report

Version the criteria, evaluator configuration, reference labels, and data split.
Do not modify the evaluator to favor a policy being compared.
If final-test findings drive revisions, mark that set as development thereafter.
Return the outcome contract, validation evidence, unresolved errors, and limits.
A passing evaluator test does not establish physical-robot reliability.
When labels are absent, deliver a validation plan instead of fabricated metrics.
