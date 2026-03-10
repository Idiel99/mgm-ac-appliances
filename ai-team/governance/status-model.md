# Status Model

## Allowed statuses
- `DRAFT`
- `READY_FOR_ARCHITECTURE`
- `READY_FOR_ENGINEERING`
- `READY_FOR_DEVELOPMENT`
- `READY_FOR_QA`
- `READY_FOR_LEAD_REVIEW`
- `READY_FOR_USER_VERIFICATION`
- `APPROVED_FOR_MERGE`
- `DONE`
- `BLOCKED`

## Rules
1. Only the PO moves work across main pipeline stages.
2. QA controls readiness for user verification.
3. No role may skip a status.
4. Blocked work must include a reason and next action.
