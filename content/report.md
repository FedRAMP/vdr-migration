# VDR/VER Migration Progress Report

Prepare the following in response to [Public Notice NTC-0017](https://fedramp.gov/notices/0017) for the upcoming FY27 Q1 Security Inbox Test:

1. **VDR/VER Migration Progress Report Mini-SDR:** A JSON or CSV Mini-Security Decision Record (Mini-SDR) describing implementation status for each applicable VDR/VER rule, with a brief explanation and a rule-specific corrective action plan and timeline where required.
2. **Machine-Readable Activity Report:** A sample or example machine-readable activity report required by [VER-RPT-PER (Persistent Reporting)](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/#persistent-reporting), with at least 5 vulnerabilities of each type.
3. **Human-Readable Activity Report:** A sample or example human-readable activity report required by [VER-TFR-MHR (Monthly Activity Report)](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/#monthly-activity-report), with at least 5 vulnerabilities of each type.

!!! warning "Report progress responsibly!"

    Review all submitted information against [VER-RPT-NID (Responsible Disclosure)](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/#responsible-disclosure), including the Progress Report Mini-SDR.

    Both activity report samples must use examples in place of actual currently likely exploitable or internet-reachable vulnerabilities. Identify fictional examples as such.

---

## Vulnerability Activity Reports and Vulnerability Types

Each vulnerability activity report sample must contain at least 5 vulnerabilities or groups from each type:

- Accepted
- Internet-Reachable
- Non-Internet-Reachable
- Likely Exploitable
- Non-Likely Exploitable
- Known Exploited
- Partially Mitigated
- Fully Mitigated
- Remediated

Multiple categories will apply to every vulnerability and you don't need to match all possible combinations, you just need to provide enough data to for everyone to get a good understanding of what you're doing.

!!! tip "Example sample list"

    This is an example sample list of what types of vulnerabilities might be included, please do not just follow it by default though:

    - x5 Accepted, Non-Internet-Reachable, Non-Likely Exploitable vulnerabilities
    - x3 Likely Exploitable, Non-Internet-Reachable, Partially Mitigated vulnerabilities
    - x2 Likely Exploitable, Internet Reachable vulnerabilities
    - x2 Partially Mitigated, Non-Likely Exploitable, Non-Internet-Reachable, Known Exploited vulnerabilities
    - x3 Partially Mitigated, Likely Exploitable, Internet Reachable, Known Exploited vulnerabilities
    - x5 Fully Mitigated, Non-Internet-Reachable, Non-Likely Exploitable vulnerabilities
    - x5 Remediated, Non-Internet-Reachable, Non-Likely Exploitable vulnerabilities

    The result is 25 vulnerabilities or groups in the sample, with at least 5 from each of the 9 required categories. You are free to use any such combination.

## Progress Report Mini-SDR

Provide a short, high-level explanation of how each rule is addressed in your environment in a validated [Progress Report Mini-SDR](schemas.md). Explain the implementation or, where permitted, why implementation is unnecessary and the resulting risk.

When a required rule is not fully implemented, include its [corrective action plan](cap.md) and timeline in the same rule response. These per-rule plans form the basis of an overall plan that can be generated from the Mini-SDR. A separate migration CAP document is not required.

The Mini-SDR is maintained until the provider migrates to the full Security Decision Record rules. It does not replace the activity reports required by VER. See [Schemas & Templates](schemas.md) for the developing report format.

