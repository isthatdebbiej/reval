---
name: reval-cases
description: Design robot evaluation scenarios and regression cases from observed failures or coverage gaps. Use when deciding what to test next, including targeted perturbations and held-out cases.
license: Apache-2.0
---

# Reval Cases

Turn evidence-backed weaknesses into valid tests that can change a decision.

## Establish the test objective

- Identify the observed failure or explicit coverage gap.
- Record the task, robot capabilities, operating envelope, and available runner.
- Identify the decision the test supports: reproduce a failure, discriminate
  explanations, catch a regression, or estimate operational performance.
- Use existing scenario/configuration formats where possible.
- If only a hypothesis exists, label the case exploratory.
- Do not invent a failure prevalence from an anecdote.

## Design controlled variations

Choose dimensions supported by the failure: pose, geometry, occlusion, payload,
latency, friction, route width, localization quality, or recovery behavior.
Define ranges from documented capability or user requirements.
Distinguish plausible operating conditions from deliberate stress tests.
Avoid impossible geometry, inaccessible poses, nonexistent sensors, or unsafe commands.
When testing a cause, vary one factor or use an explicit factorial design.
Do not claim causality from several simultaneous changes.

## Define a reproducible case

Record:
- Originating evidence and hypothesis or coverage gap.
- Initial state and reset requirements.
- Controlled variation and fixed factors.
- Expected outcome and evaluator version.
- Independent repetition unit and stopping/timeout rule.
- Treatment of intervention, abort, and infrastructure failure.
- Development or held-out role.
- Required environment and execution status.

A seed is useful but not sufficient; record versions and initialization details.
A proposed case is not an executed experiment.

## Choose coverage honestly

Keep representative operational samples separate from failure-enriched tests.
Do not merge their success rates without a justified sampling-weight model.
Use unseen objects, scenes, or tasks when the claim concerns those forms of transfer.
Preserve a held-out set inaccessible to iterative repair.
Retain successful controls to expose overbroad failure detectors.
Read [the scenario guide](references/scenarios.md) for domain examples.

## Domain examples

Manipulation: reproduce slip under supported payload and acceleration ranges,
then inspect retention after release for placement tasks.
Navigation: vary corridor width within robot clearance requirements and test
localization degradation separately from route blockage.
A robot that cannot reach a shelf provides a feasibility result, not a policy failure.

## Deliver and maintain

Return executable configuration only when the existing runner contract is known.
Otherwise provide a precise scenario specification and missing dependencies.
Prioritize cases by decision value and feasibility, not speculative severity scores.
Record redundant cases and obsolete assumptions when updating a regression set.
Do not automatically operate hardware, generate enormous grids, or consume
external compute just because scenarios have been proposed.
