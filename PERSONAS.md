# Fictional provider authoring reference

These personas govern the Mini-SDR examples, not provider requirements. All organizations, operating details, evidence, and migration histories are invented. JSON is the canonical report; CSV and readable pages must contain the same answers. The original files in Downloads remain historical inputs.

## Aster Cloud: Aster Operations Cloud

Profile: 20x Class C; `EXAMPLE-ASTER-20X-C`; December 11, 2026.

Aster sells annual subscriptions for internal operational workflows, priced by active users and execution volume. Agencies use it to route service requests, approvals, and supporting attachments between authorized staff and approved integrations. The product stores business records and user identities; it does not run public websites or permit customers to execute arbitrary code. Tenant administrators configure forms and routing within a constrained workflow language.

The service runs stateless gateways and containerized execution workers across two failure zones, with relational tenant data, separate attachment storage, and durable work queues. A second location holds recovery copies and a tested standby environment. Application authorization and tenant-scoped data access enforce separation; network segmentation is an additional control. Workers have distinct identities from the administrative and reporting services, and internet-originated attachments and callbacks remain relevant to private-worker reachability.

### Operating facts

- An 80-person business has a 12-person platform team, an eight-person security operations rotation providing continuous coverage, and named application owners. A reporting owner and deputy maintain necessary-party access and exports.
- Agency identity federation and multifactor privileged access are separate from workload identities. Administrative access is time-limited and recorded; tenant administrators cannot grant infrastructure privileges.
- Release manifests identify images, dependencies, configuration, and required permissions. Staged releases run authorization, isolation, and detection checks before and after deployment; rollback preserves evidence.
- Every machine is inventoried and checked daily. Intrusive detection may sample equivalent execution workers; unique services are assessed individually. Daily drift checks still cover every group member, and equivalence is reassessed on change.
- Non-machine resources receive monthly verification and validation; frequently changing procedures receive weekly review. Detection includes failed processes and inaccurate documentation.
- One evidence ledger connects finding intake, evaluations, exploitation review, response, and report history. AI assists with cited summaries; analysts decide, with a second AI check surfacing disagreements. Routine evaluations finish within one day and all complete within five days.
- Class C reduction timers are calculated from the rule matrix. Known-exploited catalog dates remain separate remediation deadlines. Mitigated findings remain open for remediation as appropriate.
- Daily activity exports and historical JSON retrieval serve necessary parties; monthly human-readable reports reconcile all activity. Publication failures create process findings. A reporting repair completed December 8; historical retrieval completed December 9.
- Backup access is isolated from runtime administration. Quarterly restoration exercises verify tenant data, attachments, and queued-work recovery, including duplicate-processing controls. Recovery does not establish protection against disclosure or unauthorized alteration.

Migration is complete for every applicable rule. This does not claim that the service has no vulnerabilities. Retained Completed CAPs describe repaired migration processes, and ongoing findings continue through ordinary detection and response.

## Harbor Systems: Harbor Agency Workspace

Profile: Rev5 Class C; `EXAMPLE-HARBOR-REV5-C`; December 14, 2026.

Harbor sells annual agency workspace subscriptions with licensed seats, storage allowances, and separately priced integration support. Case teams exchange documents, assign review tasks, and retain decision histories. Agency-specific adapters import records and export completed case packages; configurations vary enough that identical software versions can have different exposure. The service holds restricted agency records and requires careful separation of case permissions and administrative access.

A mature application uses a web tier, application servers, document-conversion workers, relational databases, and attachment storage in segregated agency environments. Shared identity, reporting, and operational services have tightly limited access across those environments. Conversion workers and integration adapters remain coupled to older runtime components. Primary and recovery environments have documented restoration procedures, while restricted management paths and network filtering limit exposure without eliminating indirect internet reachability through uploaded documents.

### Operating facts

