---
name: reval-compare
description: Compare robot policies or application versions using matched conditions and defensible uncertainty. Use when assessing whether a robotics change improves measured performance.
license: Apache-2.0
---

# Reval Compare

Determine what a comparison supports before declaring a winner.

## Reconstruct the comparison

- Identify A and B, the intended change, task population, and decision criterion.
- Inspect trial records, evaluator versions, reset conditions, and exclusions.
- Compare sensing, controller, robot, inference model, hardware, and time budgets.
- If several factors changed, report a system comparison; do not isolate one cause.
- Distinguish simulation, recorded hardware, and live deployment.
- Treat summary-only evidence as limited; do not invent trial-level observations.

## Align trials and outcomes

Use paired trials when shared initial conditions and execution protocol justify pairing.
Match by scenario/reset identifiers, not merely row order.
For physical trials, consider order effects, wear, calibration drift, and resets.
Record autonomous completion, intervention, task failure, and infrastructure failure.
Compare equivalent scoring rules and evaluator versions.
Preserve all attempts and disclose exclusions.
Do not silently drop failures from time-to-completion comparisons.
If completion time is conditional on success, say so and also report success.

## Choose the independent unit

Frames, control ticks, and multiple windows from one episode are not independent trials.
Repeated seeds do not establish independence across tasks or objects.
Choose the unit matching the claim: episode, scene, task, robot, or site.
Use paired or cluster-aware uncertainty when the design requires it.
Do not claim fleet-wide generalization from one task with many frames.

## Analyze conservatively

- Report counts, denominators, absolute differences, and condition-specific results.
- Use confidence intervals appropriate to the outcome and design.
- State the uncertainty method and its assumptions.
- Separate exploratory slices from predeclared primary comparisons.
- Report effect magnitude and practical relevance alongside uncertainty.
- A nonsignificant result does not establish equivalence.
- Zero observed incidents does not establish zero risk.
- Do not use repeated checking until a favorable result appears without disclosure.

Read [the comparison guide](references/comparison.md) for paired outcomes,
clustered evidence, and confounded examples.

## Deliver the decision

Return:
1. What is comparable and what changed.
2. Recomputed results with trial counts and uncertainty where supportable.
3. Important slices, interventions, exclusions, and resource differences.
4. Supported conclusion: better on specified criteria, trade-off, or inconclusive.
5. Minimal additional evidence needed to resolve uncertainty.

Keep numerical observation separate from causal and deployment claims.
If evidence is insufficient, explain why and preserve valid descriptive findings.
Do not repair the policy, retune the evaluator, or collect new hardware data
without the corresponding user request and authorization.
