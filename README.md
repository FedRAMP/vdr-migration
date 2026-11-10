# VDR/VER Migration Resources

Official Links:

- [VDR/VER Migration Resources](https://www.fedramp.gov/vdr-migration) on fedramp.gov
- [Public Notice NTC-0017 VDR/VER Migration Progress Reporting and Upcoming FY27 Q1 FedRAMP Security Inbox Test](https://www.fedramp.gov/notices/0017)

---

This Zensical site helps cloud services migrate to FedRAMP's Vulnerability Detection and Response (VDR) and Vulnerability Evaluation and Reporting (VER) rules and prepare migration progress reports. It supports responses to NTC-0017, “VDR/VER Migration Progress Reporting via Upcoming Quarterly Security Inbox Test.”

The actual rules are maintained in [FedRAMP/rules](https://github.com/FedRAMP/rules). This repository contains the supporting guidance, report formats, examples, and validation tools.

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
