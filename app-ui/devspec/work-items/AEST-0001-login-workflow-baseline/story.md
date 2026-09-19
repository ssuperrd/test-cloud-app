# Work-Item Intake

## Resume State

| Field | Value |
| --- | --- |
| Current stage | story |
| Current command | /devspec.story |
| Current agent | devspec.story |
| Run status | complete |
| Current item | baseline |
| Last completed step | Created the baseline work-item intake from manual input and recorded blocking clarifications without inventing unresolved auth details. |
| Next required action | Resolve the blocking clarification set through `/devspec.clarify`. |
| Pending user question | none |
| Question options and examples | none |
| Custom Answer entry or response | External reference: aest-login-0001-login-baseline. Work-item type: feature. Priority: High. |
| Recommended option and justification | /devspec.clarify; the story is otherwise coherent, but the unresolved password rule and navigation decisions would materially change implementation and test design. |
| Continuation condition | Continue when clarification resolves the accepted mock-password rule, the safe redirect route for unauthorized access, and the intended behavior of the Forgot password and Sign up links. |
| Resume command | /devspec.clarify |
| Resume notes | Baseline intake is recorded for a login workflow feature in app-ui. Use clarify to unblock auth success rules and navigation expectations before finalization. |
| Updated | 2026-09-19 |

## Source Record

| Field | Value |
| --- | --- |
| External reference | aest-login-0001-login-baseline |
| Resolved summary shown | Create a login workflow baseline in the existing Angular application with a responsive Tailwind login UI, signal-based auth state, role protection, and a mock JWT boundary. |
| Confirmation basis | `devspec/foundation/provider-integrations.md` |
| User confirmation | confirmed |
| Manual intake used | yes |
| Manual description | Implement a new mock login workflow inside the existing Angular codebase using Signals, functional guards, a functional interceptor, and Tailwind-styled responsive UI that fits the established Screaming Architecture. |
| Manual acceptance criteria | The app provides an accessible responsive login flow, authenticates the `admin` and `employee` mock roles using the shared fixed password `Password123!`, stores and clears a dummy JWT safely, protects role-specific dashboard routes, and defines test-first coverage for the login component, auth service, interceptor, and guards without replacing the repository's established test runner. |

## Summary

| Field | Value |
| --- | --- |
| Summary | Add a login workflow baseline to app-ui with a responsive Tailwind login experience, signal-based mock authentication, protected Admin and Employee routes, and test-first implementation constraints. |

## Change Requests

| ID | Request | Relationship to baseline | Disposition | Source | Recorded |
| --- | --- | --- | --- | --- | --- |

## Description

| Field | Value |
| --- | --- |
| Problem or opportunity | The Angular application needs a new baseline login workflow that establishes role-based mock authentication, session handling, and protected routing in a way that matches the current architectural patterns and future backend integration direction. |
| User or customer impact | Users gain a clear, accessible, mobile-responsive sign-in path and role-appropriate route access, while the team gains a stable authentication baseline for future Java backend integration. |
| Affected components | `src/app/features/login/` feature UI and route surface, `src/app/core/` auth state and HTTP boundary, app routing entries for protected dashboard paths, and focused unit or component test files for the login component, auth service, interceptor, and guards. |
| Affected versions | Current `app-ui` workspace baseline as of 2026-09-19; no Angular, Tailwind, or SSR platform upgrade is requested. |
| Type-specific context | Feature intake for a single cohesive login baseline. The login page should evoke a clean, card-based social-auth layout without copying Instagram branding, implementation must preserve the repository's established Angular testing and SSR constraints, and the Forgot password and Sign up affordances remain non-navigating placeholders in this baseline. |

## Acceptance Criteria

| ID | Criterion | Source | Status |
| --- | --- | --- | --- |
| AC-001 | Valid Admin credentials using the shared fixed password `Password123!` create an Admin session and navigate to `/dashboard/admin`. | user | pending |
| AC-002 | Valid Employee credentials using the shared fixed password `Password123!` create an Employee session and navigate to `/dashboard/employee`. | user | pending |
| AC-003 | Any username other than `admin` or `employee` fails authentication, does not create a token or session, and exposes an accessible error state. | user | pending |
| AC-004 | Empty or invalid login inputs prevent submission success and expose field-level validation feedback. | user | pending |
| AC-005 | The login view renders as a responsive, centered card layout on desktop and a fluid full-width layout on mobile using Tailwind CSS. | user | pending |
| AC-006 | A successful login stores a dummy JWT token and updates the active user Signal without unsafe browser-storage access during SSR or hydration. | user | pending |
| AC-007 | Logout and invalid-session handling clear both the stored token and the active user Signal. | user | pending |
| AC-008 | The auth interceptor attaches a Bearer token only when a token exists and routes HTTP 401 and 403 responses through the defined placeholder handling path. | user | pending |
| AC-009 | Direct access to protected routes is rejected for unauthenticated users and for users whose role does not match the route requirement, and both cases redirect to `/login`. | user | pending |
| AC-010 | The login flow, auth service, interceptor, and guards are covered by test-first unit or component tests that align with the repository's existing Angular test runner. | user | pending |
| AC-011 | The login experience satisfies applicable WCAG AA expectations for labels, keyboard use, focus states, error announcements, and contrast. | user | pending |
| AC-012 | The Forgot password and Sign up affordances render as non-navigating placeholders and do not introduce password-recovery or registration route scope in this baseline. | user | pending |

