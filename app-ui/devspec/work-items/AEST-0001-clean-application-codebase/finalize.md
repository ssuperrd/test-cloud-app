# Implementation Readiness Brief

## Resume State

| Field | Value |
| --- | --- |
| Current stage | finalize |
| Current command | `/devspec.finalize` |
| Current agent | devspec.finalize |
| Run status | complete |
| Current item | baseline |
| Last completed step | Completed readiness gap scan against intake, foundation artifacts, architecture overview, and local Angular validation surfaces. |
| Next required action | Generate ordered implementation tasks for the approved reset scope. |
| Pending user question | none |
| Question options and examples | none |
| Custom Answer entry or response | none |
| Recommended option and justification | `/devspec.tasks`; all applicable readiness gates are satisfied for planning. |
| Continuation condition | Continue when task planning should begin for the baseline scope. |
| Resume command | `/devspec.tasks` |
| Resume notes | The reset is confined to `src/app/` replacement with minimal shell equivalents and validation must include build, test, startup, SSR-safe behavior, and deletion-boundary evidence. |
| Updated | 2026-09-19 |

## Readiness Assessment

| Field | Value |
| --- | --- |
| Type | feature |
| Severity | |
| Priority | medium |
| Status | ready |
| Blocking gates | none |
| Next action | `/devspec.tasks` |
| Decision note | Ready for task planning. Scope, repository target, deletion boundary, standards constraints, and validation expectations are specific enough to plan safely without widening into backend, deployment, or foundation remediation work. |
| Decision inputs | `story.md`, accepted `decisions.md` records, `devspec/constitution.md`, `devspec/foundation/codebase-structure.md`, `devspec/foundation/tech-stack.md`, `devspec/foundation/coding-standards.md`, `devspec/foundation/rules.md`, `devspec/architecture/overview.md`, `package.json`, `angular.json`, `src/app/app.config.ts`, `src/app/app.routes.ts`, `src/app/app.spec.ts` |

| ID | Check | Evidence source | Status | Blocking action |
| --- | --- | --- | --- | --- |
| RG-001 | Scope boundary | Implementation Brief | ready | none |
| RG-002 | Acceptance criteria | Implementation Brief | ready | none |
| RG-003 | Dependencies and repository readiness | Implementation Brief; `devspec/foundation/codebase-structure.md` | ready | none |
| RG-004 | Type-specific facts | Implementation Brief; `devspec/foundation/rules.md` | ready | none |
| RG-005 | Validation and delivery risk | Implementation Brief; Validation Plan | ready | none |
| RG-006 | Foundation and architecture alignment | `devspec/constitution.md`; applicable foundation artifacts; `devspec/architecture/overview.md`; applicable ADRs | ready | none |

## Implementation Brief

