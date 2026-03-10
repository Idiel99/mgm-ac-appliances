# Concurrency Rules

Up to 4 agents may be active, but only in safe combinations.

## Allowed parallel work
- Architect + UI/UX
- Developer + DevOps
- QA + PO

## Not allowed in parallel on the same story
- Architect and Eng Lead
- Eng Lead and Developer
- Developer and QA

## Rule of thumb
Parallelism is allowed only when two roles can work from the same stable upstream artifact without changing the meaning of the work.
