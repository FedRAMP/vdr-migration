# Mini-SDR schemas and templates

Provide the Mini-SDR in JSON or CSV. Both formats contain the same per-rule information, including corrective action plans. The Mini-SDR is one component of the [VDR/VER Migration Progress Report](report.md); the two activity-report samples are separate attachments.

This format uses `schemaVersion` **`0.2.0`** and rules baseline **`2026.11.02.01`**. Version `0.2.0` replaces the old `completionTarget` and `completionTargetExplanation` fields with a structured `correctiveActionPlan`. The old target values `Unknown`, `Not Planned`, and `N/A` are no longer used.

## Downloads

- [JSON template](assets/implementation-status.json)
- [CSV template](assets/implementation-status.csv)
- [CSV schema](assets/implementation-status.csvs)
- [JSON schema](assets/implementation-status.schema.json)

Both starter templates contain all 37 provider-facing rules. The JSON starter includes blank CAP status and explanation fields; add the other fields for the selected CAP status, or omit the object for a fully implemented rule with no retained CAP. Blank starter values are not valid submission answers. The CSV template has 22 columns. Its blank answers, including `fedrampId`, must be completed before the file can pass validation. Keep the column names and order, including `framework` and `class`.

## Required fields

JSON has a `metadata` object and a `responses` object keyed by rule ID. CSV repeats metadata in every row and uses a `ruleId` column. Include all 37 provider-facing VDR/VER rules, including those with class-specific requirements; use `Not Applicable` with an explanation where appropriate. See the [provider rule list](report.md#provider-rule-responses).

### Offering metadata

All fields below are required. Repeated CSV metadata must be identical across rows.

| Field | What to enter |
| --- | --- |
| `schemaVersion` | `0.2.0`. |
| `rulesVersion` | `2026.11.02.01`. This format uses this specific rules baseline. |
| `providerName` | Provider name, matching the Marketplace information. |
| `offeringName` | Cloud service offering name, matching the Marketplace information. |
| `framework` | `Rev5` or `20x`. |
| `class` | `B`, `C`, or `D` for Rev5; `B` or `C` for 20x. |
| `asOfDate` | Date the answers describe, in `YYYY-MM-DD` format. |
| `fedrampId` | Required FedRAMP offering identifier. It must be nonblank and identical in every CSV row. |

### Rule response

| Field | Requirement and what to enter |
| --- | --- |
| `ruleId` | Required in CSV; the corresponding object key in JSON. Use each provider rule ID exactly once. |
| `status` | Required: `Fully Implemented`, `Partially Implemented`, `Not Implemented`, or `Not Applicable`. |
| `explanation` | Required. Briefly describe implementation, or explain the reason and resulting risk for nonimplementation. Explain any `Not Applicable` response, including a decision not to use a MAY option. |
| `correctiveActionPlan` | Nested JSON object required whenever `status` is not `Fully Implemented`, including `Not Applicable`. In CSV, use the six CAP columns below. A fully implemented rule may omit the object or retain a `Completed` CAP. |
| `customerRisk` | Required for `Partially Implemented` or `Not Implemented`: explain the risk to federal customer data. |
| `providerCompensation` | Required for `Partially Implemented` or `Not Implemented`: explain what the provider does to reduce the risk, or state that there are no compensating measures. |
| `agencyCompensation` | Required for `Partially Implemented` or `Not Implemented`: explain steps agency customers can take to reduce the risk, or state that none are identified. |
| `additionalAssurance` | Optional additional assurance about the implementation. |
| `feedback` | Optional feedback about the rule. |

Risk and compensation fields remain outside `correctiveActionPlan`. A CAP status of `Not Applicable` does not remove their requiredness for partially or not implemented rules. Optional text fields may be omitted or blank in JSON; leave unused CSV cells blank. Required text must contain more than whitespace.

## Corrective action plan fields

Each JSON rule response groups these fields inside `correctiveActionPlan`. CSV uses the same names as six adjacent columns, without embedding JSON in a cell.

| Field | Requirement and what to enter |
| --- | --- |
| `capStatus` | Required whenever a CAP is present: `Planned`, `In Progress`, `Pending Plan`, `Completed`, or `Not Applicable`. |
| `capStatusExplanation` | Always required when a CAP is present. Briefly explain the reason for the current CAP status in 1–3 sentences. |
| `capTargetDate` | Required for `Planned` or `In Progress`: date all actions for this rule are anticipated to be completed, in `YYYY-MM-DD` format. |
| `capExplanation` | Required for `Planned` or `In Progress`: responsibly explain actions being taken to complete implementation. For `Completed`, responsibly explain actions taken to complete implementation. |
| `capConfidence` | Required for `Planned` or `In Progress`: a number from 0 through 100 estimating confidence in completion by `capTargetDate`. Zero is the lowest confidence; 100 is complete confidence. Decimals are allowed. |
| `capCompletedDate` | Required for `Completed`: date all actions were completed, in `YYYY-MM-DD` format. |

Only include the fields for the selected CAP status:

| CAP status | Fields in addition to `capStatus` and `capStatusExplanation` |
| --- | --- |
| `Planned` or `In Progress` | `capTargetDate`, `capExplanation`, `capConfidence` |
| `Pending Plan` | None |
| `Completed` | `capCompletedDate`, `capExplanation` |
| `Not Applicable` | None |

Omit other CAP fields in JSON and leave their CSV cells blank. If a fully implemented rule has no CAP, omit the entire JSON object and leave all six CSV CAP cells blank. A retained `Completed` CAP still requires its status explanation, action explanation, and completion date.

For a rule whose implementation status is `Not Applicable`, use CAP status `Not Applicable` and explain why. A justified SHOULD departure or unused MAY option can also use CAP status `Not Applicable`. It cannot waive an applicable MUST or MUST NOT requirement that is partially or not implemented. An applicable MUST or MUST NOT rule cannot use implementation status `Not Applicable`. The schemas account for class-specific force and require `VDR-TFR-MVX` to be marked not applicable for Rev5 and `VDR-TFR-MVF` for 20x.

### JSON example

This fictional excerpt shows the CAP object inside one rule response. A complete Mini-SDR must also include offering metadata and all other provider rule responses.

```json
{
  "status": "Partially Implemented",
  "explanation": "Detection covers production hosts; the remaining service tier is being added.",
  "customerRisk": "Weaknesses in that tier may remain undetected longer.",
  "providerCompensation": "The security team reviews that tier manually while integration is completed.",
  "agencyCompensation": "Agency customers can limit use of the affected tier during migration.",
  "correctiveActionPlan": {
    "capStatus": "In Progress",
    "capStatusExplanation": "Integration is underway and verification remains to be completed.",
    "capTargetDate": "2027-02-03",
    "capExplanation": "Connect the remaining tier to detection and verify that findings reach the response process.",
    "capConfidence": 85
  }
}
```

### CSV representation

The six CAP columns map directly to properties of the JSON object:

```csv
capStatus,capStatusExplanation,capTargetDate,capExplanation,capConfidence,capCompletedDate
```

Quote cells containing commas, quotation marks, or line breaks using normal CSV escaping. A blank confidence cell means the field is absent; it does not mean zero. Use `0` when confidence is zero.

## Validation scope

The JSON schema uses JSON Schema Draft 2020-12. Enable date-format checking in your validator. The CSV schema uses [CSV Schema Language 1.1](https://digital-preservation.github.io/csv-schema/csv-schema-1.1.html) and checks column values, conditional CAP fields, unique rule IDs, and repeated required metadata. A companion check must confirm that no provider rule rows are missing.

The [browser validator](validate.md) checks JSON and CSV using the same field and applicability rules, including complete rule coverage. A valid file does not establish implementation quality, adequate explanations, or FedRAMP approval of a corrective action plan. The 1–3 sentence guidance is not a machine assessment of the explanation's quality.
