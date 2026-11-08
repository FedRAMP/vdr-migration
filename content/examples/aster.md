# Aster Operations Cloud

![Aster Cloud fictional logo](../assets/examples/logos/aster.png){ width="112" }

Aster sells annual subscriptions for internal operational workflows, priced by active users and execution volume. Agencies use it to route service requests, approvals, and supporting attachments between authorized staff and approved integrations. The product stores business records and user identities; it does not run public websites or permit customers to execute arbitrary code. Tenant administrators configure forms and routing within a constrained workflow language.

The service runs stateless gateways and containerized execution workers across two failure zones, with relational tenant data, separate attachment storage, and durable work queues. A second location holds recovery copies and a tested standby environment. Application authorization and tenant-scoped data access enforce separation; network segmentation is an additional control. Workers have distinct identities from the administrative and reporting services, and internet-originated attachments and callbacks remain relevant to private-worker reachability.

This fictional example describes the offering as of 2026-12-11. Its FedRAMP ID `EXAMPLE-ASTER-20X-C` is an example identifier, not a Marketplace entry. The implementation claims, evidence, dates, and confidence estimates are invented; no FedRAMP approval or staff review is claimed.

[All examples](index.md) · [JSON](../assets/examples/aster.json) · [CSV](../assets/examples/aster.csv)

Framework: 20x; Class: C; format: `0.2.0`; rules: `2026.11.02.01`.

## Migration situation

Every applicable rule is fully implemented in this scenario. The reporting team completed its activity-checkpoint repair on December 8 and historical retrieval work on December 9; both CAPs remain in the record as completed history. Ongoing vulnerabilities still require evaluation and treatment through the operating process.

## Response summary

| Implementation status | Rules |
| --- | ---: |
| Fully Implemented | 36 |
| Partially Implemented | 0 |
| Not Implemented | 0 |
| Not Applicable | 1 |

| CAP status | Rules |
| --- | ---: |
| Planned | 0 |
| In Progress | 0 |
| Pending Plan | 0 |
| Completed | 2 |
| Not Applicable | 1 |

## Rule responses

### VDR-CSO-DET: Vulnerability Detection

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Our detection inventory follows the workflow service from the public gateway through queue workers, tenant data stores, and the administrative plane. Daily image and configuration checks are combined with runtime telemetry, dependency advisories, researcher reports, and scheduled application testing. Control owners also compare operating records with documented procedures, and the security operations team investigates missing sources during each shift handover.

### VDR-CSO-RES: Vulnerability Response

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Each finding enters the same evidence ledger used by platform engineers and the security operations team, with its original detection time and accountable service owner. Analysts evaluate exploitation, customer exposure, and response options while engineers record containment and repair work against the affected resource identifiers. A closure review checks the deployed result and residual exposure; a temporary restriction remains recorded as mitigation while the underlying weakness exists.

### VDR-CSO-FAV: Failures Are Vulnerabilities

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   A collector heartbeat failure, missed evaluation, or incomplete customer export opens a process-vulnerability record in the evidence ledger. The duty analyst identifies the period and resources whose coverage may have been lost and arranges a backfill or fresh assessment. Repairing the failed job closes the operational task only after the associated coverage gap has been evaluated and reported.

### VDR-CSO-DFR: Design For Resilience

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   Workflow execution workers use narrowly scoped service identities and cannot directly administer tenant stores or the reporting service. Tenant-aware authorization is enforced at the application and data-access layers, with negative tests for cross-tenant requests included in release qualification. Separately controlled evidence storage, staged deployment, and tested restoration let responders investigate and replace affected components without granting broad access to customer workflows.

### VDR-CSO-ADT: Automate Detection

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   Automated collectors join inventory, deployment manifests, configuration observations, and security findings through stable resource identifiers. The evidence ledger assigns owners, calculates response timers, and prepares reporting changes while analysts approve contextual judgments and exceptions. AI-assisted summaries cite the underlying observations, and a second model flags conflicting interpretations for human resolution without acting as an independent assessor.

Additional assurance
:   Analysts can inspect the source observation behind each AI-prepared statement before approving it. A disagreement queue records how conflicting summaries were resolved and prevents either model from independently closing a finding.

### VDR-CSO-DAC: Detect After Changes

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   A new deployment or material configuration change initiates image analysis, configuration validation, and tests against a representative tenant in the release environment. The pipeline then checks the deployed resources and confirms that their identities and telemetry match the approved manifest. Failed checks stop expansion of the rollout and create findings that remain visible even if the release is rolled back.

### VDR-CSO-MSP: Maintain Security

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD NOT

