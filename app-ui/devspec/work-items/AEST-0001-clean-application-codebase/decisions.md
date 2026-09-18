# Work-Item Decisions

## Work-Item Decision Log

| ID | Status | Decision | Rationale | Impact | Source or related artifacts | Updated |
| --- | --- | --- | --- | --- | --- | --- |
| DEC-001 | accepted | Use manual intake for this work item with the external reference `Internal request: Web app reset initiative, approved in architecture review 2026-09-19`. | The request was provided directly by the user rather than through a resolvable provider issue or ticket. | Preserves required intake provenance and allows the story to proceed without inventing provider metadata. | `story.md#source-record`, `devspec/foundation/provider-integrations.md` | 2026-09-19 |
| DEC-002 | accepted | Use the custom valid folder name `AEST-0001-clean-application-codebase`. | The user supplied a valid prefix-number-title folder name after the initial naming attempt failed pattern validation. | Establishes the durable work-item path for all downstream Devspec stages. | `meta.md#work-item-record`, `.github/prompts/PATTERNS.md#work-item-folder-naming-pattern` | 2026-09-19 |
