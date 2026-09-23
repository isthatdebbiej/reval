# Scenario guide

## Manipulation
Observed: object falls during transport. Candidate factors: payload, grip,
acceleration. First establish documented object and robot ranges. Keep two fixed
while varying one, or declare a factorial design. Include successful controls.
For placement, score both transport and post-release retention.

## Navigation
Observed: oscillation near a narrow doorway. Check footprint, inflated costmap,
clearance, localization quality, and goal placement. A doorway narrower than the
physical robot is a feasibility boundary; exclude it from an in-envelope policy
claim or label it explicitly as out-of-envelope stress.
Separate dynamic obstacles from localization perturbations.

## Minimum scenario record
Use prose, a table, or the runner's existing configuration. Include origin,
hypothesis, initial/reset state, changed and fixed factors, outcome, repetitions,
timeout, exclusions, split, and dependencies. No Reval schema is required.

## Regression maintenance
Retain cases because they discriminate a meaningful failure, not because they
were once difficult. Record evaluator and environment versions. Retire cases with
a reason. Do not silently redefine expected outcomes after a regression.
