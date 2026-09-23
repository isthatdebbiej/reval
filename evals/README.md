# Reval development cases

24 public, synthetic cases: 20 specialist assignments (two per domain per
specialist) and four entry-point/boundary assignments. These are teaching and
development data, not observed robot results or a hidden benchmark.

- [cases.json](cases.json): requests and artifact paths.
- [rubrics](private/rubrics.json): evaluator-side expected findings.
- [validation instructions](../docs/validation.md): preparation and live runs.

Each fixture records synthetic provenance. Any future real-data contribution
must include source, rights, consent/redaction status, and collection conditions.
Do not copy grading files into the agent workspace.
The directory name "private" does not make committed data confidential.

Domain balance is intentional: manipulation policies and ROS navigation each
have ten specialist cases. The suite includes successful controls and ambiguity,
not only faults. No robot operation or external network access is needed to
answer these assignments.
