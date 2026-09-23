# Release and research path

## Candidate status

0.1.0 is a development preview until the evidence gates below are met.
Repository: https://github.com/isthatdebbiej/reval. No published version tag, DOI, or paper is claimed.
No agent-effectiveness improvement is claimed without measured comparisons.

## Before a public tag

- Confirm release author names and authorization for a versioned release.
- Review license, attribution, fixture rights, and redaction.
- Run structural and helper tests in CI and both installation smoke tests.
- Review actual agent outputs and disclose missing live-agent validation.
- Run a budgeted matched study or label results explicitly as preliminary.
- Reproduce the quickstart from a fresh public checkout.
- Record a short terminal walkthrough using the script in
  [the walkthrough guide](walkthrough.md); show fixture provenance and limitations.
- Publish versioned release notes and source hashes; then create the actual tag.

Do not tag a claim stronger than the available evidence. GitHub release creation,
recruitment messages, and public uploads are deliberate external actions.

## Pilot adoption

Seek volunteers from one robot-learning team and one ROS application team.
Ask them to bring an existing evaluation folder and use the audit workflow.
Record opt-in feedback: installation friction, evidence errors, changed decisions,
and whether they returned to use another skill. Do not add background telemetry.
Use the pilot-feedback issue form; protect private data.

## Research question

Do robotics-specific agent skills improve evaluation correctness and reduce human
effort across learning and ROS workflows?

Expand beyond public fixtures to independent projects and unseen cases.
Freeze the skill release, use matched tools/models/budgets, repeat agent runs,
blind reviewers, retain negative results, and report task-level uncertainty.
Add human-designed evaluation references and component ablations where justified.
Keep software effectiveness separate from physical performance.

Publish a technical report only when the described experiments actually exist.
Paper title, venue, authorship, and acceptance remain future decisions.
