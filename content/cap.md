# Corrective Action Plans

Please include a Corrective Action Plan (CAP) for each VDR/VER rule that is not fully implemented in advance. There is no need for an overall CAP or separate attachment, as this can be generated automatically from your Progress Report Mini-SDR.

!!! success "Any complete corrective action plan is FedRAMP-approved by default, pending February adjudication."

    FedRAMP will begin meeting with cloud service providers who have not fully migrated in February to discuss their corrective action plans in detail. We will make a formal adjudication of the corrective action plan at that time. Our assumption before February is that all cloud service providers are working in good faith to avoid problems with their contractual agreements.

!!! warning "Failure to supply a corrective action plan will result in administrative action!"

    Do not wait for FedRAMP to request a corrective action plan for required rules that are not fully implemented. If you do not include a corrective action plan for each rule in your Progress Report Mini-SDR then your cloud service offering will be placed into public remediation.

---

## Documenting Your Corrective Action Plans

Including an explanation of your planned or in progress corrective action will help FedRAMP and your agency customers understand what remains to be done and how you are addressing the risk of not fully implementing any required rule.

| Expectation | Field | Description |
| -- | -- | -- |
| **Summarize the status.** | `capStatus` | Options for this field are shown in the table below. |
| **Explain the status.** | `capStatusExplanation` | Briefly explain the reason for the current status. If the corrective action is pending a plan or not applicable, perhaps explain in a bit more detail as appropriate. |
| **Explain the gap.** | `capExplanation` | Responsibly explain what corrective you have taken, are taking, and that will need to be taken. |
| **Supply a date and confidence.** | `capTargetDate`, `capConfidence` | Share the current project's overall target completion date for this rule and your current confidence (0-100) in that date. This information is for awareness and will not form the basis of administrative action by FedRAMP. |
/// table-caption
Overview of required documentation for per-rule corrective action plans.
///

!!! tip "Explanations do not need to have extreme detail."

    We imagine you will have a detailed project plan available on request for FedRAMP or agencies, but you do not need to include that level of detail in the Progress Report Mini-SDR. A few sentences is all that is necessary. You may include additional detail if you feel otherwise.

### Corrective Action Plan Status Options

| Status | Explanation |
| -- | -- |
| `Planned` | **Corrective action has not yet begun.**  You should explain why, and when it will begin, along with the other information expected in your `capExplanation`. You must also include `capTargetDate` and `capConfidence`. |
| `In Progress` | **Corrective action has begun but is not completed.** You should explain how much progress you have made, along with the other information expected in your `capExplanation`. You must also include `capTargetDate` and `capConfidence`.|
| `Pending Plan` | **You have no plan, or will not make a plan.** You should have a very good explanation in your `capExplanation` and be prepared for administrative action. |
| `Completed` | **You did it after December 7, 2026! Good job!** This status would typically be used in an update to a previous Progress Report, and should explain what all was completed in the `capExplanation`. You must also include `capCompletedDate`.|
| `Not Applicable` | **This rule does not apply in your circumstances so a CAP is not necessary.** It may be that the rule applies to Rev5 and you are 20x or vice versa, or the force of the rule may not require completion so even though the rule is not fully implemented there is no need for corrective action. This should be used carefully and is mostly there because of the janky CSV schema situation.|
/// table-caption
Explanation of when each corrective action plan status applies.
///

### Preparing Machine-Readable Reports

Use the [schemas and templates](schemas.md#corrective-action-plan-fields) for exact field names and formatting. In JSON, omit unused CAP fields; in CSV, leave their cells blank. A fully implemented rule may omit the CAP or retain a completed one. A rule response marked `Not Applicable` still needs an explained CAP status of `Not Applicable`.

Before submitting, use the [validator](validate.md) to check the file's format and required fields. Review the explanations yourself: a passing result cannot tell you whether the plan adequately addresses the gap or gives your customers enough information.
