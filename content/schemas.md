# Progress Report Mini-SDR Schemas and Templates

The VDR/VER Migration Progress Report must include a simplified Security Decision Record (SDR) that is designed specifically for this use case - we call it a Progress Report Mini-SDR. It can be supplied in either CSV or JSON, depending on whether you need to build it by hand or can use programmatic tools to automatically generate the file.

=== "JSON"

    [JSON schema](assets/implementation-status.schema.json)

    A JSON template is not provided - please use the JSON schema to programmatically build a proper JSON Mini-SDR. If you need to manually edit a text document, please use the CSV template.

=== "CSV"

    [Download CSV template](assets/implementation-status.csv) | [CSV schema](assets/implementation-status.csvs)

    The CSV template has 22 columns. Its blank answers, including `fedrampId`, must be completed before the file can pass validation. Keep the column names and order. If a column is not applicable in certain situations, either leave it blank or mark it `Not Applicable` as appropriate (it varies, follow the instructions below).

    This template is a little... janky...  because CSV does not handle conditional logic well. This means you have to put a bunch of data into each row that will be the same in the entire file so that we can easily use automation at scale to pull the status of anything supplied in CSV.

---



## Required Fields and Explanations

JSON has a `metadata` object and a `responses` object keyed by rule ID. CSV repeats metadata in every row and uses a `ruleId` column. Include all 37 provider-facing VDR/VER rules, including those with class-specific requirements; use `Not Applicable` with an explanation where appropriate. See the [provider rule list](reference.md#reference-list-of-applicable-rules).

### Offering Metadata

All fields below are required. Repeated CSV metadata must be identical across rows.

| Field | What to enter |
| --- | --- |
| `schemaVersion` | `0.2.0` |
| `rulesVersion` | `2026.11.02.01`. This format uses this specific rules baseline |
| `providerName` | Provider name, matching the Marketplace information |
| `offeringName` | Cloud service offering name, matching the Marketplace information |
| `framework` | `Rev5` or `20x` |
| `class` | `B`, `C`, or `D` for Rev5; `B` or `C` for 20x |
| `asOfDate` | Date the answers describe, in `YYYY-MM-DD` format|
| `fedrampId` | Required FedRAMP offering identifier. It must be nonblank and identical in every CSV row |

### Rule Status

`ruleId`
:   Required in CSV; the corresponding object key in JSON. Use each provider rule ID exactly once.

`status`
:   Required: `Fully Implemented`, `Partially Implemented`, `Not Implemented`, or `Not Applicable`.

`explanation`
:   Required. Briefly describe implementation, or explain the reason and resulting risk for not implementing this rule. Explain any `Not Applicable` response, including a decision not to use a MAY option.

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

## Corrective Action Plans

Each JSON rule response groups these fields inside `correctiveActionPlan`. CSV uses the same names as six adjacent columns, without embedding JSON in a cell.

`capStatus`
:   Required whenever a CAP is present: `Planned`, `In Progress`, `Pending Plan`, `Completed`, or `Not Applicable`.

`capStatusExplanation`
:   Always required when a CAP is present. Briefly explain the reason for the current CAP status in 1–3 sentences. This field explains why the corrective action plan is in this status, not the overall corrective action plan itself.

`capTargetDate`
:   Required for `Planned` or `In Progress`. The date all actions for this rule are anticipated to be completed, in `YYYY-MM-DD` format.

`capExplanation`
:   Required for `Planned`, `In Progress`, or `Completed`. Responsibly explain actions being taken to complete implementation. For `Completed`, responsibly explain actions taken to complete implementation. Do not use this field to explain why the corrective action is in the current status.

`capConfidence`
:   Required for `Planned` or `In Progress`. A number from 0 through 100 estimating confidence in completion by `capTargetDate`. Zero is the lowest confidence; 100 is complete confidence. Decimals are allowed.

`capCompletedDate`
:   Required for `Completed`. The date all actions were completed, in `YYYY-MM-DD` format.

Only include the fields for the selected CAP status:

| CAP status | Fields in addition to `capStatus` and `capStatusExplanation` |
| --- | --- |
| `Planned` or `In Progress` | `capTargetDate`, `capExplanation`, `capConfidence` |
| `Pending Plan` | None |
| `Completed` | `capCompletedDate`, `capExplanation` |
| `Not Applicable` | None |

Omit other CAP fields in JSON and leave their CSV cells blank. If a fully implemented rule has no CAP, omit the entire JSON object and leave all six CSV CAP cells blank. A retained `Completed` CAP still requires its status explanation, action explanation, and completion date.

For a rule whose implementation status is `Not Applicable`, use CAP status `Not Applicable` and explain why. A justified SHOULD departure or unused MAY option can also use CAP status `Not Applicable`. It cannot waive an applicable MUST or MUST NOT requirement that is partially or not implemented. An applicable MUST or MUST NOT rule cannot use implementation status `Not Applicable`. The schemas account for class-specific force and require `VDR-TFR-MVX` to be marked not applicable for Rev5 and `VDR-TFR-MVF` for 20x.

### Not Applicable Rules

The CSV template has all the rules included by default, but there are some rules that only apply to 20x or Rev5. Instead of removing them, they should be marked `Not Applicable`. This is a quirk of providing a CSV template, since we can't supply conditional logic.

For `VDR-TFR-MVX` in a Rev5 CSV report, complete these columns:

| CSV column | Example value |
| --- | --- |
| `status` | `Not Applicable` |
| `explanation` | This rule applies to 20x; this offering follows Rev5. |
| `capStatus` | `Not Applicable` |
| `capStatusExplanation` | No corrective action is needed because this rule is outside the offering’s framework. |

Leave `capTargetDate`, `capExplanation`, `capConfidence`, and `capCompletedDate` blank. Keep the row and its repeated metadata in the report.

Setting `status` to `Not Applicable` does not replace the two required CAP entries. If all six CAP cells are blank, the browser validator reports that a `correctiveActionPlan` object is required. In CSV, resolve that error by filling in `capStatus` and `capStatusExplanation` as shown above.

!!! tip "The same pattern applies to `VDR-TFR-MVF` in a 20x report, with explanations reflecting that framework."

## Validation Scope

The downloadable schemas check report structure, but passing a standalone schema check is not equivalent to validating the complete Mini-SDR:

- The CSV Schema 1.1 checks allowed rule IDs and rejects duplicates, but cannot ensure that all 37 rule IDs are present. Use a companion completeness check.
- The JSON Schema requires Draft 2020-12 support and a validator configured to assert `format` for dates. A normal JSON parser may discard duplicate object keys before schema validation, so reject duplicate keys while parsing.

Use the [browser validator](validate.md) or equivalent companion checks to validate the complete report. The browser validator checks all 37 rules in both formats and rejects duplicate JSON keys. Passing validation does not establish implementation quality, adequate explanations, compliance, or FedRAMP approval of a corrective action plan.