- A 45-person business has six operations engineers and four security analysts, with a duty rota and engineering escalation outside business hours. Two application specialists support legacy adapters; one reporting coordinator and a deputy manage exports.
- Agency federation supplies user identity; case authorization is enforced by the application. Privileged access uses separate accounts, multifactor authentication, and approved maintenance sessions.
- A controlled release package and two-person checklist govern deployments. Staff initiate changed-resource scans manually. Daily scheduled scanning covers web and application tiers; isolated conversion and integration machines receive weekly scans. No sampling is used.
- Machine verification and validation cover the whole inventory monthly. Non-machine reviews complete quarterly, with some drift-prone procedures reviewed monthly; these meet the mandatory quarterly rule but leave Class C recommendation gaps.
- A version-controlled response register links findings to restricted evidence folders. Analysts reconcile every detection source daily and track complete contextual evaluations, though difficult cases exceed five days. Source reconciliation does not imply daily scans of every resource.
- All mandatory report fields are populated and independently checked. Daily change reports use a controlled JSON export and authenticated file distribution; historical files require manual collection because there is no automated history interface. Monthly human-readable reports are complete, but their overview does not yet cover every activity source.
- Each finding remains individually tracked because tenant-specific adapters differ. The documented grouping departure carries duplicate-work risk and periodic cross-record review.
- Integration work is staged: incident triggers in January, worksheet and overview repairs in February, scan cadence and evaluation capacity in March, release triggers in April, procedure schedules in May, and workflow/history integration in June 2027. Supplier-dependent impact reduction remains Pending Plan, reviewed January 15.
- Tested restoration and restricted administration support resilience. Supplier delays concern reductions for non-KEV legacy weaknesses; known-exploited affected components are replaced or removed by catalog due dates even when this interrupts optional conversion functions.

All applicable MUST/MUST NOT rules are implemented through this labor-intensive operating model. Recommendation gaps concern automation, cadence, evaluation breadth, and incident triggers. The completed December 10 CAP repaired report-field mapping; future work is not represented as already operating.

## Smallbrook Services: Smallbrook Public Information Workspace

Profile: Rev5 Class B; `EXAMPLE-SMALLBROOK-REV5-B`; December 16, 2026.

Smallbrook sells annual subscriptions by public site and storage allowance, with a modest setup fee for page migration. Agency editors prepare informational pages and downloadable publications in a private workspace, then publish approved versions to public sites. It excludes sensitive submissions, transactions, and critical operational workloads from its intended use. Drafts, editor identities, and publication integrity still require protection even though published material is public.

A small virtual-machine fleet hosts the editor application, a publishing worker, and a relational database, with separate object storage for drafts and published files. A public delivery cache serves published copies; the administrative workspace uses agency identity federation and multifactor access. Multiple agencies share application and database infrastructure, with tenant identifiers enforced in application queries. Recovery copies sit outside the primary operating environment, but permissions and dependency mapping are less mature than the team’s restoration procedures.

### Operating facts

- A 12-person business has three application engineers and two operations generalists. One generalist coordinates security; a fractional adviser reviews difficult findings for two days each month. The engineering lead owns the migration backlog, with one engineer allocated half-time initially and another quarter-time for reporting work.
- There is no dedicated security operations center or continuous analyst coverage. The on-call engineer responds to critical service alarms; findings normally receive an initial weekly review. Intake time and completed evaluation time are distinct.
- Operators manually initiate full-population machine detection every week and retain results. This satisfies the seven-day machine detection recommendation, but it does not establish complete configuration validation or non-machine coverage. No sampling is used.
- Procedures, supplier responsibilities, and documentation reviews have gaps exceeding both three and six months. Draft and publication paths are known, but indirect input paths, contextual exploitability, and multi-agency effects are not consistently evaluated.
- A shared operations log records findings and repairs; response history and reporting fields are incomplete. Failed detection and reporting jobs have been treated as maintenance tasks rather than vulnerabilities. No end-to-end detection/response automation exists.
- Monthly human-readable reports are delivered, but omitted activity and incomplete detail prevent a fully implemented reporting claim. Accepted-vulnerability handling does not consistently capture forecast delays. There is no automated historical JSON retrieval.
- The team assumes exploitation is automatable, keeps vulnerability details in restricted channels, and avoids weakening protections for scanning. It does not exercise optional public disclosure or either optional vulnerability-based incident classification; other incident duties remain separate.
- Critical process and acceptance repairs are scheduled in January 2027; KEV, impact, and activity-accounting work in February; evaluation, inventory, and report-field work in March. Machine validation and drift review follow in April, release checks and residual maintenance in May, architecture and evaluation breadth in June. Optional staffing depends on renewals, reflected in confidence estimates.
- September targets cover false-positive review consistency (September 15), overview reporting (September 1), and historical retrieval (September 30). Broader automation and supplier-dependent reduction planning lack credible completion dates. These dates imply no approved extension.
- Quarterly restore exercises recover the editor database and published objects. Agencies should maintain independent publication copies and alternate communications; these measures cannot prevent disclosure or falsification within a compromised service.

