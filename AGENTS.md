# isaac-racing-common instructions

## Authority

Use [Standard Project Bootstrap Template v1.1.1](https://docs.google.com/document/d/1c1kuAV9WhA0yG_70TaHIH7FgjFkxtNRsEBYmniP-iFE/edit) (SPBT) for work authorized from this adoption boundary forward. It replaces the pending Repository Orchestration adoption workflow. Do not reopen closed checkpoints solely to adopt SPBT.

Google Drive remains the project authority. These are references, not local replacements:

- [Additional Starting Items v1 specification and plan](https://docs.google.com/document/d/1SDatGBr1NOpLteZ_JsCg6xhy7vQmG-hBnrGMNv4mHYk/edit): implementation requirements.
- [DECISIONS.md](https://docs.google.com/document/d/1Qr67VPCf_qJW78J6VUauoOMwlE2ZP6e4KpboiB37rxg/edit): explicit amendments, including the exact-commit fork dependency strategy.
- [PROJECT_STATUS.md](https://docs.google.com/document/d/1EJHMxO69rh9rHhwBzpFWurCDV8HN9AcAjG7gb8h7zqM/edit): current checkpoint and authorization boundary. Do not infer current execution state from historical starting instructions in the specification.
- [DOCUMENTATION_INDEX.md](https://docs.google.com/document/d/1ph7VXtLvXtCbmaCKJmH7J5NCr4kwuOdivxZigE2zscI/edit): document relationships.

Resolve material authority conflicts before affected implementation. Preserve historical evidence and requirements. Automated verification does not substitute for human approval or authorize dependent work.

## Scope and baseline

The approved integrated C1 baseline is `ed2ea886f700f742fd6cfd98718af077c983874c` in `FoxyLight/isaac-racing-common` on `main`. C1 is already closed; do not implement it again.

Preserve the existing local `feature/additional-starting-items-v1` branch. Do not start any further checkpoint without explicit authorization. Do not modify `isaac-racing-server`, `isaac-racing-client`, or `racing-plus` under this common-only task.

Do not commit, push, publish, create or switch branches, or perform unrelated cleanup automatically. Integration of future work requires its own authorization.

## Verification

Use Yarn locally and preserve `yarn.lock`. Do not create `package-lock.json` or install new dependencies merely for SPBT adoption.

- Existing baseline regression: `yarn test`.
- Whitespace verification: `git diff --check`.
- Existing CI: `.github/workflows/c1-additional-starting-items.yml`. Preserve it; local verification is not evidence of a new CI run.

Identify the exact starting commit and required verification before authorized implementation. Stop on mandatory verification failure. Keep manual evidence, approval, integration, and release separate.