## Functional Requirements

| ID | Requirement | Source | Status |
| --- | --- | --- | --- |
| FR-001 | Implement one cohesive login workflow inside the existing Angular application rather than as separate unrelated work items. | user | open |
| FR-002 | Authenticate username `admin` as the Admin role. | user | open |
| FR-003 | Authenticate username `employee` as the Employee role. | user | open |
| FR-004 | Reject every other username. | user | open |
| FR-005 | Use the shared fixed password `Password123!` for both allowed usernames. | user | open |
| FR-006 | Manage username, password, validation errors, submission state, loading state, and active session state through Angular Signals. | user | open |
| FR-007 | Do not use Reactive Forms, FormBuilder, or template-driven forms for this login workflow. | user | open |
| FR-008 | Store a dummy JWT token in browser storage after successful authentication and restore or clear it through the auth boundary when appropriate. | user | open |
| FR-009 | Ensure browser-storage access is safe under the repository's Angular SSR and hydration configuration. | user | open |
| FR-010 | Provide a functional HTTP interceptor that attaches `Authorization: Bearer <token>` to outgoing HttpClient requests when a token exists. | user | open |
| FR-011 | Provide centralized placeholder handling for HTTP 401 and 403 responses in preparation for future Java API integration. | user | open |
| FR-012 | Provide an `authGuard` as a functional guard that uses `inject()` and reads the signal-based auth state. | user | open |
| FR-013 | Provide a `roleGuard` as a functional guard that uses `inject()` and reads the signal-based auth state. | user | open |
| FR-014 | Protect `/dashboard/employee` so only an authenticated Employee can access it. | user | open |
| FR-015 | Protect `/dashboard/admin` so only an authenticated Admin can access it. | user | open |
| FR-016 | Redirect unauthenticated and unauthorized users to `/login`. | user | open |
| FR-017 | Fit the login feature into the existing Screaming Architecture and lazy-loading conventions for `app-ui`. | user | open |
| FR-018 | Define unit and component tests before implementation tasks, and use those tests to drive the login component, auth service, interceptor, and guard implementation. | user | open |
| FR-019 | Keep the Forgot password and Sign up affordances as non-navigating placeholders in this baseline. | user | open |

## Nonfunctional Requirements

| ID | Requirement | Source | Status |
| --- | --- | --- | --- |
| NFR-001 | The login UI must use Tailwind CSS and remain responsive across desktop and mobile layouts without introducing proprietary Instagram assets or branding. | user | open |
| NFR-002 | The feature must meet WCAG AA minimum expectations, including focus visibility, semantic labeling, keyboard operation, contrast, and accessible error feedback. | user | open |
| NFR-003 | The implementation must preserve the repository's established Angular testing toolchain and must not introduce Karma or replace the confirmed test runner without an explicit approved decision. | user | open |
| NFR-004 | SSR rendering and hydration must not fail because of direct browser-only storage access. | user | open |
| NFR-005 | The interceptor and guard design should remain compatible with a future Java Spring Boot backend integration without requiring that backend to be implemented in this work item. | user | open |

## Edge Cases

| ID | Case | Source | Status |
| --- | --- | --- | --- |
| EDGE-001 | If the app renders during SSR, auth initialization must avoid direct access to `window`, `localStorage`, or other browser-only APIs until it is safe to do so. | user | open |
| EDGE-002 | If a user reaches a protected dashboard route with no active session, routing must deny access and redirect to `/login`. | user | open |
| EDGE-003 | If an authenticated user has a valid session but the wrong role for the requested dashboard route, routing must deny access without granting partial access and redirect to `/login`. | user | open |
| EDGE-004 | If no token exists, the interceptor must not attach an empty or malformed Authorization header. | user | open |
| EDGE-005 | Forgot password and Sign up remain non-navigating placeholders in this baseline, so the implementation must not create or depend on password-recovery or registration routes for those affordances. | user | open |
| EDGE-006 | If the shared fixed password `Password123!` changes later, tests and mock-auth examples must be updated consistently across the login component, auth service, and related specs. | user | open |

## Planning Signals

| Type | ID | Item | Source | Status |
| --- | --- | --- | --- | --- |
| Assumption | ASM-001 | This work item targets only the `app-ui` repository and does not require coordinated implementation changes in the Java backend or deployment repositories. | user | open |
| Dependency | DEP-001 | Existing Angular 22, Tailwind, SSR, and route infrastructure in `app-ui` provide the baseline environment for this feature. | discovery | open |
| Multi-repo dependency | DEP-REPO-001 | no; related repositories: app-ui | confirmed | open |
| Risk | RISK-001 | The requested Jasmine or Karma wording conflicts with the repository's confirmed Angular test-runner baseline and could cause unnecessary tooling drift if not preserved as a coverage intent rather than a framework switch. | user | open |
| Risk | RISK-002 | SSR-safe session restoration can regress hydration if browser-storage access is not isolated correctly. | intake | open |
| Scope exclusion | SCOPE-001 | Real JWT issuance, cryptographic validation, refresh tokens, registration, password recovery flows, and production identity-provider integration are out of scope for this baseline. | user | open |
| Scope exclusion | SCOPE-002 | Future Java Spring Boot backend implementation is out of scope; this story only prepares the Angular-side auth boundaries for later integration. | user | open |
