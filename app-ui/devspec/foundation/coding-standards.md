# Coding Standards

Use this artifact as a compact, evidence-backed catalog for how developers should write, test, document, and review code. Prefer source references and short rules over copied prose. Omit optional rows or sections with no real standards or evidence.

## Standards Evidence Sources

Use this section only for source documents, configuration files, or representative code that support one or more catalog rows. Do not infer coding standards from paths excluded by `devspec/foundation/discovery-exclusions.md`, such as installed dependencies or generated output.

| Source | Source type | Applies to | Confidence | Notes |
| --- | --- | --- | --- | --- |
| `CLAUDE.md` | standards-doc | Angular, TypeScript, accessibility | confirmed | Requires strict typing, standalone APIs, signals, native control flow, focused components, and WCAG AA practices. |
| `package.json` | manifest | Angular, TypeScript, testing, styling | observed | Confirms Angular 22, TypeScript 6, RxJS, Vitest, SSR, Tailwind, and npm package manager. |
| `angular.json` | framework config | Build, SSR, testing, delivery | observed | Confirms server output, hydration-compatible build setup, production budgets, and Angular unit-test builder. |
| `tsconfig.json` | compiler config | TypeScript and Angular compiler | observed | Confirms strict-related compiler and Angular injection/input checks. |
| User-provided multi-repository context | user-input | API integration and repository boundaries | confirmed | Requires independent Angular and Java repositories integrated through contracts. |

## Standards Catalog

Use this as the single place for language, framework, testing, error-handling, logging, documentation, review, observed-pattern, and anti-pattern guidance. Add a row only when the rule changes how developers should write or review code. Keep examples as references to `Standards Examples`, not long snippets in this table.

Use `Type` values as follows:
- `rule`: explicit standard from a project source, user instruction, or config.
- `observed-pattern`: recurring style or structure found in source evidence.
- `anti-pattern`: forbidden or discouraged pattern with the preferred replacement in `Developer guidance`.
- `expectation`: cross-cutting review or quality expectation that applies across multiple areas.

| ID | Scope | Category | Type | Developer guidance | Evidence | Confidence | Example |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CS-001 | TypeScript | typing | rule | Keep strict compiler checks enabled. Prefer inference when clear, never use `any`, and use `unknown` at untrusted boundaries. | `CLAUDE.md`, `tsconfig.json` | confirmed | n/a |
| CS-002 | Angular | framework | rule | Use standalone components, `input()`, `output()`, `model()`, `inject()`, signals, `computed()`, and native `@if`/`@for`/`@switch`. Do not add `standalone: true` or explicit OnPush configuration. | `CLAUDE.md` | confirmed | EX-001 |
| CS-003 | Angular | architecture | rule | Keep components focused on rendering and user intent. Use feature facades/use cases for orchestration and repositories for API access. | User-provided architecture | confirmed | EX-002 |
| CS-004 | Angular | state | rule | Use component signals for local state, feature signal facades for shared feature state, URL state for bookmarkable query state, and the server as the durable source of truth. | User-provided architecture | confirmed | n/a |
| CS-005 | Angular | data-access | anti-pattern | Do not call generated API clients from components or expose Java transport DTOs throughout the UI. Wrap clients in repositories and map DTOs to frontend domain models. | User-provided OpenAPI approach | confirmed | EX-002 |
| CS-006 | Angular | SSR | rule | Guard browser-only APIs, keep initial rendering deterministic, avoid request-specific state in root singletons, and test direct SSR loads plus hydration. | `angular.json`, `src/app/app.config.ts`, `CLAUDE.md` | confirmed | n/a |
| CS-007 | Angular | templates | anti-pattern | Do not use `CommonModule`, `ngClass`, `ngStyle`, complex template business logic, or manual subscriptions when a focused signal/async pattern applies. | `CLAUDE.md` | confirmed | n/a |
| CS-008 | Features | architecture | rule | Organize by feature. Keep feature internals private, lazy-load top-level features, and promote code to shared only when it is domain-neutral and reusable. | User-provided architecture | confirmed | n/a |
| CS-009 | API integration | error-handling | rule | Use typed OpenAPI clients behind repositories; handle RFC 9457 Problem Details, ISO 8601 UTC timestamps, explicit pagination, and correlation IDs at the boundary. | User-provided integration approach | confirmed | n/a |
| CS-010 | Testing | testing | expectation | Add tests for new behavior, pure transformations, state transitions, meaningful component behavior, API contracts, critical routes, accessibility, and SSR/hydration-sensitive flows. | `angular.json`, `package.json`, `CLAUDE.md` | confirmed | n/a |
| CS-011 | Documentation | documentation | expectation | Update the relevant devspec foundation or work-item artifact when architecture, contract, stack, rule, or delivery assumptions change. | `AGENTS.md`, devspec registry | confirmed | n/a |
| CS-012 | Java integration | versioning | rule | Prefer additive API changes. Breaking changes require an explicit version or migration plan and a documented UI/API compatibility matrix. | User-provided multi-repository context | confirmed | n/a |

## Standards Examples

Include this section only when a short snippet clarifies a style, indentation, naming, grouping, SQL layout, testing pattern, or framework pattern better than a catalog row alone. Keep examples minimal and canonical, usually 5-20 lines. Link each example to one or more catalog row IDs.

### EX-001: Signal-based component state

Applies to: CS-002
Source: `CLAUDE.md`

```ts
readonly isOpen = signal(false);
readonly label = computed(() => this.isOpen() ? 'Close' : 'Open');
```

### EX-002: Feature API boundary

Applies to: CS-003, CS-005
Source: User-provided architecture

```text
Component -> Facade/use case -> Repository -> Generated API client -> Java API
```

## Standards Blockers and Conflicts

Use this section only when standards evidence conflicts, required source evidence is missing, or a project decision is needed before agents can apply a standard.

| Topic | Affected catalog row | Conflict or gap | Evidence | Resolution needed | Status |
| --- | --- | --- | --- | --- | --- |
| <topic> | CS-001 or new | <conflict-or-gap> | <source-paths-or-input> | <question-or-decision> | open |
