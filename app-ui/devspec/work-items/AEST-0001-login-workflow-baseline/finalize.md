# Implementation Readiness Brief

## Resume State

| Field | Value |
| --- | --- |
| Current stage | finalize |
| Current command | `/devspec.finalize` |
| Current agent | devspec.finalize |
| Run status | complete |
| Current item | baseline |
| Last completed step | Resolved the mock-token boundary question by explicitly constraining auth storage and interceptor behavior to a local mock-only placeholder model. |
| Next required action | Hand off to `/devspec.tasks`. |
| Pending user question | none |
| Question options and examples | none |
| Custom Answer entry or response | User answer: Constrain to mock-only auth placeholder. |
| Recommended option and justification | `/devspec.tasks`; readiness gates are now satisfied and the implementation brief is specific enough for safe planning. |
| Continuation condition | Continue when ordered implementation tasks should be generated for the clarified baseline scope. |
| Resume command | `/devspec.tasks` |
| Resume notes | Treat token storage, Bearer attachment, and 401/403 handling as local mock-only placeholder behavior with no implication of approved real auth architecture. |
| Updated | 2026-09-19 |

## Readiness Assessment

| Field | Value |
| --- | --- |
| Type | feature |
| Severity | |
| Priority | high |
| Status | ready |
| Blocking gates | none |
| Next action | `/devspec.tasks` |
| Decision note | Ready for task planning. The clarified UI, route, and validation scope is specific enough to plan safely because the requested dummy JWT storage, Bearer attachment, and 401/403 handling are now explicitly constrained to a local mock-only placeholder boundary rather than a real auth architecture. |
| Decision inputs | `story.md`, `clarify.md`, accepted `decisions.md` records, `devspec/constitution.md`, `devspec/foundation/codebase-structure.md`, `devspec/foundation/tech-stack.md`, `devspec/foundation/coding-standards.md`, `devspec/foundation/rules.md`, `devspec/architecture/overview.md`, `src/app/app.config.ts`, `src/app/app.routes.ts`, `src/app/app.ts` |

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
| Scope: in | SCOPE-IN-001 | Build the login baseline inside `app-ui` with a feature-owned login UI, signal-based role session state, guarded Admin and Employee routes, and focused auth infrastructure. | `story.md#summary`, `story.md#functional-requirements` FR-001, FR-006, FR-012 through FR-017 | plan within | confirmed |
| Scope: in | SCOPE-IN-002 | Implement the login experience as a responsive Tailwind card layout with a mock logo area, stacked credentials, prominent primary action, and placeholder Forgot password and Sign up affordances. | `story.md#acceptance-criteria` AC-005, AC-012; `story.md#functional-requirements` FR-019 | plan within | confirmed |
| Scope: in | SCOPE-IN-003 | Drive implementation from test-first unit or component specs aligned to the repository's Angular test runner rather than introducing Jasmine or Karma. | `story.md#acceptance-criteria` AC-010; `story.md#nonfunctional-requirements` NFR-003; DEC-004 | plan within | confirmed |
| Scope: in | SCOPE-IN-004 | Keep token storage, Bearer attachment, and 401/403 handling as local mock-only placeholder behavior with no claim of approved provider, gateway, or production session semantics. | User finalize answer; DEC-005 | plan within | confirmed |
| Scope: out | SCOPE-OUT-001 | Do not implement real identity-provider integration, refresh tokens, password-recovery routes, registration routes, or production JWT issuance and validation. | `story.md#planning-signals` SCOPE-001, SCOPE-002 | exclude | confirmed |
| Scope: out | SCOPE-OUT-002 | Do not widen this item into backend repository work, deployment topology changes, or cross-repository compatibility setup. | `story.md#planning-signals` ASM-001; `devspec/foundation/codebase-structure.md` repository and gap rows | exclude | confirmed |
| Acceptance criterion | AC-001 | Admin login succeeds only for username `admin` with shared password `Password123!` and lands on `/dashboard/admin`. | `story.md#acceptance-criteria` AC-001 | implement and validate | pending |
| Acceptance criterion | AC-002 | Employee login succeeds only for username `employee` with shared password `Password123!` and lands on `/dashboard/employee`. | `story.md#acceptance-criteria` AC-002 | implement and validate | pending |
| Acceptance criterion | AC-003 | All other usernames fail with accessible validation feedback and no session creation. | `story.md#acceptance-criteria` AC-003, AC-004 | implement and validate | pending |
| Acceptance criterion | AC-004 | A successful login updates signal state, uses SSR-safe storage handling, and supports logout or invalid-session clearing. | `story.md#acceptance-criteria` AC-006, AC-007 | implement and validate | pending |
| Acceptance criterion | AC-005 | Guards enforce role-protected routes and redirect denied access to `/login`. | `story.md#acceptance-criteria` AC-009; `story.md#functional-requirements` FR-014 through FR-016 | implement and validate | pending |
| Acceptance criterion | AC-006 | Placeholder Forgot password and Sign up affordances remain non-navigating and do not add out-of-scope routes. | `story.md#acceptance-criteria` AC-012; `story.md#edge-cases` EDGE-005 | implement and validate | pending |
| Planning input | PI-001 | The current app surface is still app-shell level only: `src/app/app.ts`, `src/app/app.routes.ts`, and config files exist, but the feature-first folder structure described in foundation artifacts is not yet present in source. | observed `src/app/`; `devspec/foundation/codebase-structure.md` | include structure-establishing tasks inside app-ui | confirmed |
| Planning input | PI-002 | The current `src/app/app.routes.ts` exports an empty route array, so introducing `/login`, `/dashboard/admin`, and `/dashboard/employee` is in-scope and does not require migrating existing feature routes. | observed `src/app/app.routes.ts` | keeps routing tasks localized | confirmed |
| Planning input | PI-003 | `provideClientHydration()` is already configured, so auth state and storage access must preserve deterministic SSR and hydration behavior. | observed `src/app/app.config.ts`; `devspec/foundation/tech-stack.md` | include SSR-safe initialization tasks and validation | confirmed |
| Foundation constraint | FC-001 | Keep solutions simple, readable, and within approved scope, with validation aligned to the implemented behavior. | `devspec/constitution.md` Durable Principles | limits abstraction and scope growth | confirmed |
| Foundation constraint | FC-002 | This is single-repo work in `app-ui`; open backend and deployment gaps are non-blocking only while the work remains local to UI mock behavior. | `meta.md#triage-index`; `devspec/foundation/codebase-structure.md` | prevent cross-repo task branches unless scope changes | confirmed |
| Foundation constraint | FC-003 | Angular 22, signals, lazy routes, SSR, hydration, Tailwind, and Vitest are the established implementation surface. | `devspec/foundation/tech-stack.md` | constrains implementation choices and validation commands | confirmed |
| Architecture constraint | ARCH-001 | Place product behavior under `src/app/features/<feature>/`, keep cross-cutting auth and HTTP concerns in `src/app/core/`, and preserve feature-first dependency direction. | `devspec/foundation/codebase-structure.md#work-areas-and-boundaries`; `devspec/foundation/rules.md` architecture rows | shapes folder, service, and routing task decomposition | confirmed |
| Architecture constraint | ARCH-002 | Guard browser-only APIs, keep initial rendering deterministic, and do not place request-specific session state in root singletons. | `devspec/foundation/coding-standards.md` CS-006; `devspec/foundation/rules.md` Browser/server boundary; `devspec/architecture/overview.md` | shapes storage boundary and SSR-safe signal initialization | confirmed |
| Architecture constraint | ARCH-003 | Real authentication provider, gateway ownership, refresh behavior, and SSR session strategy remain unresolved; this work item is allowed to proceed only because auth storage and interceptor behavior are explicitly constrained to a local mock-only placeholder boundary. | `devspec/architecture/overview.md` Architecture Gaps and Blockers; `devspec/foundation/rules.md` Authentication decision; DEC-005 | keep tasks and validation inside the mock boundary | confirmed |
| Standards constraint | STD-001 | Use standalone Angular APIs, `inject()`, signals, and native control flow; do not add Reactive Forms, FormBuilder, `CommonModule`, `ngClass`, `ngStyle`, explicit `standalone: true`, or explicit OnPush. | `devspec/foundation/coding-standards.md` CS-002, CS-007; `CLAUDE.md`; `story.md#functional-requirements` FR-007 | constrains component and guard implementation | confirmed |
| Standards constraint | STD-002 | Keep strict typing, avoid `any`, and provide accessible semantics and feedback that support WCAG AA validation. | `devspec/foundation/coding-standards.md` CS-001, CS-010; `devspec/foundation/rules.md` Accessibility | shapes component API, auth models, and tests | confirmed |
| Delivery gate | DG-001 | New UI behavior requires focused tests, repository test execution, production build validation, accessibility evidence, and SSR or hydration-sensitive coverage. | `devspec/foundation/rules.md` delivery and UI validation gates | requires explicit validation tasks and proof capture | pending |
| Validation requirement | VR-001 | Prove successful and failed login behavior, validation errors, loading state, session clearing, and route redirection through focused component and auth tests. | `story.md#acceptance-criteria` AC-001 through AC-004, AC-009, AC-010 | validate before completion | pending |
| Validation requirement | VR-002 | Prove the interceptor behavior only within the approved local mock-only auth scope, including token attachment presence or absence and 401 or 403 placeholder handling. | `story.md#acceptance-criteria` AC-008; `devspec/foundation/rules.md` Authentication decision; DEC-005 | validate before completion | pending |
| Validation requirement | VR-003 | Prove SSR-safe storage handling and hydration-safe startup behavior without direct browser API use during server rendering. | `story.md#acceptance-criteria` AC-006; `story.md#nonfunctional-requirements` NFR-004; `story.md#edge-cases` EDGE-001 | validate before completion | pending |
| Repository readiness | MR-001 | `app-ui` is the only implementation repository required for the current baseline and is available in the workspace for editing and validation. | `devspec/foundation/codebase-structure.md` | does not block current local work | confirmed |
| Type-specific requirement | TS-001 | This is a feature work item, so general scope, validation, and review rules apply; bug-only and security-only intake requirements do not apply. | `devspec/foundation/rules.md#work-item-handling-rules`; `meta.md#work-item-record` | keep tasks centered on feature behavior and validation | confirmed |
| Risk or follow-up | RISK-001 | The requested mock JWT storage and outgoing Bearer attachment must stay explicitly labeled as local placeholder-only throughout tasks, implementation, and review so future work does not misread it as approved real auth behavior. | `story.md#functional-requirements` FR-008 through FR-011; `devspec/foundation/rules.md` Authentication decision; DEC-005 | preserve scope wording in planning, implementation, and review | open |
| Risk or follow-up | RISK-002 | The foundation `project-context.md` remains generic, but it does not block this localized feature because the work-item scope, repository target, and validation surface are explicit elsewhere. | observed `devspec/foundation/project-context.md` | record non-blocking foundation gap without widening current scope | open |