| Type | ID | Item | Source | Task effect | Status |
| --- | --- | --- | --- | --- | --- |
| Scope: in | SCOPE-IN-001 | Replace the current application implementation inside `src/app/`, including shell component files, route definitions, app configuration files inside `src/app/`, and the app unit test, with a minimal working Angular shell. | `story.md#functional-requirements`, observed `src/app/` file inventory | plan within | confirmed |
| Scope: in | SCOPE-IN-002 | Files currently observed under the reset boundary are `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/app/app.routes.ts`, `src/app/app.config.ts`, `src/app/app.config.server.ts`, `src/app/app.routes.server.ts`, and `src/app/app.spec.ts`; they may be deleted and recreated as needed to achieve the clean baseline. | observed `src/app/` | plan within | confirmed |
| Scope: out | SCOPE-OUT-001 | Do not delete or modify `devspec/`, Angular workspace configuration, package manifests, repository metadata, or documentation. | `story.md#planning-signals` SCOPE-001 | exclude | confirmed |
| Scope: out | SCOPE-OUT-002 | Keep `src/main.ts`, `src/main.server.ts`, `src/server.ts`, `angular.json`, `tsconfig*.json`, and `package.json` out of scope unless a later task records a blocker that requires a minimal compatible adjustment and returns for clarification if that adjustment broadens the approved boundary. | `story.md#edge-cases` EDGE-004, `package.json`, `angular.json` | exclude | confirmed |
| Acceptance criterion | AC-001 | Existing application behavior and components under `src/app/` are removed from the baseline implementation. | `story.md#acceptance-criteria` AC-001 | implement and validate | pending |
| Acceptance criterion | AC-002 | A minimal working Angular application shell is recreated after the reset. | `story.md#acceptance-criteria` AC-002 | implement and validate | pending |
| Acceptance criterion | AC-003 | `npm run build` completes successfully after the rebuild. | `story.md#acceptance-criteria` AC-003, `package.json` | implement and validate | pending |
| Acceptance criterion | AC-004 | Existing Devspec artifacts remain intact throughout implementation. | `story.md#acceptance-criteria` AC-004 | implement and validate | pending |
| Acceptance criterion | AC-005 | No unrelated files outside the agreed application-code scope are deleted. | `story.md#acceptance-criteria` AC-005 | implement and validate | pending |
| Acceptance criterion | AC-006 | Implementation records the deleted files, recreated files, and validation results. | `story.md#acceptance-criteria` AC-006 | implement and validate | pending |
| Planning input | PI-001 | The currently observed route surface is already minimal (`routes` is empty), so the reset can focus on app-shell files without feature migration work. | observed `src/app/app.routes.ts` | keeps task decomposition narrow | confirmed |
| Planning input | PI-002 | The existing unit spec asserts an `h1` containing `Hello, app-ui`; reset tasks should update test expectations to match the new shell rather than preserving obsolete wording by accident. | observed `src/app/app.spec.ts` | include shell test alignment | confirmed |
| Planning input | PI-003 | The current workspace exposes build, test, serve, and built-SSR serve scripts: `npm run build`, `npm test`, `npm start`, and `npm run serve:ssr:app-ui`. | observed `package.json` | plan validation tasks around existing scripts | confirmed |
| Foundation constraint | FC-001 | Keep implementation within approved scope and use the smallest change that satisfies the reset brief. | `devspec/constitution.md` Durable Principles; `story.md#summary` | limits refactor breadth and deletion scope | confirmed |
| Foundation constraint | FC-002 | Repository target is `app-ui` only; this is single-repo work with usable current workspace access. | `devspec/foundation/codebase-structure.md` Repository Configuration; `meta.md#triage-index` | no cross-repo planning branch needed | confirmed |
| Foundation constraint | FC-003 | Angular 22 SSR workspace with client hydration is already configured; replacement code must remain compatible with SSR and deterministic initial render. | `devspec/foundation/tech-stack.md`, `src/app/app.config.ts`, `angular.json` | preserve app-shell SSR compatibility | confirmed |
| Architecture constraint | ARCH-001 | Browser/server boundaries must remain explicit; do not introduce browser-only globals into initial render or root singleton state. | `devspec/architecture/overview.md`, `devspec/foundation/rules.md` | shapes shell implementation and startup validation | confirmed |
| Architecture constraint | ARCH-002 | No backend integration, auth, or deployment topology change is in scope for this reset. Open backend/auth gaps are non-blocking because the requested work is isolated to the local app shell. | `devspec/architecture/overview.md` gaps, `story.md#planning-signals` ASM-001 | prevents task drift into unrelated architecture work | confirmed |
| Standards constraint | STD-001 | Use Angular standalone APIs, signals, and native control flow; do not add `standalone: true`, explicit OnPush, `CommonModule`, `ngClass`, or `ngStyle`. | `devspec/foundation/coding-standards.md` CS-002, CS-007; `CLAUDE.md` | constrains replacement shell structure | confirmed |
| Standards constraint | STD-002 | Keep strict typing and avoid `any`; use accessible semantics suitable for WCAG AA validation. | `devspec/foundation/coding-standards.md` CS-001, CS-010; `devspec/foundation/rules.md` Accessibility | shapes component and test implementation | confirmed |
| Delivery gate | DG-001 | Validation before completion requires focused tests first, then `npm test` and `npm run build`; UI validation also expects accessibility evidence and SSR or hydration-safe smoke coverage for affected flows. | `devspec/foundation/rules.md` Delivery and UI validation gates | requires explicit validation tasks and evidence capture | confirmed |
| Validation requirement | VR-001 | Preserve an auditable deletion boundary by recording which `src/app/` files were removed, recreated, or intentionally preserved and confirming that excluded files were untouched. | `story.md#acceptance-criteria` AC-005, AC-006; `story.md#planning-signals` RISK-001 | validate before completion | pending |
| Validation requirement | VR-002 | Prove the rebuilt shell compiles, renders, and matches updated unit-test expectations using the existing workspace scripts. | `story.md#acceptance-criteria` AC-002, AC-003; `package.json` | validate before completion | pending |
| Repository readiness | MR-001 | `app-ui` is present in the current workspace and is the only repository required for this reset; no additional repository access is needed for planning or implementation. | `devspec/foundation/codebase-structure.md` | does not block | confirmed |
| Type-specific requirement | TS-001 | This is a `feature` work item; bug-only and security-only intake requirements do not apply. General review, scope adherence, and validation rules still apply. | `devspec/foundation/rules.md#work-item-handling-rules`, `meta.md#work-item-record` | keeps planning focused on feature delivery gates | confirmed |
| Risk or follow-up | RISK-001 | Because `src/app/` contains the app config, server config, routes, and tests, deletion should be sequenced with immediate minimal replacement rather than leaving the tree temporarily incomplete. | `story.md#planning-signals` RISK-001, observed `src/app/` | favors staged replacement tasks with quick validation | open |
| Risk or follow-up | RISK-002 | The repository-level project context artifact is still generic and largely unpopulated, but it does not introduce a planning blocker for this internal reset because the work item's local scope, repository, and validation surface are explicit in intake and repository evidence. | observed `devspec/foundation/project-context.md` | record non-blocking foundation gap without widening work | open |

