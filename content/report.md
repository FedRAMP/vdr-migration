# VDR/VER Migration Progress Report

Prepare the following for [NTC-0017](https://fedramp.gov/notices/0017):

1. A JSON or CSV Mini-Security Decision Record (Mini-SDR) describing implementation status for each applicable VDR/VER rule, with a brief explanation and a rule-specific corrective action plan and timeline where required.
2. A sample or example machine-readable activity report required by [VER-RPT-PER (Persistent Reporting)](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/#persistent-reporting), with at least five vulnerabilities of each type.
3. A sample or example human-readable activity report required by [VER-TFR-MHR (Monthly Activity Report)](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/#monthly-activity-report), with at least five vulnerabilities of each type.

Both activity-report samples must use examples in place of actual currently likely exploitable or internet-reachable vulnerabilities. Identify fictional examples as such. Review all submitted information against [VER-RPT-NID (Responsible Disclosure)](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/#responsible-disclosure).

## Activity-report categories

Each activity-report sample must contain at least five vulnerabilities in each category:

- Accepted
- Internet-Reachable
- Non-Internet-Reachable
- Likely Exploitable
- Non-Likely Exploitable
- Known Exploited
- Partially Mitigated
- Fully Mitigated
- Remediated

A vulnerability may have multiple attributes and count toward more than one category. Meet the minimum for each category in each report.

## Form information

Prepare the following for the submission form:

- Your email address.
- The offering's FedRAMP ID, which is also required in the Mini-SDR.
- The notification code supplied for the offering.
- The name and position of the senior official attesting to the accuracy of the information.
- Confirmation that the report information is available to agency customers.

## Mini-SDR

Provide a short, high-level explanation of how each rule is addressed in your environment. Explain the implementation or, where permitted, why implementation is unnecessary and the resulting risk. If a rule applies when an event occurs, explain how you will handle that event even if it has not occurred yet.

When a required rule is not fully implemented, include its [corrective action plan](cap.md) and timeline in the same rule response. These per-rule plans form the basis of an overall plan that can be generated from the Mini-SDR. A separate migration CAP document is not required.

The Mini-SDR is maintained until the provider migrates to the full Security Decision Record rules. It does not replace the activity reports required by VER. See [Schemas & Templates](schemas.md) for the developing report format.

## Reference List of Applicable Rules

Include a response for every provider rule below in your Mini-SDR. Use the force for your offering's framework and class; explain when a rule does not apply. Put any required Corrective Action Plan in that rule's response.

These tables use rules version `2026.11.02.01` and cover the report's Rev5 Class B/C/D and 20x Class B/C profiles. Class-specific rules remain included even when their force is the same across these classes. Consult the linked rules for their full statements and applicability.

### VDR Rules

| ID | Name | FORCE | What to provide |
| --- | --- | --- | --- |
| [VDR-CSO-DET](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Vulnerability Detection | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VDR-CSO-RES](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Vulnerability Response | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VDR-CSO-FAV](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Failures Are Vulnerabilities | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VDR-CSO-DFR](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Design For Resilience | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-CSO-ADT](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Automate Detection | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-CSO-DAC](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Detect After Changes | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-CSO-MSP](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Maintain Security | SHOULD NOT | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-CSO-AKE](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Avoid KEVs | SHOULD NOT | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-CSO-SIR](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Sampling | MAY | Describe implementation if applicable. |
| [VDR-TFR-NMV](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Non-Machine Verification and Validation | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VDR-TFR-PDD](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Persistent Drift Detection | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-TFR-PCD](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Persistently Complete Detection | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-TFR-PVR](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Mitigation and Remediation Expectations | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-TFR-RMN](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Remaining Vulnerabilities | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-TFR-KEV](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Remediate KEVs | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-TFR-PSD](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Persistent Sample Detection | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VDR-TFR-MVX](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Persistent Machine Verification and Validation for 20x (20x only) | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VDR-TFR-MVF](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) | Persistent Machine Verification and Validation for Rev5 (Rev5 only) | Rev5 Class B: SHOULD<br>Rev5 Class C/D: MUST | Class B: Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented.<br><br>Class C/D: Describe implementation; supply a Corrective Action Plan if not fully implemented. |

### VER Rules

| ID | Name | FORCE | What to provide |
| --- | --- | --- | --- |
| [VER-EVA-ELX](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Evaluate Exploitability | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-EVA-EIR](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Evaluate Internet-Reachability | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-EVA-EPA](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Estimate Potential Agency Impact | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-EVA-AIA](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Assume It's Automatable | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-EVA-GRV](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Group Vulnerabilities | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VER-EVA-EFP](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Evaluate False Positives | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VER-EVA-EFA](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Evaluation Factors | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VER-RPT-PER](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Persistent Reporting | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. Separately, supply a sample / example. |
| [VER-RPT-VDT](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Vulnerability Details | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-RPT-AVI](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Accepted Vulnerability Info | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-RPT-NID](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Responsible Disclosure | MUST NOT | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-RPT-HLO](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | High-Level Overviews | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VER-RPT-RPD](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Responsible Public Disclosure | MAY | Describe implementation if applicable. |
| [VER-TFR-MHR](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Monthly Activity Report | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. Separately, supply a sample / example. |
| [VER-TFR-MAV](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Mark Accepted Vulnerabilities | MUST | Describe implementation; supply a Corrective Action Plan if not fully implemented. |
| [VER-TFR-MRH](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Historical Activity | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VER-TFR-EVU](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Evaluate Vulnerabilities Quickly | SHOULD | Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VER-TFR-IRI](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Internet-Reachable Incidents | Class B: MAY<br>Class C/D: SHOULD | Class B: Describe implementation if applicable.<br><br>Class C/D: Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
| [VER-TFR-NRI](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) | Non-Internet-Reachable Incidents | Class B/C: MAY<br>Class D: SHOULD | Class B/C: Describe implementation if applicable.<br><br>Class D: Describe implementation; supply an explanation, resulting risk, and risk compensation options if not fully implemented. |
