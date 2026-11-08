# Example Mini-SDRs

These fictional examples show different stages of VDR/VER migration. Each includes all 37 provider-facing rules, with the same answers in JSON, CSV, and the readable page. They use format `0.2.0` and rules baseline `2026.11.02.01`.

| Offering | Scenario | Reporting date | Read or download |
| --- | --- | --- | --- |
| Aster Operations Cloud, 20x Class C | Operational workflow automation with containerized workers, integrated evidence, and all applicable rules implemented. | December 11, 2026 | [Read sample](aster.md) · [JSON](../assets/examples/aster.json) · [CSV](../assets/examples/aster.csv) |
| Harbor Agency Workspace, Rev5 Class C | Case and document collaboration with legacy conversion workers; mandatory requirements supported by daily manual controls, with recommendation gaps. | December 14, 2026 | [Read sample](harbor.md) · [JSON](../assets/examples/harbor.json) · [CSV](../assets/examples/harbor.csv) |
| Smallbrook Public Information Workspace, Rev5 Class B | Public-information publishing with a small team; significant evaluation and reporting gaps, uncertain plans, and selected targets in September 2027. | December 16, 2026 | [Read sample](smallbrook.md) · [JSON](../assets/examples/smallbrook.json) · [CSV](../assets/examples/smallbrook.csv) |

Each readable example introduces the product, infrastructure, and migration situation before the rule responses. Use the examples to understand the fields and the level of detail that helps a reviewer. Their practices and response lengths are illustrative, not additional requirements. The identifiers, implementation claims, evidence, dates, and confidence estimates are fictional; no FedRAMP approval or staff review is claimed.

A future CAP date does not establish permission to delay implementation. Plans extending beyond March 7, 2027 need the applicable approval and red-team arrangements described in [enforcement and deadlines](../deadlines.md). The examples do not claim those approvals. Smallbrook’s late targets illustrate its own prioritization and remaining risk, not a general ranking of rule importance.

The samples are complete Mini-SDRs, not the separate machine-readable and human-readable activity-report samples required by the [progress report](../report.md). File validation checks structure and consistency; it does not establish compliance or the quality of an implementation.