## Validation Plan

| ID | Covers | Method or evidence | Expected signal | Status |
| --- | --- | --- | --- | --- |
| VP-001 | AC-001, VR-001 | Compare the pre-change and post-change `src/app/` file set in implementation evidence and confirm legacy app behavior/files were replaced by the new shell set only within the approved boundary. | Implementation evidence shows deletions and recreations are confined to `src/app/` and legacy app-specific behavior is removed. | pending |
| VP-002 | AC-002, VR-002 | Run focused unit tests for the app shell or the closest available spec, then run `npm test` with updated assertions for the replacement shell. | App shell tests pass and repository test run does not fail because of the reset. | pending |
| VP-003 | AC-003 | Run `npm run build`. | Angular production build completes successfully with no blocking errors. | pending |
| VP-004 | AC-004, AC-005 | Review changed files against the approved scope and confirm no edits landed in `devspec/`, workspace configuration, manifests, docs, or repository metadata unless separately approved. | Diff evidence stays within the approved boundary and excluded files remain untouched. | pending |
| VP-005 | AC-002, NFR-002, DG-001 | Start the app locally with `npm start` and verify the minimal shell renders; if SSR validation is feasible from the built output, run `npm run serve:ssr:app-ui` after build for a direct homepage smoke check. | Local startup succeeds and the homepage renders without SSR or hydration regressions. | pending |
| VP-006 | NFR-004, STD-002, DG-001 | Verify the minimal shell uses accessible landmarks, heading structure, and labels appropriate for a WCAG AA baseline; record any AXE or manual accessibility evidence available in implementation. | No obvious accessibility regressions are introduced in the replacement shell, and evidence is recorded. | pending |
