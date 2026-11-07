# Information Collection

Prepare the following for the Security Inbox Emergency Test. The notification will provide a form URL for uploading attachments directly. Links to web pages or hosted files do not replace the requested attachments.

## Information to prepare

- Your email address, FedRAMP ID, and unique code. The notification will include the ID and code for each offering.
- A JSON or CSV Mini-SDR describing how you address each VDR and VER rule. See [Schemas & Templates](schemas.md).
- A Corrective Action Plan, if applicable, and its target date.
- The name and position of the senior official attesting to the accuracy of the information.
- Confirmation that the implementation package is available to agency customers.
- A sample Monthly Activity Report as described below.

Follow the Emergency Test notification for the final collection requirements, including any additional information requested by CISA.

## Sample Monthly Activity Report

Provide at least two examples of each category:

- Accepted
- Internet-Reachable
- Non-Internet-Reachable
- Likely Exploitable
- Non-Likely Exploitable
- Known Exploited
- Partially Mitigated
- Fully Mitigated
- Remediated

You may use fictional examples. Clearly identify them as fictional. Use the applicable [VER reporting requirements](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/); FedRAMP will not provide an additional vulnerability-report template for this collection.

## Responsible disclosure

Review every attachment before uploading it to FedRAMP. Do not include specific sensitive vulnerability information that would likely lead to exploitation if irresponsibly disclosed. Provide enough information to support informed risk decisions. Apply [VER-RPT-NID (Responsible Disclosure)](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/#responsible-disclosure) to all reports submitted for this collection.

## Addressing Each Rule

You will provide the following about EACH rule:

| Info | Explanation |
| -- | -- |
|Status| One of `Fully Implemented`, `Partially Implemented`, `Not Implemented`, `Not Applicable`|
|Explanation| A short explanation of how the rule is followed or the reason and risk for not following it.|
|Risk & Compensation (if not fully implemented)| A short set of explanations of the risk of the rule not being followed, how it might affect customers, what mitigations are in place, and what mitigations customers might put in place.|
|Completion Target (if not fully implemented)| A completion target date and an explanation of the completion plan|

!!! tip "If a rule applies when something happens, explain how you will handle that event even if it has not happened yet."

!!! tip "For a MAY rule, you can explain your choice not to use the option. Optional assurance and feedback can be left blank."

## Publishing Implementation Information

Make the VDR/VER implementation package available to agency customers wherever you currently share your certification package. For historical Rev5 packages, the default locations are USDA Connect, a trust center, or the High Package Repository.

Agency access to the package is separate from submitting the requested attachments directly to FedRAMP through the Emergency Test form.
