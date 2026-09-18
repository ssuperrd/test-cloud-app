# Implementation Task Plan

## Resume State

| Field | Value |
| --- | --- |
| Current stage | tasks |
| Current command | `/devspec.tasks` |
| Current agent | devspec.tasks |
| Run status | complete |
| Current item | baseline |
| Last completed step | Converted the ready baseline brief into ordered implementation checkpoints with repository target, validation, and done criteria. |
| Next required action | Start implementation with T-001 and keep `implement.md` aligned with task status. |
| Pending user question | none |
| Question options and examples | none |
| Custom Answer entry or response | Optional user guidance mentioned an Aesthetic Clinic project context, but no finalized scope or acceptance criteria require a foundation artifact change before implementation. |
| Recommended option and justification | `/devspec.implement`; the work item is ready and tasks are now specific enough to execute safely. |
| Continuation condition | Continue when implementation should start with the shell reset checkpoint. |
| Resume command | `/devspec.implement` |
| Resume notes | Preserve the approved reset boundary, validate quickly after the first code change, and record deletion or recreation evidence for each touched `src/app/` file. |
| Updated | 2026-09-19 |

## Planning Basis

Sources: `finalize.md#implementation-brief`, `finalize.md#validation-plan`, `finalize.md#readiness-assessment`, `devspec/foundation/codebase-structure.md`, and `devspec/foundation/rules.md`.

Planning note: the optional request to add brief Aesthetic Clinic project context is outside the finalized implementation scope for this reset work item. It does not block task planning and should be handled separately through `devspec/foundation/project-context.md` if you want that durable product context recorded.

## Task Quality Review

| Check | Evidence or gap | Next action |
| --- | --- | --- |
| Scope and source coverage | Covered by T-001 through T-003 using `SCOPE-IN-001`, `SCOPE-IN-002`, `SCOPE-OUT-001`, `SCOPE-OUT-002`, `AC-001` through `AC-006`, `PI-001` through `PI-003`, and `RISK-001`. The optional Aesthetic Clinic context request is out of scope for this finalized reset item and is recorded as a non-blocking note only. | none |
| Validation coverage | Covered by task validations referencing `VP-001` through `VP-006`, including focused shell tests, repository test and build runs, startup smoke checks, accessibility baseline evidence, and scope-boundary review. | none |
| Dependency order and granularity | Three checkpoints preserve fast feedback: implement the shell first, run executable validation second, then confirm evidence and boundary compliance third. This keeps the first edit slice small and validates it before broader closure work. | none |
| Blockers, ambiguity, and risk | No blocking access or scope gaps remain. Main risk is deleting shell-critical files without immediate replacement, addressed by sequencing T-001 before full validation and by keeping out-of-scope files excluded. | none |

## Implementation Tasks

| ID | Scope | Task | Source refs | Target repository | Target area or files | Required access | Depends on | Validation | Done when | Status | Attempt count | Last checkpoint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T-001 | baseline | Replace the current `src/app/` application shell with a minimal accessible Angular shell, including `app.ts`, `app.html`, `app.css`, `app.routes.ts`, `app.config.ts`, optional server-side app config or route files inside `src/app/`, and `app.spec.ts`, while preserving SSR-safe and strictly typed behavior. | `finalize.md` SCOPE-IN-001, SCOPE-IN-002, AC-001, AC-002, PI-001, PI-002, FC-003, ARCH-001, STD-001, STD-002, RISK-001 | app-ui | `src/app/` | edit-and-test | none | Update or add focused app-shell unit coverage and run the closest focused shell spec so the first code slice proves the replacement shell renders and matches the new expectation. | The old app-specific shell implementation is replaced by a minimal Angular shell under `src/app/`, focused shell tests pass, and the tree remains limited to the approved boundary. | complete | 1 | Replaced the starter shell with a minimal clinic baseline and passed `npx ng test --watch=false --include=src/app/app.spec.ts` with 3 tests passed. |
| T-002 | baseline | Run repository validation for the rebuilt shell using existing workspace scripts and capture runtime behavior relevant to the reset. | `finalize.md` AC-002, AC-003, NFR-002, PI-003, DG-001, VR-002, VP-002, VP-003, VP-005, VP-006 | app-ui | repository validation surface for `src/app/` reset | edit-and-test | T-001 | Run `npm test`, run `npm run build`, start the app with `npm start`, and if feasible after build run `npm run serve:ssr:app-ui`; record accessibility baseline evidence for the minimal shell. | The current workspace test and build commands succeed for the reset, local startup succeeds, SSR smoke is attempted when feasible, and accessibility baseline evidence is recorded. | complete | 2 | Review-driven repair proved the clean SSR probe fails without `angular.json` `security.allowedHosts`; after restoring the minimal local host allowlist, tests passed, build passed, and the clean SSR probe returned HTTP 200 on `localhost:4000`. |
| T-003 | baseline | Confirm scope compliance and implementation evidence for deleted and recreated files, validation results, and excluded files that remained untouched. | `finalize.md` AC-004, AC-005, AC-006, SCOPE-OUT-001, SCOPE-OUT-002, VR-001, VP-001, VP-004, RISK-001 | app-ui | `src/app/` reset evidence and work-item implementation record | edit-and-test | T-002 | Review changed files against the approved boundary and record deletion or recreation evidence, validation outcomes, and any justified exceptions in `implement.md` and task checkpoints. | Implementation evidence shows only approved files changed, Devspec artifacts and excluded repository files remained intact, and all validation outcomes are recorded for review handoff. | complete | 2 | Final scope evidence refreshed: `git diff --name-only` now shows `app-ui/angular.json`, `app-ui/src/app/*`, and `app-ui/src/index.html`; the `angular.json` exception is justified by the validated SSR requirement and the document title is aligned to the clinic baseline. |
