# Agent Critique Model

This system uses directed critique, not free-form critique from every role.

## Critique chain
- PO critiques raw idea completeness and business alignment
- Architect critiques PO artifacts for technical actionability
- Eng Lead critiques Architect output for implementation readiness
- QA critiques Developer output for behavioral correctness
- Eng Lead critiques the final PR for maintainability and risk
- Human critiques final readiness before merge

## Rules
1. A role critiques primarily the immediately previous stage.
2. A role does not rewrite another role's owned section without explicit routing.
3. Critique must be specific and tied to the artifact.
4. Requirement changes route back through the PO.
5. Architecture changes route back through the Architect.
