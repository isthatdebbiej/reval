# Audit guide

## Denominators
Start with all attempted trials. Give task outcomes and infrastructure failures
separately. A process crash may be outside policy-quality scoring but inside
end-to-end availability. Show both instead of hiding the choice.
Intervention-assisted completion is not autonomous completion. Do not automatically
call every assisted episode a task failure when the contract permits assistance.

## Leakage
Shared frames, episodes, reset states, and selected checkpoints can leak evidence.
A list named "test" is not proof it was held out. Ask when it was consulted.
Distinguish overlap demonstrated by IDs from uncertainty about dataset provenance.

## Manipulation
If 8/10 episodes complete and 2 of those required rescue, autonomous completion
is 6/10 under a no-assistance contract. Retain 8/10 as assisted-or-autonomous
completion if useful. Check post-release stability separately.

## ROS
A Nav2 action status can be internally successful while localization is wrong.
Compare physical arrival evidence, declared tolerances, frame, and dwell condition.
A new controller tested only in empty corridors cannot be causally compared
with an old controller tested among pedestrians.

## Claims
A faster runtime and a different model yield a system-level timing comparison.
One paired episode can illustrate a behavior, not establish a stable speedup.
Ground-truth simulator observations must be disclosed when discussing realism.
