# Progress Report Mini-SDR Schemas and Templates

The VDR/VER Migration Progress Report must include a simplified Security Decision Record (SDR) that is designed specifically for this use case - we call it a Progress Report Mini-SDR. It can be supplied in either CSV or JSON, depending on whether you need to build it by hand or can use programmatic tools to automatically generate the file.

=== "JSON"

    [JSON schema](assets/implementation-status.schema.json)

    A JSON template is not provided - please use the JSON schema to programmatically build a proper JSON Mini-SDR. If you need to manually edit a text document, please use the CSV template.

=== "CSV"

    [Download CSV template](assets/implementation-status.csv) | [CSV schema](assets/implementation-status.csvs)

    The CSV template has 22 columns. Its blank answers, including `fedrampId`, must be completed before the file can pass validation. Keep the column names and order. If a column is not applicable in certain situations, either leave it blank or mark it `Not Applicable`.

    This template is a little... janky...  because CSV does not handle conditional logic well. This means you have to put a bunch of data into each row that will be the same in the entire file so that we can easily use automation at scale to pull the status of anything supplied in CSV.

---



## Required fields

JSON has a `metadata` object and a `responses` object keyed by rule ID. CSV repeats metadata in every row and uses a `ruleId` column. Include all 37 provider-facing VDR/VER rules, including those with class-specific requirements; use `Not Applicable` with an explanation where appropriate. See the [provider rule list](report.md#reference-list-of-applicable-rules).

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

`ruleId`
:   Required in CSV; the corresponding object key in JSON. Use each provider rule ID exactly once.

`status`
:   Required: `Fully Implemented`, `Partially Implemented`, `Not Implemented`, or `Not Applicable`.

`explanation`
:   Required. Briefly describe implementation, or explain the reason and resulting risk for nonimplementation. Explain any `Not Applicable` response, including a decision not to use a MAY option.

`correctiveActionPlan`
:   Nested JSON object required whenever `status` is not `Fully Implemented`, including `Not Applicable`. In CSV, use the six CAP columns below. A fully implemented rule may omit the object or retain a `Completed` CAP.

`customerRisk`
:   Required for `Partially Implemented` or `Not Implemented`: explain the risk to federal customer data.

`providerCompensation`
:   Required for `Partially Implemented` or `Not Implemented`: explain what the provider does to reduce the risk, or state that there are no compensating measures.

`agencyCompensation`
:   Required for `Partially Implemented` or `Not Implemented`: explain steps agency customers can take to reduce the risk, or state that none are identified.

`additionalAssurance`
:   Optional additional assurance about the implementation.

`feedback`
:   Optional feedback about the rule.

Risk and compensation fields remain outside `correctiveActionPlan`. A CAP status of `Not Applicable` does not remove their requiredness for partially or not implemented rules. Optional text fields may be omitted or blank in JSON; leave unused CSV cells blank. Required text must contain more than whitespace.

## Corrective action plan fields

Each JSON rule response groups these fields inside `correctiveActionPlan`. CSV uses the same names as six adjacent columns, without embedding JSON in a cell.

`capStatus`
:   Required whenever a CAP is present: `Planned`, `In Progress`, `Pending Plan`, `Completed`, or `Not Applicable`.

`capStatusExplanation`
:   Always required when a CAP is present. Briefly explain the reason for the current CAP status in 1–3 sentences.

`capTargetDate`
:   Required for `Planned` or `In Progress`: date all actions for this rule are anticipated to be completed, in `YYYY-MM-DD` format.

`capExplanation`
:   Required for `Planned` or `In Progress`: responsibly explain actions being taken to complete implementation. For `Completed`, responsibly explain actions taken to complete implementation.

`capConfidence`
:   Required for `Planned` or `In Progress`: a number from 0 through 100 estimating confidence in completion by `capTargetDate`. Zero is the lowest confidence; 100 is complete confidence. Decimals are allowed.

`capCompletedDate`
:   Required for `Completed`: date all actions were completed, in `YYYY-MM-DD` format.

Only include the fields for the selected CAP status:

| CAP status | Fields in addition to `capStatus` and `capStatusExplanation` |
| --- | --- |
| `Planned` or `In Progress` | `capTargetDate`, `capExplanation`, `capConfidence` |
| `Pending Plan` | None |
| `Completed` | `capCompletedDate`, `capExplanation` |
| `Not Applicable` | None |

Omit other CAP fields in JSON and leave their CSV cells blank. If a fully implemented rule has no CAP, omit the entire JSON object and leave all six CSV CAP cells blank. A retained `Completed` CAP still requires its status explanation, action explanation, and completion date.

For a rule whose implementation status is `Not Applicable`, use CAP status `Not Applicable` and explain why. A justified SHOULD departure or unused MAY option can also use CAP status `Not Applicable`. It cannot waive an applicable MUST or MUST NOT requirement that is partially or not implemented. An applicable MUST or MUST NOT rule cannot use implementation status `Not Applicable`. The schemas account for class-specific force and require `VDR-TFR-MVX` to be marked not applicable for Rev5 and `VDR-TFR-MVF` for 20x.

## Validation scope

The JSON schema uses JSON Schema Draft 2020-12. Enable date-format checking in your validator. The CSV schema uses [CSV Schema Language 1.1](https://digital-preservation.github.io/csv-schema/csv-schema-1.1.html) and checks column values, conditional CAP fields, unique rule IDs, and repeated required metadata. A companion check must confirm that no provider rule rows are missing.

The [browser validator](validate.md) checks JSON and CSV using the same field and applicability rules, including complete rule coverage. A valid file does not establish implementation quality, adequate explanations, or FedRAMP approval of a corrective action plan. The 1–3 sentence guidance is not a machine assessment of the explanation's quality.
