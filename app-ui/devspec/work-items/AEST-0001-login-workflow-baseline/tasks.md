# Implementation Task Plan

## Resume State

| Field | Value |
| --- | --- |
| Current stage | tasks |
| Current command | `/devspec.tasks` |
| Current agent | devspec.tasks |
| Run status | complete |
| Current item | baseline |
| Last completed step | Planned the baseline implementation sequence around test-first specs, mock-only auth infrastructure, feature UI and route protection, and final validation. |
| Next required action | Start implementation with the test-first checkpoint. |
| Pending user question | none |
| Question options and examples | none |
| Custom Answer entry or response | none |
| Recommended option and justification | `/devspec.implement`; the task sequence is executable, ordered, and aligned to the finalized brief. |
| Continuation condition | Continue when implementation should begin with T-001. |
| Resume command | `/devspec.implement` |
| Resume notes | Begin with failing specs before implementing auth, interceptor, guards, routes, and login UI. Preserve the mock-only auth placeholder boundary in all code and validation. |
| Updated | 2026-09-19 |

## Planning Basis

Sources: `finalize.md#implementation-brief`, `finalize.md#validation-plan`, `finalize.md#readiness-assessment`, `devspec/foundation/codebase-structure.md`, and `devspec/foundation/rules.md`.

## Task Quality Review

| Check | Evidence or gap | Next action |
| --- | --- | --- |
| Scope and source coverage | Covered `SCOPE-IN-001` through `SCOPE-IN-004`, `AC-001` through `AC-006`, `ARCH-001` through `ARCH-003`, and the placeholder-auth decision `DEC-005` with no scope expansion into backend or deployment work. | none |
| Validation coverage | Covered `VP-001` through `VP-007` through a test-first spec task, two implementation checkpoints that preserve explicit validation surfaces, and one final validation task. | none |
| Dependency order and granularity | Sequenced tasks so failing specs come first, core auth boundary implementation precedes UI and routing, and full validation runs last; checkpoints are large enough to be meaningful but narrow enough to recover safely. | none |
| Blockers, ambiguity, and risk | No active blockers remain. `RISK-001` is carried into task wording so mock token behavior stays clearly local-placeholder-only during implementation and review. | none |

## Implementation Tasks

| ID | Scope | Task | Source refs | Target repository | Target area or files | Required access | Depends on | Validation | Done when | Status | Attempt count | Last checkpoint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T-001 | baseline | Author focused failing specs for the login workflow, auth state, placeholder token lifecycle, interceptor behavior, role guards, route redirection, and SSR-safe storage handling before any production implementation changes. | AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, SCOPE-IN-003, VR-001, VR-002, VR-003, VP-001, VP-002, VP-003, VP-004 | app-ui | `src/app/features/login/`; `src/app/core/`; route-related spec files under `src/app/` | edit-and-test | none | Focused spec execution for newly added or updated auth, login, guard, and interceptor tests should fail only for not-yet-implemented behavior and show explicit expectations for the mock-only boundary. | Test files exist for the login component, auth service or facade, interceptor, and guards; expectations cover shared password `Password123!`, `/login` redirection, placeholder links, and SSR-safe storage behavior. | complete | 1 | Focused test run failed only because the planned auth service, guard, interceptor, and login component modules do not exist yet. |
| T-002 | baseline | Implement the core mock-only auth boundary: signal-based auth state, shared password validation, SSR-safe token storage wrapper, logout or invalid-session clearing, and placeholder interceptor behavior constrained to local dummy-token semantics. | SCOPE-IN-001, SCOPE-IN-004, AC-001, AC-002, AC-003, AC-004, ARCH-002, ARCH-003, STD-001, STD-002, VR-001, VR-002, VR-003, RISK-001 | app-ui | `src/app/core/`; auth-related models, services, storage helpers, and interceptor files | edit-and-test | T-001 | Re-run focused auth service and interceptor specs; expected result is passing coverage for login success or failure, signal transitions, token attach or omit behavior, 401/403 placeholder handling, and SSR-safe storage paths. | Core auth files implement the shared mock credentials and token lifecycle through signals, respect SSR boundaries, and satisfy the focused tests without implying real auth-provider behavior. | complete | 1 | Focused auth, guard, and interceptor tests passed after the core mock-only auth boundary was implemented. |
| T-003 | baseline | Implement the feature UI and route protection: create the login feature slice, placeholder dashboard routes, signal-driven form behavior, non-navigating Forgot password and Sign up affordances, and functional `authGuard` or `roleGuard` wiring that redirects denied access to `/login`. | SCOPE-IN-001, SCOPE-IN-002, AC-001, AC-002, AC-003, AC-005, AC-006, PI-001, PI-002, ARCH-001, STD-001, STD-002, VP-001, VP-003, VP-005 | app-ui | `src/app/features/login/`; `src/app/app.routes.ts`; protected dashboard placeholder components or pages; guard files in `src/app/core/` or feature boundary per repo convention | edit-and-test | T-002 | Re-run focused component, guard, and routing specs; expected result is passing login UI, validation, placeholder-link, role-routing, and redirect behavior. | The app exposes `/login`, `/dashboard/admin`, and `/dashboard/employee`; only allowed credentials succeed; denied access redirects to `/login`; placeholder links do not navigate; focused specs pass. | complete | 1 | Native Angular validation passed for the login component and root app route rendering after the route and UI slice was added. |
| T-004 | baseline | Run the final validation set and capture evidence for delivery gates: focused tests first, then repository tests, production build, accessibility review, and SSR or hydration-sensitive smoke coverage for the login baseline. | DG-001, VP-001, VP-002, VP-003, VP-004, VP-005, VP-006, VP-007, RISK-001 | app-ui | validation surface for `src/app/` login, auth, routing, and SSR startup | edit-and-test | T-003 | Run focused specs, `npm test`, `npm run build`, and the agreed startup or SSR smoke checks; record accessibility and placeholder-auth boundary evidence in implementation artifacts. | Validation evidence shows passing focused specs, repository tests, and build output; login UI and guards satisfy accessibility and placeholder-scope expectations; SSR or hydration checks show no browser-only auth initialization failure. | complete | 2 | Review-driven rerun passed with 0 AXE violations on `/login`, a clean focused Angular test pass for login, guards, and the initial `/` redirect to `/login`, and a clean `tsc -p tsconfig.spec.json --noEmit` result despite stale editor diagnostics on `auth-guards.spec.ts`. |
