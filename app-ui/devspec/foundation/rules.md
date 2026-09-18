# Operational Rules

Use this artifact for project-operational rules that affect planning, implementation, review, or release. Keep enduring principles in `devspec/constitution.md`; keep product goals and scope boundaries in `project-context.md`.

## Rule Governance

| Boundary | Guidance |
| --- | --- |
| Purpose | Record operational constraints, governance requirements, delivery gates, and evolving project rules. |
| Exclusions | Do not duplicate durable principles from `devspec/constitution.md` or product intent from `project-context.md`. |
| Record quality | Write actionable records with scope, enforcement point, source, and confidence. |
| Optional content | Omit rows or sections that have no project-specific content. |

## Operational Rule Catalog

Use this section for hard constraints, compliance requirements, and forbidden patterns. Use `Type` to distinguish the rule kind instead of creating separate overlapping sections.

| Type | Rule | Scope | Requirement or prohibition | Enforcement point | Evidence, rationale, or preferred alternative | Source | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| architecture | Feature-first ownership | app-ui source | Place product behavior under `src/app/features/<feature>/`; do not create global feature-specific services, models, or components. | Code review and structure review | Keeps ownership local and limits coupling. Use `shared/` only for domain-neutral reuse. | User-provided architecture | confirmed |
| architecture | Dependency direction | app-ui source | Components call facades/use cases; facades call repositories; repositories wrap generated API clients. Components must not call generated clients directly. | Code review | Preserves transport/domain separation and makes API changes localized. | User-provided integration approach | confirmed |
| integration | Contract-first API | app-ui/app-api | Integrate through a versioned OpenAPI contract owned by the Java API repository. Do not share Java source or generated backend internals with the UI repository. | Contract generation and CI | Independent repositories require a stable, reviewable interface. | User-provided multi-repository context | confirmed |
| integration | Compatibility | app-ui/app-api | Prefer additive API changes; breaking changes require explicit versioning or migration and a supported UI/API compatibility matrix. | Release review | Independent releases need a documented compatibility window. | User-provided multi-repository context | confirmed |
| security | Browser/server boundary | app-ui SSR | Do not expose internal backend URLs, secrets, or request-specific credentials to browser bundles or root singleton state. Guard `window`, `document`, and storage access. | Code review, SSR smoke tests | SSR and browser execution have different capabilities and lifecycles. | `angular.json`, `CLAUDE.md`, architecture overview | confirmed |
| security | Authentication decision | app-ui/app-api | Do not implement token/session propagation until the identity provider, OIDC/OAuth flow, gateway ownership, refresh behavior, and SSR strategy are confirmed. | Readiness review | Current repository lacks backend and identity evidence. | Architecture gap | blocked |
| quality | Accessibility | app-ui UI | New UI must meet WCAG AA expectations and pass AXE checks, including keyboard access, focus handling, labels, semantics, and contrast. | Component/E2E validation | Accessibility is a project-level acceptance requirement. | `CLAUDE.md` | confirmed |
| quality | Type safety | app-ui TypeScript | Keep strict compiler checks enabled, avoid `any`, and validate untrusted API data at boundaries. | Typecheck and code review | Prevents contract drift from becoming implicit runtime behavior. | `CLAUDE.md`, `tsconfig.json` | confirmed |
| delivery | Independent builds | app-ui/app-api | Each repository must build, test, version, and publish independently; deploy immutable UI/API artifacts rather than `latest`. | CI/CD pipeline | Multi-repository delivery must not depend on matching branches. | User-provided multi-repository context | confirmed |
| delivery | Validation before completion | app-ui | Run focused tests first, then `npm test` and `npm run build`; production build budgets, SSR, contract generation, and critical journeys must pass before release. | CI and review | Existing Angular production budgets are explicit build constraints. | `package.json`, `angular.json`, `AGENTS.md` | observed |
| documentation | Foundation synchronization | repository | Update architecture, tech stack, codebase structure, coding standards, and rules when a durable decision changes. | Devspec workflow review | Keeps the durable source of truth aligned with implementation. | `AGENTS.md`, devspec command registry | confirmed |

## Delivery Gate Catalog

| Gate | Applies to | Required evidence | Blocking condition | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| Foundation readiness | All repositories | Relevant foundation artifact has sources, confidence, and blockers recorded | Required architecture, stack, boundary, or rule is only present in chat or undocumented | `AGENTS.md`, devspec command registry | confirmed |
| Contract readiness | app-ui/app-api | Versioned OpenAPI document, generated-client version, compatibility result, and error/auth contract | Contract source, generator version, or compatibility window is unknown | User-provided integration approach | confirmed |
| UI validation | app-ui | Focused tests, `npm test`, production `npm run build`, accessibility evidence, and SSR/hydration smoke coverage for affected flows | Test failure, accessibility failure, SSR mismatch, or budget violation | `package.json`, `angular.json`, `CLAUDE.md` | confirmed |
| API release | app-api | Backend tests, OpenAPI publication, backward-compatibility result, and immutable artifact | API behavior changed without contract/version evidence | User-provided multi-repository context | confirmed |
| Cross-repository release | app-ui/app-api/deployment | Tested UI/API compatibility pair, environment configuration, gateway routing, and smoke test result | Pair is outside the supported matrix or runtime endpoints/secrets are unverified | Architecture overview | inferred |

## Work-Item Handling Rules

Use this section for rules that vary by work-item type or workflow stage. These defaults apply unless a stricter project-specific rule or delivery gate supersedes them.

| Work-item type | Stage | Requirement |
| --- | --- | --- |
| bug | Intake and readiness | Capture expected behavior, actual behavior, reproduction steps, impact, and regression context unless blocked. |
| bug | Planning | Include reproduce, fix, and regression-validation work when practical. |
| bug | Implementation | Record regression validation and useful before-and-after snippets for code fixes. |
| bug | Review | Review bugs with meaningful regression risk before closure. |
| security-vulnerability | Intake and readiness | Capture severity, affected scope, attack surface, exploitability, disclosure status, and containment or remediation plan. |
| security-vulnerability | Shared artifacts | Minimize or redact sensitive exploit details when full disclosure is unsafe. |
| security-vulnerability | Planning | Include impact confirmation, remediation, supported-version verification, and follow-up needs when applicable. |
| security-vulnerability | Implementation | Verify remediation across affected supported versions and record backport, release, or advisory follow-up. |
| security-vulnerability | Review | Review security vulnerabilities before closure. |
| all | Review | Check scope adherence, bugs, regressions, missing validation, and rule violations against the finalized brief. |
| all | Changes requested | Route the work item back to implementation before marking it complete. |

## Exceptions and Waivers

Include this section only when exception handling differs from the normal rules or gates.

| Exception | Affected rule or gate | Approval or handling process | Status | Source |
| --- | --- | --- | --- | --- |
|  |  |  | open |  |
