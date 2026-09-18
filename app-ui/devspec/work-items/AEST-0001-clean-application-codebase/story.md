# Work-Item Intake

## Resume State

| Field | Value |
| --- | --- |
| Current stage | story |
| Current command | /devspec.story |
| Current agent | devspec.story |
| Run status | complete |
| Current item | baseline |
| Last completed step | Captured manual intake details, validated naming input, and created the baseline story artifact. |
| Next required action | Create the readiness brief and confirm deletion boundaries before implementation planning. |
| Pending user question | none |
| Question options and examples | none |
| Custom Answer entry or response | External reference: Internal request: Web app reset initiative, approved in architecture review 2026-09-19. Folder name: AEST-0001-clean-application-codebase. |
| Recommended option and justification | /devspec.finalize; readiness checks should happen before any implementation or task planning for deletion-heavy work. |
| Continuation condition | Continue when the user wants readiness assessment for this work item. |
| Resume command | /devspec.finalize |
| Resume notes | Manual intake is complete. The next stage should confirm preserved files, risky deletion boundaries, and validation expectations. |
| Updated | 2026-09-19 |

## Source Record

| Field | Value |
| --- | --- |
| External reference | Internal request: Web app reset initiative, approved in architecture review 2026-09-19 |
| Resolved summary shown | Rebuild the Angular web application from a clean application-code baseline while preserving workspace configuration, manifests, Devspec artifacts, documentation, and repository metadata. |
| Confirmation basis | `devspec/foundation/provider-integrations.md` |
| User confirmation | confirmed |
| Manual intake used | yes |
| Manual description | Remove the current application implementation under `src/app/`, preserve non-application repository artifacts, and recreate a minimal working Angular shell first. |
| Manual acceptance criteria | The old `src/app/` behavior is removed; a minimal Angular shell starts; `npm run build` succeeds; Devspec artifacts remain intact; unrelated files are not deleted; implementation records deletion, recreation, and validation evidence. |

## Summary

| Field | Value |
| --- | --- |
| Summary | Rebuild the Angular application code under `src/app/` from a clean baseline without deleting configuration, Devspec artifacts, or unrelated repository content. |

## Change Requests

| ID | Request | Relationship to baseline | Disposition | Source | Recorded |
| --- | --- | --- | --- | --- | --- |

## Description

| Field | Value |
| --- | --- |
| Problem or opportunity | The current Angular application implementation should be reset so future work can start from a minimal, known-good shell instead of incrementally reworking the existing `src/app/` code. |
| User or customer impact | Reduces risk of carrying forward unwanted application behavior and gives implementation work a smaller, cleaner baseline while protecting repository configuration and Devspec artifacts. |
| Affected components | `src/app/` application code, shell templates and styles, route definitions, and app-level configuration files that are required to preserve a working Angular shell. |
| Affected versions | Current workspace baseline as of 2026-09-19; no version upgrade is requested. |
| Type-specific context | Feature intake for a controlled application reset. The request is deletion-sensitive because it must preserve workspace tooling, documentation, repository metadata, and `devspec/`. |

## Acceptance Criteria

| ID | Criterion | Source | Status |
| --- | --- | --- | --- |
| AC-001 | Existing application behavior and components under `src/app/` are removed from the baseline implementation. | user | pending |
| AC-002 | A minimal working Angular application shell is recreated after the reset. | user | pending |
| AC-003 | `npm run build` completes successfully after the rebuild. | user | pending |
| AC-004 | Existing Devspec artifacts remain intact throughout implementation. | user | pending |
| AC-005 | No unrelated files outside the agreed application-code scope are deleted. | user | pending |
| AC-006 | Implementation records the deleted files, recreated files, and validation results. | user | pending |

## Functional Requirements

| ID | Requirement | Source | Status |
| --- | --- | --- | --- |
| FR-001 | Remove the current application implementation within `src/app/` while preserving the rest of the repository outside the approved reset boundary. | user | open |
| FR-002 | Recreate the application as a minimal Angular shell that can start successfully in the existing workspace. | user | open |
| FR-003 | Preserve the current Angular version, TypeScript configuration, build tooling, and dependency setup unless later validated task work proves a change is necessary. | user | open |
| FR-004 | Preserve Angular workspace configuration, package manifests, documentation, repository metadata, and the entire `devspec/` directory during the reset. | user | open |
| FR-005 | Record implementation evidence for deletions, recreated files, and validation actions taken during the rebuild. | user | open |

## Nonfunctional Requirements

| ID | Requirement | Source | Status |
| --- | --- | --- | --- |
| NFR-001 | The reset must maintain a buildable Angular workspace without introducing unrelated tooling or dependency drift. | intake | open |
| NFR-002 | The resulting shell must support local startup validation in the current workspace. | intake | open |
| NFR-003 | The existing test command should run if applicable; when not applicable or blocked, the reason must be recorded in implementation evidence. | intake | open |
| NFR-004 | Deletion scope must remain auditable and limited to the approved application-code boundary. | user | open |

## Edge Cases

| ID | Case | Source | Status |
| --- | --- | --- | --- |
| EDGE-001 | If files under `src/app/` are required for a working Angular shell, replace them with minimal equivalents rather than leaving the app non-startable. | intake | open |
| EDGE-002 | If the reset appears to require deleting or modifying files outside `src/app/`, stop and clarify scope before implementation proceeds. | user | open |
| EDGE-003 | If existing build or test wiring depends on removed application code, adjust only the minimum in-scope app shell surface needed to restore validation. | intake | open |
| EDGE-004 | If the current repository contains SSR or app bootstrap files outside `src/app/`, preserve them unless finalization explicitly broadens the scope. | intake | open |

## Planning Signals

| Type | ID | Item | Source | Status |
| --- | --- | --- | --- | --- |
| Assumption | ASM-001 | This work item targets only the `app-ui` repository and does not require coordinated backend or deployment changes. | inferred | open |
| Dependency | DEP-001 | None beyond the current Angular workspace, existing scripts, and repository access already available in `app-ui`. | intake | open |
| Multi-repo dependency | DEP-REPO-001 | no; related repositories: app-ui | confirmed | open |
| Risk | RISK-001 | Deletion work could unintentionally remove shell-critical app files unless finalization confirms the exact preserved and replaceable file set. | intake | open |
| Risk | RISK-002 | Existing tests may encode old application assumptions and may need minimal in-scope updates or explicit recorded exceptions. | intake | open |
| Scope exclusion | SCOPE-001 | Do not delete or modify `devspec/`, Angular workspace configuration, package manifests, documentation, or repository metadata as part of this reset. | confirmed | open |
