The reported **100% is 4/4 after exclusions**, not success across all attempts. Across all six recorded attempts, **4/6 (66.7%) have verified arrival**. This is a synthetic fixture, not measured robot performance (`evidence.json → provenance`).

| Quantity | Numerator / denominator | Result |
|---|---:|---:|
| Verified arrival among retained attempts | 4 / 4 | 100% |
| Verified arrival across all attempts | 4 / 6 | 66.7% |
| Infrastructure-related non-completions | 2 / 6 | 33.3% |

The four arrivals are `attempts[id=n1–n4]`, each with `status=SUCCEEDED` and `arrival_verified=true`. The excluded attempts are `n5` (`LOCALIZATION_UNAVAILABLE`) and `n6` (`PROCESS_CRASH`), both with arrival unverified.

| Severity | Evidence location | Finding and consequence | Correction |
|---|---|---|---|
| Major | `report`; `exclusion_rule`; `attempts[id=n5,n6]` | Removing unavailable and crashed attempts after the run makes 100% a conditional result. It conceals two non-completions if presented as overall navigation success. | Report both 4/4 among retained attempts and 4/6 across all attempts; list the two infrastructure outcomes separately. |
| Major | `attempts[*].arrival_verified` | Arrival flags support the counts, but no verification method, physical tolerance, coordinate frame, or dwell requirement is supplied. Physical task completion cannot be independently audited. | Supply the arrival criterion and supporting measurements or independently reviewed evidence. |

Excluding infrastructure failures can be appropriate for a narrowly defined policy-quality metric, but those attempts still belong in an end-to-end denominator. Their statuses do not establish whether the policy caused them.

**Scope and uncertainty:** I inspected only the supplied report, six attempt records, exclusion rule, and provenance. No raw traces, evaluator, task contract, or intervention/retry records were available. The smallest additional evidence needed is the intended success contract, arrival-verification evidence, and a predeclared exclusion policy with retry/intervention accounting. These counts describe this fixture only; they do not establish robot reliability or deployment safety.