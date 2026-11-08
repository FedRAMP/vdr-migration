# VDR/VER Migration Resources

This Zensical site helps cloud services migrate to FedRAMP's Vulnerability Detection and Response (VDR) and Vulnerability Evaluation and Reporting (VER) rules and prepare migration progress reports. It supports responses to NTC-0017, “VDR/VER Migration Progress Reporting via Upcoming Quarterly Security Inbox Test.”

The actual rules are maintained in [FedRAMP/rules](https://github.com/FedRAMP/rules). This repository contains the supporting guidance, report formats, examples, and validation tools.

## Resources

- [Migration requirements](content/requirements.md), [deadlines](content/deadlines.md), and [customer communication guidance](content/cx.md).
- [Emergency Test instructions](content/emergency-test.md) and [required progress-report information](content/report.md).
- [Mini-SDR schemas and templates](content/schemas.md) in JSON and CSV, with [per-rule corrective action plans](content/cap.md).
- A [browser validator](content/validate.md) for Mini-SDR format and consistency checks. Passing validation does not establish compliance or FedRAMP approval.
- [Fictional completed Mini-SDR examples](content/examples/index.md), available as JSON, CSV, and readable pages. An LLM agent created these example reports using [PERSONAS.md](PERSONAS.md); they illustrate different stages of migration and are not activity-report samples.

## Local development

With Zensical installed, run either command from the repository root:

```sh
zensical serve  # Preview locally
zensical build  # Build into html/
```

The validator's dependency-free tests require Node.js:

```sh
node --test tests/validator.test.cjs
```

Contributors and AI agents should read [AGENTS.md](AGENTS.md) for source guidance, repository structure, and maintenance checks.
