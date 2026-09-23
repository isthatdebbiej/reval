The reported **100% success rate is 4/4 among retained attempts**, not across all six recorded attempts.

| Metric | Numerator / denominator | Rate |
|---|---:|---:|
| Success among retained attempts | 4 successful / 4 retained | 100% |
| Verified arrival across all attempts | 4 verified arrivals / 6 recorded | 66.7% |
| Excluded attempts | 2 excluded / 6 recorded | 33.3% |

Evidence locations in the supplied `evidence.json`:

- `report.success_rate` and `report.denominator` report 100% with a denominator of 4.
- `attempts[0–3]` (`n1`–`n4`) each have status `SUCCEEDED` and `arrival_verified: true`.
- `attempts[4–5]` record `LOCALIZATION_UNAVAILABLE` and `PROCESS_CRASH`, both with `arrival_verified: false`.
- `exclusion_rule` says unavailable and crashed attempts were removed after the run.

The arithmetic is consistent with those exclusions, but the summary omits their effect. Excluding operational failures after the run makes the reported rate conditional on retention and can overstate overall navigation reliability. A clearer summary is: **“4 of 6 recorded attempts achieved verified arrival (66.7%); success among the 4 retained attempts was 100%, with 2 attempts excluded after the run.”**

Uncertainty: the fixture does not establish whether exclusions were planned beforehand or how arrival was verified. False verification flags establish no verified arrival, not necessarily physical non-arrival. `provenance` explicitly identifies synthetic data, so these figures are not measured robot performance. No applicable navigation audit skill was supplied; this audit used only the inline evidence.