Implementation status: `Fully Implemented`

Implementation explanation
:   Assessment identities have time-limited, task-specific permissions, and scanner traffic uses the same approved administrative boundaries as other maintenance activity. We do not disable authentication, tenant checks, or production logging to make an assessment succeed. Where an intrusive test could affect customer work, the team uses an isolated representative environment and separately verifies that the relevant production configuration is equivalent.

### VDR-CSO-AKE: Avoid KEVs

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD NOT

Implementation status: `Fully Implemented`

Implementation explanation
:   Before activation, the release gate compares the exact image digest and its component inventory with the current known-exploited vulnerability catalog. An affected image remains blocked until a corrected build or replacement component passes the check, including emergency releases. Platform engineers retain the catalog version and gate result with the deployment record so the decision can be reconstructed later.

### VDR-CSO-SIR: Sampling

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: MAY

Implementation status: `Fully Implemented`

Implementation explanation
:   We sample interchangeable execution workers only when their image digest, configuration, permissions, and workload exposure establish effective equivalence. Inventory and drift checks still cover every worker, and tenant stores, gateways, and administrative services receive individual assessment. A differing configuration or unexpected result breaks the sample group and expands testing to the affected population.

### VDR-TFR-NMV: Non-Machine Verification and Validation

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Control owners verify and validate non-machine resources on a monthly schedule, including access-review procedures, response runbooks, supplier responsibilities, and security documentation. Reviews compare the written instructions with recent execution records and a walkthrough of the relevant task. Unperformed steps and inaccurate descriptions become findings in the same ledger as technical weaknesses, keeping the interval within the three-month requirement.

### VDR-TFR-PDD: Persistent Drift Detection

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   Resources likely to drift are checked daily against their approved state, including workload identities, network policies, and mutable runtime configuration. Owners review frequently changing operational procedures weekly using recent execution records. A resource without a current monitoring assignment becomes an inventory exception, so the fourteen-day Class C interval is not dependent on somebody remembering a newly created service.

### VDR-TFR-PCD: Persistently Complete Detection

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   The stable-resource register covers immutable release artifacts and less frequently changing non-machine resources, with an owner and a documented basis for each classification. Daily artifact checks and monthly procedure reviews provide complete detection within the Class C monthly interval. Changes to the resource or its operating context move it to the drift-prone schedule until its classification is reviewed.

### VDR-TFR-PVR: Mitigation and Remediation Expectations

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   The evidence ledger applies the Class C impact-reduction matrix using the completed evaluation time, current potential agency impact, reachability, and likely exploitability. Service owners receive intermediate reduction deadlines as well as a remediation task, and the duty analyst verifies evidence before recording a lower impact rating. A missed deadline escalates through the security operations lead; changing an estimate or scheduling a patch does not itself count as a reduction.

### VDR-TFR-RMN: Remaining Vulnerabilities

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   Residual weaknesses that no longer need urgent containment remain assigned to a service owner and appear in the weekly maintenance review. Engineers use routine image replacement, dependency upgrades, and configuration cleanup to reduce this backlog alongside feature work. The owner records any deferral and reassesses it when customer use or the available threat evidence changes.

### VDR-TFR-KEV: Remediate KEVs

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   The catalog ingestion job compares known-exploited entries with both deployed component inventories and release candidates each day. For an affected deployed component, the response owner records the catalog due date and confirms remediation through a replacement inventory and targeted verification. Filtering or isolation can reduce exposure while the repair is prepared, but the catalog remediation task stays open until the vulnerable condition is removed.

### VDR-TFR-PSD: Persistent Sample Detection

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   Representative execution-worker groups receive detection every day, with selection rotated across active deployments and hosting locations. New configurations are assessed before they enter an existing group, and any loss of equivalence triggers broader coverage. Individually assessed machine resources follow the same daily schedule, exceeding the Class C three-day interval.

### VDR-TFR-MVX: Persistent Machine Verification and Validation for 20x

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Daily verification compares deployed machine resources with approved manifests, and validation tests check that authorization, logging, isolation, and recovery dependencies operate as intended. Every resource is accounted for through direct checks or a documented equivalent-worker sample whose membership is independently reconciled. The resulting evidence and exceptions demonstrate coverage within the three-day 20x Class C interval.

### VDR-TFR-MVF: Persistent Machine Verification and Validation for Rev5

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/) · Force for this profile: Not applicable to this framework

Implementation status: `Not Applicable`

Implementation explanation
:   This offering follows the 20x Class C machine-verification requirements and is not a Rev5 offering. Its daily verification and validation process is described under VDR-TFR-MVX, which is the applicable framework-specific rule.

