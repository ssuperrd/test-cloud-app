# Technology Stack

Use this artifact for technology, version, support, hosting, and delivery facts that affect implementation or validation decisions.

## Stack Documentation Policy

| Policy area | Requirement |
| --- | --- |
| Evidence sources | Use manifests, lockfiles, framework config, CI config, infrastructure config, and docs as version evidence. |
| Discovery boundary | Do not inspect dependency folders, generated output, or excluded paths listed in `devspec/foundation/discovery-exclusions.md`. |
| Inventory scope | Use one stack inventory table per repository, deployable unit, or named project component. |
| Categories | Use clear categories such as `Language`, `Runtime`, `Framework`, `Library`, `Database`, `Service`, `Tooling`, `Hosting`, or `Delivery Constraint`. |
| Support status | Record support status from official release, lifecycle, or support pages when practical. |
| Unknown support | Use `no LTS channel`, `managed service`, or `unknown - needs lookup` instead of defaulting to `n/a`. |
| Not applicable support | Use `n/a` only when version support does not apply. |
| Verification date | Fill `Verified on` with the date the version or support status was checked. |
| Implementation impact | Include guidance when a technology affects coding, validation, hosting, compatibility, or support decisions. |
| Blocked facts | Record blocked stack, version, support, or hosting details as inventory rows with `blocked` confidence, the evidence gap, and the next action. |
| Row quality | Omit rows for technologies that are not confirmed, observed, inferred, or blocked by a specific evidence gap. |

## Stack Inventory

### Project: app-ui

| Category | Technology | Project version or configuration | Support status | Evidence | Confidence | Verified on | Implementation impact or next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Runtime | Node.js | Version not declared in repository; npm `11.19.0` is pinned as package manager | unknown - needs lookup | `package.json` | observed | 2026-09-19 | Pin the supported Node.js version in repository or CI configuration and use it consistently for local, CI, and SSR builds. |
| Language | TypeScript | `~6.0.2` | unknown - needs lookup | `package.json`, `tsconfig.json` | observed | 2026-09-19 | Keep strict compiler settings enabled and avoid `any`; validate external data as `unknown`. |
| Framework | Angular | `^22.1.0` | active or LTS status needs official verification | `package.json`, `angular.json` | observed | 2026-09-19 | Use standalone components, signals, lazy routes, SSR, hydration, and Angular-native control flow. |
| Library | RxJS | `~7.8.0` | unknown - needs lookup | `package.json` | observed | 2026-09-19 | Use for HTTP composition, cancellation, streams, and external event sources; do not use it as a default replacement for local signals. |
| Framework capability | Angular SSR and hydration | `@angular/ssr` `^22.1.8`; server output enabled; `provideClientHydration()` configured | tied to Angular support status | `package.json`, `angular.json`, `src/app/app.config.ts` | observed | 2026-09-19 | Keep rendering deterministic, guard browser-only APIs, and validate direct SSR loads plus hydration. |
| Styling | Tailwind CSS | `^4.1.12` with PostCSS integration | unknown - needs lookup | `package.json` | observed | 2026-09-19 | Use project design tokens and accessible responsive styles; preserve production component-style budgets. |
| Testing | Vitest | `^4.0.8` through Angular unit-test builder | unknown - needs lookup | `package.json`, `angular.json` | observed | 2026-09-19 | Unit and component tests are required for new behavior; add browser journey coverage for critical flows. |
| Server runtime | Express | `^5.1.0` for SSR server | unknown - needs lookup | `package.json`, `src/server.ts` | observed | 2026-09-19 | Keep Express-specific concerns at the SSR boundary; do not make feature code depend on it. |
| Backend integration | Java API application | Separate repository; framework and version not supplied | unknown - needs lookup | User-provided multi-repository context | confirmed | 2026-09-19 | Integrate through versioned OpenAPI HTTP contracts, Problem Details errors, UTC timestamps, and explicit pagination semantics. |
| Contract | OpenAPI | Version and publication location not supplied; contract is owned by Java backend | unknown - needs lookup | User-provided integration approach | confirmed | 2026-09-19 | Pin generator and contract versions; generate clients in CI and isolate them behind feature repositories. |
| Delivery topology | Multi-repository deployment | Angular UI and Java API are independently built and released; gateway/reverse proxy recommended | unknown - needs lookup | User-provided multi-repository context | confirmed | 2026-09-19 | Use immutable artifact versions and test a documented UI/API compatibility matrix. |
| Delivery Constraint | Java repository path, API contract location, deployment repository, and supported compatibility window | unknown | unknown - needs lookup | Missing repository and release evidence | blocked | 2026-09-19 | Confirm repository paths, owners, access, contract publication, API base URLs, and supported UI/API combinations. |

## Support Lifecycle References

Maintain this lookup with official release, lifecycle, or support pages. Update these sources when a project uses a different vendor distribution or a better official endpoint becomes available.

| Technology or ecosystem | Official source | Lookup guidance | Verified on |
| --- | --- | --- | --- |
| Node.js | https://nodejs.org/en/about/releases/ | Use active or maintenance LTS release lines. | 2026-05-20 |
| Python | https://devguide.python.org/versions/ | Use supported Python versions; Python does not label releases as LTS. | 2026-05-20 |
| Java SE | https://www.oracle.com/java/technologies/java-se-support-roadmap.html | Use the vendor-supported LTS line relevant to the chosen JDK distribution. | 2026-05-20 |
| .NET | https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core | Use releases marked LTS by Microsoft. | 2026-05-20 |
| Go | https://go.dev/doc/devel/release | Use the supported release policy; Go does not label releases as LTS. | 2026-05-20 |
| PHP | https://www.php.net/supported-versions | Use actively supported or security-supported PHP branches. | 2026-05-20 |
| Ruby | https://www.ruby-lang.org/en/downloads/branches/ | Use branches under normal or security maintenance; Ruby does not label releases as LTS. | 2026-05-20 |
| Angular | https://angular.dev/reference/releases | Use versions marked active or LTS by Angular. | 2026-05-20 |
| React | https://react.dev/community/versioning-policy | Use React release policy and security maintenance notes; React does not label releases as LTS. | 2026-05-20 |
| Next.js | https://nextjs.org/support-policy | Use versions covered by the official support policy and LTS policy. | 2026-05-20 |
| Vite | https://vite.dev/releases | Use the official release policy; Vite does not label releases as LTS. | 2026-05-20 |
| Laravel | https://laravel.com/docs/releases | Use the official support policy table for bug-fix and security-fix windows. | 2026-05-20 |