## Validation Plan

| ID | Covers | Method or evidence | Expected signal | Status |
| --- | --- | --- | --- | --- |
| VP-001 | AC-001, AC-002, AC-003, VR-001 | Add focused auth service and login component tests that prove successful Admin and Employee login, failed unknown-user login, shared password enforcement, and accessible validation states. | Specs pass and distinguish allowed and rejected credential paths. | pending |
| VP-002 | AC-004, VR-003 | Add focused tests for signal state, logout or invalid-session clearing, and SSR-safe storage access behavior. | Specs pass without direct browser-only API dependence during server-side execution paths. | pending |
| VP-003 | AC-005, AC-009, VR-001 | Add focused guard and routing tests for unauthenticated access, role-mismatch access, and redirect to `/login`. | Specs pass for `authGuard`, `roleGuard`, and route redirection behavior. | pending |
| VP-004 | AC-008, VR-002 | Add focused interceptor tests for missing-token behavior, dummy Bearer attachment, and 401 or 403 placeholder handling, limited to the clarified auth scope. | Specs pass and clearly remain inside the approved placeholder or deferred scope. | pending |
| VP-005 | AC-005, AC-011, AC-012 | Review the rendered login UI for responsive layout, semantic labels, focus states, and non-navigating placeholder-link behavior; record AXE or manual accessibility evidence available in implementation. | The login surface shows no obvious WCAG AA regressions and placeholders do not navigate. | pending |
| VP-006 | DG-001 | Run focused tests first, then `npm test`, then `npm run build`. | Repository tests and production build pass for the affected work. | pending |
| VP-007 | NFR-004, DG-001 | Run a direct SSR or hydration-sensitive smoke check after implementation using the existing app startup surface. | The login baseline renders without SSR or hydration failures caused by auth initialization. | pending |