#### Corrective action plan

CAP status
:   Not Applicable

Reason for CAP status
:   The Rev5-specific rule does not apply to this 20x offering. No corrective work is needed for this rule because the applicable machine-verification obligation is covered by VDR-TFR-MVX.

### VER-EVA-ELX: Evaluate Exploitability

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Analysts examine whether the vulnerable function is present and usable in the deployed workflow service, including required privileges, input conditions, and existing protections. They correlate component observations with application traces and controlled reproduction where needed. The decision and its uncertainties remain linked to the finding, and a changed deployment or new exploitation evidence triggers reevaluation.

### VER-EVA-EIR: Evaluate Internet-Reachability

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   The reachability review traces internet-originated requests, uploaded attachments, queued messages, and integration callbacks to the affected function. A worker behind a private network boundary can still be internet-reachable through those processing paths. Analysts retain the relevant data-flow evidence and revisit the determination when routing, integrations, or input handling changes.

Feedback
:   A worked example covering delayed processing of an uploaded file would help reviewers compare reachability decisions across asynchronous services. Our own evaluations treat the original internet-controlled input as relevant even when processing occurs later on a private worker.

### VER-EVA-EPA: Estimate Potential Agency Impact

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   We estimate likely effects on agency confidentiality, integrity, and availability using the affected workflow, data permissions, and scope of shared dependencies. The reviewer assigns the corresponding N0–N5 rating and records whether consequences could extend across tenants or agencies. Tenant isolation and recovery evidence support the estimate only to the extent that they address the actual exploitation path and customer effect.

### VER-EVA-AIA: Assume It's Automatable

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Every evaluation begins with the assumption that exploitation can be automated. An analyst may depart from that assumption only with specific evidence about the required interaction or environmental constraint, which a second reviewer checks. Neither an absence of observed attacks nor an unpublished exploit is sufficient to change the assumption.

### VER-EVA-GRV: Group Vulnerabilities

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   Findings can share a response group when the affected resources have the same vulnerable condition, exposure, impact, and repair path. Each group retains its member identifiers and source observations, allowing individual resources to be separated when their context changes. The service owner verifies coverage after a group repair so an unpatched worker cannot disappear behind the group status.

### VER-EVA-EFP: Evaluate False Positives

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   A proposed false positive must identify the observed condition, the reason the detection was misleading, and evidence from the deployed service. Analysts distinguish an absent vulnerability from a real vulnerability whose exploitation is currently constrained. Suppression is limited to the validated configuration and is reconsidered after component, permission, or exposure changes.

### VER-EVA-EFA: Evaluation Factors

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   The evaluation worksheet covers criticality, reachability, exploitability, detectability, prevalence, privilege, proximate vulnerabilities, and known threats. Analysts connect these factors to tenant workflows and shared services, including whether one weakness makes another reachable or more damaging. Unresolved evidence is recorded explicitly and assigned for follow-up before an unsupported low-impact conclusion is accepted.

### VER-RPT-PER: Persistent Reporting

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Daily controlled exports account for all detection and response activity since the previous report, including successful verification, failed checks, evaluations, and completed reductions. A checkpoint reconciliation compares the export with the evidence ledger before making it available to all necessary parties under the certification-data sharing process. The reporting service records access and delivery failures, retries interrupted publication, and opens a process finding when coverage or availability is incomplete.

Additional assurance
:   The reporting team rehearses missing-event and interrupted-publication failures in an isolated reporting environment each month. Those exercises verify checkpoint recovery and access without inserting synthetic findings into customer reports.

#### Corrective action plan

CAP status
:   Completed

Reason for CAP status
:   The reporting team completed the activity-checkpoint repair on December 8 and verified the backfilled reporting interval. Subsequent daily exports have reconciled without missing verification events.

Corrective actions
:   Engineers added verification and validation events to the export checkpoint and replayed the affected interval from the evidence ledger. The reporting owner checked the replay for omissions and duplicates, then tested an interrupted publication and confirmed recipient access to the recovered report.

Completed date
:   2026-12-08

### VER-RPT-VDT: Vulnerability Details

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Non-accepted findings retain tracking identifiers, detection sources and times, completed evaluations, reachability, likely exploitability, and historical and current impact ratings. Exports include evaluated reduction times, the next target reduction, overdue status and explanation, useful agency context, and final disposition where applicable. Required-field and history checks run against the source ledger, with rejected exports assigned for correction and any resulting reporting gap escalated.

