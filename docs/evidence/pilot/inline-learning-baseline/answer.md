The reported **8/10 autonomous successes is not supported** by the episode records.

- **Two reported successes involved assistance.** `episodes[id=p7]` and `episodes[id=p8]` have `operator_intervention: true`, violating the “no human assistance” requirement in `task`.
- **Six episodes meet the recorded autonomy, release, and stability conditions.** `episodes[id=p1]` through `episodes[id=p6]` report success, no intervention, release, and stability after release. This supports **6/10 (60%) under those recorded conditions**, versus 80% in `report`.
- **Two episodes failed to release.** `episodes[id=p9]` and `episodes[id=p10]` record no release and no stability after release, consistent with their failure labels.

**Full task success remains unverified.** No episode explicitly records whether the correct object was selected or whether placement was on the required shelf. Thus, six episodes are candidates for complete autonomous success, not six independently verified completions. The stability observation duration and evaluation procedure are also unspecified; `configuration` supplies only evaluator and policy identifiers.

Finally, `provenance` explicitly identifies a synthetic fixture, and `setting` is simulation. These findings establish an internal reporting inconsistency; they do not establish measured robot performance, real-world reliability, or generalization.