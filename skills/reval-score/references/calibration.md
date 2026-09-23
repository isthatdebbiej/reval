# Calibration guide

Let positive mean task success. On independently labeled, observable episodes:
- TP: predicted success, reference success.
- FP: predicted success, reference failure (false success).
- FN: predicted failure, reference success.
- TN: predicted failure, reference failure.

Report raw counts before rates. False-success rate here is FP/(FP+TN);
false-failure rate is FN/(FN+TP). State this convention because other reports use
"false success" to mean FP/(TP+FP). Report that latter quantity separately if useful.
A zero denominator means undefined, not zero.

Track abstentions separately: coverage = non-abstained / reference-labeled cases.
Compute conditional confusion rates on non-abstained cases and state that exclusion.
Keep unknown-reference cases out of accuracy estimates; report their number.
High accuracy at low coverage may be operationally unusable.

Use episode/group-separated development and validation sets. Human labels must
not simply repeat the model's answer. Reviewer disagreement limits reference certainty.
For small or clustered datasets, do not present frame counts as confidence.

Example: object center entering a target box is insufficient for a task requiring
release and stable support for two seconds. Arrival coordinates in a drifting
localization frame are insufficient for physical navigation success.
