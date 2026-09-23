# How Reval works

Reval is a library of instructions loaded by a coding agent. The user's existing
tools perform inspection and computation. There is no Reval service, mandatory
telemetry format, simulator dependency, or background robot execution.

## The evidence loop

1. **Intake:** establish the decision and inspect existing artifacts.
2. **Review:** verify reported results or inspect representative episodes.
3. **Criteria:** define observable outcomes and validate the evaluator.
4. **Cases:** turn demonstrated weaknesses into feasible, reproducible scenarios.
5. **Comparison:** assess changes under comparable conditions and report limits.

The entry point routes; it does not automatically run all five stages. Each
specialist returns a reviewable artifact adapted to the user's actual data.

## Example: placement

A report says 80% success. Episodes reveal two operator rescues among eight
completions in ten attempts. The audit distinguishes 60% autonomous completion
from 80% assisted-or-autonomous completion. Failure review may then investigate
the rescues, scoring may examine stability after release, and test design may
propose controlled variations. Those later investigations have not happened
until someone actually performs them.

## Example: navigation

A report excludes crashes and localization failures before calculating 100%
success. The audit preserves the conditional result but also reports completion
over all attempts. A successful action status does not independently establish
physical arrival; frame, localization, tolerance, and dwell criteria matter.

## Where humans remain involved

Humans specify intended tasks and operating conditions, label ambiguous episodes,
resolve disagreement, approve practical trade-offs, and review consequential
claims. An agent's proposed cause is a hypothesis until evidence distinguishes it.
When review is unavailable, the output explicitly remains provisional.

## How a skill is maintained

A useful change begins with a concrete failure of evaluation work. Contributors
supply minimal artifacts and an outcome-based rubric. Maintainers test whether
the revised skill improves decisions without introducing unrelated instructions.
References carry conditional detail; entry points stay concise.

## Relationship to earlier work

The workflow design draws on evals-skills' product-specific review approach.
ASPIRE motivates primitive-level evidence and reusable failure knowledge.
Robium motivates stack-aware testing guidance. Reval concentrates on evaluating
robotics work rather than synthesizing robot-control repairs.
See [attribution](attribution.md).

## Boundaries

Recorded episodes support offline review, not claims that a new controller works
in closed loop. Simulation supports simulation claims. Scoring agreement supports
the evaluator on the evaluated distribution, not hardware certification.