### VER-RPT-AVI: Accepted Vulnerability Info

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   Accepted findings retain their original identifiers and detection and evaluation times, together with current reachability, exploitability, and impact. The responsible owner explains the acceptance and the specific limitations or actions that may help agencies protect their data. Changes in exposure or treatment continue to appear in subsequent exports, and provider acceptance does not represent an agency risk decision.

### VER-RPT-NID: Responsible Disclosure

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST NOT

Implementation status: `Fully Implemented`

Implementation explanation
:   Agency-facing reports provide affected service functions, likely customer effects, treatment status, and practical protective actions through authenticated channels. A release reviewer checks whether combinations of paths, payload details, and configuration information would unnecessarily facilitate exploitation. Sensitive technical evidence is restricted to recipients who need it while the broader necessary-party report retains enough context for a meaningful risk decision.

### VER-RPT-HLO: High-Level Overviews

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   The monthly overview reconciles the ledger with every detection source, including researcher submissions, penetration tests, control reviews, and supplier notifications. It explains significant changes, completed responses, and coverage failures during the reporting period, including sources with no new findings. Counts are checked against the detailed activity exports so changes in grouping or classification do not appear as unexplained improvements.

### VER-RPT-RPD: Responsible Public Disclosure

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MAY

Implementation status: `Fully Implemented`

Implementation explanation
:   The security lead may approve a public advisory after checking remaining exposure, affected-party coordination, and whether the proposed detail is likely to enable exploitation. The decision and the released text are retained with the underlying finding. Necessary-party reporting continues through the controlled channel regardless of whether a public advisory is appropriate.

### VER-TFR-MHR: Monthly Activity Report

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   All necessary parties receive a human-readable monthly report in a consistent layout through the authenticated customer reporting area. It explains detection coverage, response activity, accepted vulnerabilities, and changes affecting agency use, with links to the corresponding detailed records. The reporting owner checks recipient access and delivery history each month and investigates any failed or missing publication.

### VER-TFR-MAV: Mark Accepted Vulnerabilities

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MUST

Implementation status: `Fully Implemented`

Implementation explanation
:   At evaluation and each subsequent planning review, the ledger checks whether full mitigation or remediation will occur within 192 days of evaluation. A forecast beyond that threshold categorizes the finding as accepted immediately, and an elapsed-time check catches plans that have slipped. The acceptance reason and continuing response history remain available even if the finding is later fully mitigated or remediated.

### VER-TFR-MRH: Historical Activity

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   An authenticated retrieval endpoint exposes recent historical detection and response activity as JSON, with stable identifiers and explicit update times. Daily publication reconciles the history against the evidence ledger and supports retrieval across interrupted requests without losing prior entries. Access tests use a necessary-party account and verify that the refreshed history is available well within the Class C fourteen-day interval.

#### Corrective action plan

CAP status
:   Completed

Reason for CAP status
:   Historical JSON retrieval passed the necessary-party access and reconciliation checks on December 9. The service is now on the daily publication schedule with a named reporting owner.

Corrective actions
:   The team connected the retrieval endpoint to versioned ledger exports and added stable pagination and update markers. Reviewers tested restricted access, interrupted retrieval, and recovery of earlier activity, then reconciled the returned history against the source records.

Completed date
:   2026-12-09

### VER-TFR-EVU: Evaluate Vulnerabilities Quickly

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   The duty analyst tracks every finding from its original detection time, including disclosures and failures found during procedure reviews. The queue distinguishes intake from a completed contextual evaluation and escalates missing evidence before the five-day Class C limit. Routine evaluations finish within one day, while complex cases receive a named engineer and second reviewer until all required determinations are complete.

### VER-TFR-IRI: Internet-Reachable Incidents

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: SHOULD

Implementation status: `Fully Implemented`

Implementation explanation
:   An internet-reachable, likely exploitable vulnerability with potential agency impact above N3 enters the FedRAMP reportable-incident process when the evaluation identifies that combination. Incident coordination continues until verified partial mitigation reduces the rating to N3 or below. The security lead records the supporting reduction evidence and keeps any remaining repair work in the vulnerability ledger after incident treatment ends.

### VER-TFR-NRI: Non-Internet-Reachable Incidents

[Rule reference](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/) · Force for this profile: MAY

Implementation status: `Fully Implemented`

Implementation explanation
:   We also use the optional incident treatment for likely exploitable, non-internet-reachable vulnerabilities rated N5. The incident lead coordinates the shared-service response until evaluated mitigation reduces the rating to N4 or below. The record explains the reachability determination and reduction evidence, while further remediation continues under the assigned service owner.
