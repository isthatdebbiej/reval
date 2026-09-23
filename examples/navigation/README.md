# ROS navigation audit walkthrough

**Synthetic teaching fixture. Actual Codex output. Author-reviewed, not independently
human-validated.** This is a public development case, not a held-out experiment.

## Input and exact request

Read [evidence.json](evidence.json) and the [request](prompt.txt).
The diagnostic used the common evaluation wrapper documented in the
[effective prompt](../../docs/evidence/pilot/inline-ros-skilled/effective-prompt.txt).
All evidence was supplied inline because workspace reads were blocked by local policy.

Six navigation attempts include four verified arrivals, a localization-unavailable attempt, and a process crash. The headline excludes the latter two.

## Actual output

Read the complete [agent response](actual-output.md), unchanged apart from
documented redaction. Compare the [baseline response](../../docs/evidence/pilot/inline-ros-baseline/answer.md).

The skilled agent distinguishes 4/4 retained completions from 4/6 attempted completions and preserves the two infrastructure outcomes separately. It asks how physical arrival was verified.

## Author review and corrections

[Review notes](author-review.md) record the implementation agent's assessment.
No human review is represented as having occurred.
The baseline also found the central issue, so this walkthrough demonstrates
behavior without establishing an effectiveness improvement.

## Reproduce

Install the skill into a scratch project, provide the fixture, and ask the request.
For the exact inline protocol, use [validation instructions](../../docs/validation.md)
with case audit-ros-01.
Record model version and environment when rerunning.

## Limits

No hardware was operated. No empirical robot-performance claim follows from
synthetic data. The example does not establish average accuracy or deployment readiness.

