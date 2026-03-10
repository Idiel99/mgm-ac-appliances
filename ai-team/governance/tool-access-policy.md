# Tool Access Policy

## Principle
No agent gets tool access automatically.

## Default assumption
All external tools are denied until explicitly approved.

## Risk levels
- Low: local reads and markdown generation
- Medium: git branch creation, local tests, package install, repo write access
- High: deployment, infra changes, secret access, external API calls, destructive changes

## Recording
Log all granted access under `project/approvals/tool-access-log.md`.
