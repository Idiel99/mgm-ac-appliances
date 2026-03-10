# Implementation Checklist

## Phase 1 - Create the workspace
- [ ] Create or choose the repo for this AI team
- [ ] Add `ai-team/` at the repo root
- [ ] Copy this starter pack into `ai-team/`
- [ ] Commit the scaffold

## Phase 2 - Read the operating model
- [ ] Read `docs/operating-model.md`
- [ ] Read all files under `governance/`

## Phase 3 - Customize the agents
- [ ] Review all `agents/*/charter.md` files
- [ ] Adjust wording to match your project
- [ ] Decide which specialist agents are enabled initially

## Phase 4 - Create Slack channels
- [ ] Create the channels in `docs/slack/slack-channel-map.md`
- [ ] Pin the messages in `docs/slack/pinned-messages.md`
- [ ] Share the templates in the Slack docs folder

## Phase 5 - Create project truth files
- [ ] Review `project/epics/index.md`
- [ ] Review `project/stories/index.md`
- [ ] Review `project/progress/pipeline-status.md`
- [ ] Review `project/metrics/team-operating-metrics.md`

## Phase 6 - Set repo controls
- [ ] Add `.github/pull_request_template.md`
- [ ] Protect the main branch
- [ ] Block direct pushes to main
- [ ] Require PR review before merge
- [ ] Require QA evidence before merge
- [ ] Require Eng Lead review before merge

## Phase 7 - Dry run the workflow
- [ ] Create a fake epic from the epic template
- [ ] Create a fake story from the story template
- [ ] Walk it through Architect → Eng Lead → Developer → QA → Lead Review → Human Verification

## Phase 8 - Configure OpenClaw locally
- [ ] Create local workspaces for each agent
- [ ] Load each role charter into your local OpenClaw setup
- [ ] Point each agent to the shared `project/` directory
- [ ] Point each agent to its own private memory directory
- [ ] Keep a manual log of requested permissions

## Phase 9 - Run the pilot
- [ ] Pick a low-risk pilot project
- [ ] Create the first real epic and stories
- [ ] Measure time, bugs, and cost
- [ ] Capture lessons in `project/retrospectives/`
