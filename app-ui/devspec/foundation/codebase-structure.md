# Codebase Structure

Use this artifact to help developers and agents decide where work belongs, which repositories are usable, and which boundaries must be preserved. Keep repository trees selective and keep optional tables only when they contain real project facts or unresolved blockers.

## Repository Layouts

Use this section for selective repository trees, up to a maximum of 4-5 levels, that help agents decide where to create, edit, or inspect files. Include important source roots, feature or module folders, tests, scripts, config, infrastructure, docs, and routing-critical files when relevant. Do not list every file. When deeper detail is needed for placement, capture the specific path or rule in `Work Areas and Boundaries` instead of expanding the tree. Omit paths excluded by `devspec/foundation/discovery-exclusions.md` unless a project override marks them source-owned.

Use one repository subsection per repository when multiple repositories participate.

### Repository: app-ui

```text
app-ui/
|-- src/
|   |-- app/
|   |   |-- core/                 # app-wide infrastructure and cross-cutting services
|   |   |-- layout/               # shell, navigation, and application chrome
|   |   |-- shared/               # domain-neutral UI, directives, pipes, utilities
|   |   |-- features/             # lazy, feature-owned vertical slices
|   |   |   `-- <feature>/
|   |   |       |-- pages/
|   |   |       |-- components/
|   |   |       |-- domain/
|   |   |       |-- application/
|   |   |       |-- data-access/
|   |   |       `-- <feature>.routes.ts
|   |   |-- app.config.ts
|   |   `-- app.routes.ts
|   |-- main.ts
|   |-- main.server.ts
|   |-- server.ts
|-- public/
|-- angular.json
|-- package.json
|-- tsconfig*.json
`-- devspec/
```

## Repository Configuration

Use this section only when multiple repositories participate in delivery, or when a non-default repository path or access limit affects work. Do not omit it for multi-repo sources or dependencies; record missing role, workspace, path, or access facts as blockers instead of dropping the section.

Rows may be seeded from named `/devspec.extract` input such as `UI - D:\repo-ui, API - D:\repo-api`. Use the supplied label as the initial repository name and role candidate, then refine it with evidence or user confirmation.

| Repository | Role | Local path | In current workspace | Access requirement | Evidence | Confidence | Work guidance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| app-ui | Angular SSR web client | `c:\test-cloud-app\test-cloud-app\app-ui` | yes | current workspace access | workspace structure, `package.json`, `angular.json` | observed | Own UI, client state, SSR shell, generated API-client wrapper, and frontend tests here. |
| app-api | Java backend API | unknown | no or unknown | unknown; confirm repository access | user-provided multi-repository context | confirmed | Own business behavior, persistence, API DTOs, OpenAPI publication, backend tests, and service deployment in its repository. Do not infer its source layout from this repository. |
| deployment | Gateway, environments, and release composition | unknown | no or unknown | unknown; confirm repository access | user-provided multi-repository context | inferred | If present, own routing `/` to Angular SSR and `/api/*` to Java API, immutable artifact selection, secrets, and smoke-test orchestration. |

Do not infer access from repository location. For missing or ambiguous access requirements, ask the user to confirm one value from `devspec/glossary.md#access-requirement-values` before relying on the row.

## Work Areas and Boundaries

Use this section for internal file-placement decisions: modules, bounded contexts, layers, shared packages, ownership or review routing, and cross-cutting code placement. Put a fact here only when it tells future work where code belongs, who owns it, what must not cross a boundary, or how related code should be grouped. Put external service, API, event, database, or cross-repo contracts in `Integration Contracts` instead.

Common area types include `module`, `feature`, `layer`, `service`, `shared-package`, `cross-cutting`, and `ownership`.

| Scope | Area | Area type | Responsibility | Key paths | Boundary or placement rule | Owner or reviewer | Evidence | Confidence | Work guidance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| repository:app-ui | core | cross-cutting | Configuration, auth boundary, HTTP concerns, global error handling | `src/app/core/` | May depend on shared and Angular infrastructure; must not contain feature-specific UI or business workflows. | UI team | User-provided architecture and current `src/app/` shell | inferred | Keep singleton infrastructure here and make browser/server behavior explicit. |
| repository:app-ui | features | feature | End-to-end vertical slices for user capabilities | `src/app/features/<feature>/` | Feature internals stay private; components call facades/use cases, which call repository abstractions. | Feature owner | User-provided architecture | confirmed | Add new product behavior to a feature slice and lazy-load it from its route file. |
| repository:app-ui | shared | shared-package | Domain-neutral reusable UI and utilities | `src/app/shared/` | Must not import feature internals or contain product-specific data-access services. | UI team | User-provided architecture | confirmed | Promote code here only after reuse is demonstrated or the abstraction is clearly domain-neutral. |
| repository:app-ui | data-access | layer | Transport integration and DTO mapping | `src/app/features/<feature>/data-access/` | Generated clients are implementation details; expose repositories/facades to the rest of the feature. | UI and API owners | User-provided OpenAPI approach | confirmed | Keep Java DTO names, nullability, and transport concerns out of templates and domain code. |
| repository:app-api | API contract | integration | HTTP resources and OpenAPI publication | unknown | Java API owns behavior and contract; additive changes are preferred and breaking changes require a migration/version strategy. | API owner | User-provided multi-repository context | confirmed | Publish a pinned contract consumed by the UI pipeline. |

## Integration Contracts

Use this section for boundaries between repositories, modules, services, users, data stores, queues, APIs, providers, or external systems. A row belongs here when future work must preserve a protocol, data shape, dependency direction, lifecycle, or validation expectation.

| Source scope | Target or system | Contract or interface | Direction | Data or protocol | Required handling | Evidence | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| repository:app-api | repository:app-ui | Versioned OpenAPI HTTP API | bidirectional | JSON over HTTPS; `/api/v1/...`; request/response DTOs | API publishes contract; UI pins and generates client; compatibility is checked before release. | User-provided integration approach | confirmed |
| repository:app-api | repository:app-ui | Error contract | outbound | RFC 9457 Problem Details | UI maps known problem types to user-safe messages and preserves correlation IDs for diagnostics. | User-provided integration approach | confirmed |
| repository:app-api | repository:app-ui | Time and pagination contract | outbound | ISO 8601 UTC timestamps; explicit page/size/sort metadata | Map transport types at the repository boundary; do not assume local timezone or implicit pagination. | User-provided integration approach | confirmed |
| repository:app-ui | repository:app-api | Authentication and correlation headers | outbound | OIDC/OAuth session or token strategy; correlation ID | Confirm provider and gateway ownership before implementation; never expose internal service URLs or secrets. | Architecture gap and user-provided integration context | blocked |

## Structure Gaps and Blockers

Use this section only for missing or conflicting facts that prevent reliable repository selection, file placement, access validation, ownership routing, or integration handling. Do not duplicate normal open risks from work-item artifacts.

| Gap or blocker | Affected section | Impact | Required resolution | Status |
| --- | --- | --- | --- | --- |
| Java repository path, owner, build system, and API contract publication location are unknown | Repository Configuration, Integration Contracts | Cannot link backend evidence, automate contract generation, or assign review ownership | Provide repository path/URL, access requirement, owner, build tool, and OpenAPI artifact location | open |
| Deployment repository and gateway topology are unknown | Repository Configuration, Integration Contracts | SSR backend URL, CORS policy, routing, and release validation remain provisional | Confirm whether deployment is managed here, in a third repository, or by a platform team | open |
