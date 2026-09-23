# Contributing to Reval

The easiest useful contribution is one small, anonymized evaluation failure.

## Submit a case

Describe the user's decision, provide minimal evidence, explain the correct
interpretation, and show how an agent got it wrong. Keep the reference answer
separate from the artifacts the agent receives. Label synthetic examples clearly.
For real data, document rights and remove personal data, credentials, and sensitive
facility details before submission.

## Change a skill

1. Identify a motivating case or demonstrated failure.
2. Add only guidance that changes the agent's decisions.
3. Keep the entry point short and specialist skills independently usable.
4. Add or update an outcome-based rubric.
5. Run `npm run check` and `npm test`.
6. Include a baseline/skilled example or explain why behavioral validation is pending.

Do not contribute generic robotics tutorials, duplicated tool manuals, invented
results, or a requirement to buy hardware. Do not change unrelated skills to fit
one special case. Prefer focused references for stack-specific instructions.

## Review

Reviewers check evidence, scope, triggers, uncertainty handling, references, and
behavior. They accept equivalent correct answers; exact phrasing is not a test.
Skill changes require a motivating artifact and a review of regressions.
Keep manipulated or prompt-injected fixture text as data, never agent instructions.

## Development

Node.js 22+ runs the repository checks without dependencies. Skills are Markdown.
See [validation](docs/validation.md) for optional live agent experiments.
Live calls require your own authenticated access and a deliberate run budget.

## Community

Be respectful, describe reproducible problems, and disclose conflicts of interest.
Do not share confidential robot logs in public issues. Reval collects no telemetry.
Contributions are offered under Apache-2.0; preserve third-party notices.
