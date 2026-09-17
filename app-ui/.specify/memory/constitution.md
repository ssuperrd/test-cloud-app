# Project Constitution

## System Path Configuration
- Repository Root Context: Documents\test app\test-cloud-app\app-ui
- Primary Source Code: src/app/
- Configurations: angular.json, package.json

## Framework Deployment Profile (Azure Optimization)
- Framework: Angular (Strict Standalone Component rules, No NgModules)
- State Management: Angular Signals (`input`, `output`, `computed`)
- Build Output Pipeline: Run `npm run build` which delivers to `dist/app-ui/browser`
- Azure Strategy: All structural features must ensure that static assets match the target folder definition for proper Azure App Routing.

## Strict SDD Execution Rule
- No developer or AI agent may write functional code without an explicitly approved specification (`spec.md`), technical plan (`plan.md`), and ordered micro-task checklist (`tasks.md`).
