# Comparison guide

## Paired binary outcomes
For matched scenarios retain the four counts: both succeed, only A, only B,
neither. The net success difference depends on discordant pairs. Use a method
consistent with paired sampling; independent-binomial intervals ignore pairing.
A paired bootstrap can resample independent scenario pairs; cluster by task when
generalizing across tasks. With few clusters, acknowledge weak uncertainty estimates.

## Time and failures
Compare success as well as completion time. Faster successful episodes can reflect
dropping difficult failures. Report conditional time honestly and consider a
predeclared timeout-aware metric; do not retrospectively choose the favorable one.

## Confounding
Changing the model and executor measures their combined system. Different maps,
crowds, sensors, or compute can invalidate an isolated controller claim.
Preserve descriptive counts even when attribution is impossible.

## No difference
A confidence interval crossing zero leaves plausible benefit and harm.
Equivalence requires a justified margin and an appropriate analysis.
Many control ticks from two robot runs still provide only two episode outcomes.
