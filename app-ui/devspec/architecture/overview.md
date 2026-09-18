# Architecture Overview

Use this artifact for confirmed high-level architecture context, durable diagram references, ADR pointers, and unresolved architecture gaps. Keep detailed repository layout in `devspec/foundation/codebase-structure.md`, integration contracts in `devspec/foundation/codebase-structure.md#integration-contracts`, diagram queue state in `devspec/architecture/artifact-queue.md`, and full ADR content in ADR files created under `devspec/architecture/decisions/` when needed.

## Architecture Context

Use this section for confirmed architecture facts that affect system understanding across major components, integration relationships, runtime boundaries, and important data movement. Keep implementation file placement in `devspec/foundation/codebase-structure.md#work-areas-and-boundaries` and detailed contracts in `devspec/foundation/codebase-structure.md#integration-contracts`.

| Context type | Subject | Summary | Source | Confidence | Developer relevance |
| --- | --- | --- | --- | --- | --- |
| component | Angular web application | Standalone Angular 22 SSR application with client hydration, lazy routes, feature-first organization, and independently deployable UI artifacts. | `package.json`, `angular.json`, `src/app/app.config.ts` | observed | Keep browser/server code boundaries explicit and validate both direct SSR loads and client navigation. |
| component | Java backend application | Separate repository and deployable service. Backend implementation details and repository location are not present in this workspace. | User-provided integration context | confirmed | Integrate through an explicit HTTP API contract; do not share source files or couple UI code to Java implementation classes. |
| integration | OpenAPI HTTP contract | The Java repository owns the API behavior and publishes a versioned OpenAPI document. The Angular repository consumes a pinned contract and wraps generated clients behind feature repositories. | User-provided integration approach and `devspec/foundation/codebase-structure.md` | confirmed | Treat DTO mapping, compatibility, authentication, errors, pagination, and timestamps as integration concerns. |
| integration | Same-origin gateway or reverse proxy | Recommended deployment routes `/` to Angular SSR and `/api/*` to the Java service, with an internal SSR backend URL where required. | User-provided integration context | inferred | Prefer same-origin browser requests to reduce CORS complexity; never expose internal service URLs in browser bundles. |
| data-flow | UI request lifecycle | Component -> feature facade/use case -> repository abstraction -> generated API client -> Java API; response DTOs are mapped to frontend domain models. | User-provided integration approach | confirmed | Components must not call generated clients directly, and Java transport models must not leak through the UI. |

## Diagram Reference Index

Use this section for confirmed high-level diagrams in this file and links to durable detailed diagrams and optional SVG images. Do not mirror queue status here; track proposed, confirmed, generated, skipped, or blocked diagram work in `devspec/architecture/artifact-queue.md`.

| ID | Scope | Diagram type | Subject | Link or section | Usage notes |
| --- | --- | --- | --- | --- | --- |
|  | architecture, module, feature, workflow, user-journey | flowchart, sequenceDiagram, journey, stateDiagram, classDiagram, erDiagram |  | `devspec/architecture/images/dia-NNN-<diagram-name>.svg`, optional `devspec/architecture/diagrams/dia-NNN-<diagram-name>.md`, optional `devspec/architecture/html/dia-NNN-<diagram-name>.html`, or section anchor |  |

## Decision Reference Index

Use this section only for pointers to durable ADRs or confirmed architecture decisions. Keep metadata, context, outcome, impact, and references in the ADR file.

| Decision | Reference | Architecture relevance |
| --- | --- | --- |
| Feature-first Angular boundaries | `devspec/foundation/codebase-structure.md#work-areas-and-boundaries` | Defines placement and dependency direction for UI, state, domain, and data access. |
| OpenAPI contract ownership | `devspec/foundation/codebase-structure.md#integration-contracts` | Defines independent repository integration and compatibility expectations. |

## Architecture Gaps and Blockers

Use this section only for missing or conflicting architecture facts that prevent reliable planning, diagram generation, or architecture decision recording. Keep implementation blockers in work-item artifacts.

| Gap or blocker | Impact | Required resolution | Resolution state |
| --- | --- | --- | --- |
| Java backend repository path, owner, build system, and deployment repository are unknown | Prevents repository-level source evidence, ownership routing, and end-to-end validation setup | Record repository names/paths, access requirements, API base URLs, contract publication location, and deployment ownership when available | open |
| Authentication provider and browser/SSR session strategy are unspecified | Prevents finalizing token propagation, logout, refresh, and SSR request handling | Confirm OIDC/OAuth provider, token/session mechanism, and gateway responsibility before implementing auth | open |