Migration remains far behind. Basic operational protections are present, but detection breadth, evaluation quality, reporting completeness, and dependable treatment timing need substantial work. Class B and the product’s limited use cases do not excuse those gaps.

## Authoring sources and limits

The following skills informed fictional operating details only. The repository’s `2026.11.02.01` provider rules and format `0.2.0` determine applicability, required information, and CAP structure.

- [DevOps Security: vulnerability scanning](https://github.com/BagelHole/DevOps-Security-Agent-Skills/blob/main/security/scanning/vulnerability-scanning/SKILL.md): inventory reconciliation, finding validation, response ownership, and closure evidence. Its generic severity deadlines and sample commands were not adopted.
- [Prowler compliance](https://github.com/prowler-cloud/prowler/blob/master/skills/prowler-compliance/SKILL.md): honest coverage mapping and explicit manual evidence where automated checks cannot establish a requirement.
- [Scytale FedRAMP](https://github.com/scytale-labs/GRC-Claude-Skills/blob/main/skills/fedramp/SKILL.md): offering boundaries, inherited responsibilities, and operational documentation. Older program terminology and generic monitoring claims were not used as current policy.
- [Cloud-native microservices](https://github.com/mchittineni/cloud-platform-skills/blob/main/skills/platform-engineering/cloud-native-microservices-patterns/SKILL.md): deployment boundaries, durable work, dependency handling, and correlated operational evidence.
- [Security reviewer](https://github.com/jeffallan/claude-skills/blob/main/skills/security-reviewer/SKILL.md) and its infrastructure reference: identity boundaries, restricted assessment access, manual context review, and secrets management.
- [Vulnerability management](https://skills.sh/cbrock84/headcount/vulnerability-management): only the catalog excerpt on contextual exploitability and compensating controls was accessible. The requested RuleSkill page blocked retrieval and the linked repository returned 404; the user authorized proceeding with this limitation.

No infrastructure scans or compliance assessments were performed for these fictional examples. Source skills were not installed as site dependencies. Narrative fields contain 2–5 sentences, with 2–3 for CAP status explanations; optional fields are populated only when useful. Product and infrastructure brands are omitted from public narratives.

## Logo assets and generation prompts

Generated with the built-in image-generation tool and saved under `overrides/assets/examples/logos/`: [Aster](overrides/assets/examples/logos/aster.png), [Harbor](overrides/assets/examples/logos/harbor.png), and [Smallbrook](overrides/assets/examples/logos/smallbrook.png). The pages display each at 112 pixels wide with descriptive alternative text. Harbor and Smallbrook retain generated transparency; Aster uses a white background after the transparent drafts were insufficiently legible.

Final selected prompts:

- Aster: “A small corporate logo printed on pure white paper: five separate dark purple angular petals around a small white pentagon, an original abstract aster flower icon for a fictional workflow software provider. Flat vector-style graphic. White background. Extremely crisp high contrast edges. Generous white margins. No glow, blur, light effects, texture, gradients, 3D, shadows or lettering. Simple, restrained, designed to be legible at thumbnail size.”
- Harbor: “Use case logo-brand. Generate an original small fictional company symbol for Harbor Systems, an established agency case and document collaboration SaaS. Abstract sheltered harbor made from two interlocking document-like forms. Flat solid ink shapes, crisp edges, highly legible at 96 pixels. No glow, no gradients, no shadows, no textures, no text, no certification badge, no resemblance to existing company logos. Transparent background. Restrained professional appearance.”
- Smallbrook: “Use case logo-brand. Create an original small fictional logo symbol for Smallbrook Services, a modest public-information publishing SaaS. A simple open page with a brook flowing through its negative space, friendly and understated. Solid flat shapes, clear at 96 pixels, no lettering, no glow, no gradients, no shadows or textures. Transparent background, no existing brand resemblance, no government seal or certification badge.”
