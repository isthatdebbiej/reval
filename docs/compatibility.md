# Compatibility

Reval uses portable Agent Skills directories. Claimed support is separated from
installation layout and live behavior.

| Environment | Distribution target | Current evidence |
| --- | --- | --- |
| Codex | .agents/skills | Installation/hash checks passed; inline diagnostic completed; workspace reads blocked |
| Claude Code | .claude/skills | Installation/hash checks passed; live behavior untested |
| Other Agent Skills consumers | Host-specific | Not tested |

## Installer

The documented release candidate pins `skills@1.7.0`.
The upstream CLI documents local-path sources, agent selection, individual skills,
and copy installation: [skills README](https://github.com/vercel-labs/skills).

Run from a scratch project, substituting the actual checkout path:

```sh
npx skills@1.7.0 add /path/to/reval --list
npx skills@1.7.0 add /path/to/reval --agent codex --skill '*' --copy --yes
npx skills@1.7.0 add /path/to/reval --agent claude-code --skill '*' --copy --yes
```

These are local installs, not global modifications. Check the resulting six
SKILL.md files and references. Installing both agents into one project may use
the CLI's canonical shared location; inspect output rather than assuming layout.

For manual installation, copy the desired skill directories to the host's
project-local skill directory. Keep references inside each skill directory.
A router-only installation can triage but cannot load absent specialists.

## Public repository

Repository: [isthatdebbiej/reval](https://github.com/isthatdebbiej/reval).
GitHub-source installation with skills@1.7.0 was verified for all six Codex skills
after the initial push. Claude Code installation was verified from a local source;
live Claude behavior remains untested.

## Activation

Ask naturally or name a skill explicitly. Host-specific slash/dollar syntax may
differ; natural-language requests and explicit skill names are the portable examples.
Do not infer successful activation from file installation alone.

