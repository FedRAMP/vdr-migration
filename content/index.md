# Overview of the FedRAMP VDR/VER Migration

The VDR/VER migration deadline is **December 7, 2026.** There is an automatic grace period until **March 7, 2027.**

!!! tip "Fully migrated means all required rules are implemented."

    A cloud service is considered "fully migrated" when ALL of the following conditions are met:

    - All MUST/MUST NOT rules are fully implemented.
    - All SHOULD/SHOULD NOT rules are fully implemented OR otherwise addressed.

## Important Deadlines

| Date | What it means |
| --- | --- |
| December 7, 2026 | Services that have not fully migrated must provide per-rule corrective actions and target timelines in a VDR/VER Migration Progress Report; the mechanism and deadline for submitting this will be provided in a Security Inbox Emergency Test. |
| February 3, 2027 | Services planning to complete migration after this date will be placed in “FedRAMP Certified (In Remediation)” status until they notify FedRAMP that migration is complete. |
| March 7, 2027 | The grace period ends. An extension requires FedRAMP approval of the Corrective Action Plan and agreement to a FedRAMP-coordinated red team assessment. |
| March 8, 2027 | Services that have neither fully migrated nor obtained an approved Corrective Action Plan will have their certification revoked and be banned from FedRAMP for one year. |

!!! success "Supply corrective action plans to avoid administrative action!"

    If you will miss the deadline for some rules, you can submit a corrective action plan for each partially implemented rule in your Progress Report to reduce the level of administrative action taken by FedRAMP.

!!! example "FedRAMP will be mostly hands-off until February 2027."

    FedRAMP will begin working with services needing an extended conditional grace period in February. Emergency communications will be sent to all outstanding cloud services requesting a status update and a progress review for any provider that does not anticipate completing the full migration prior to March 7, 2027.

    All corrective action plans are considered pre-approved by FedRAMP until or unless FedRAMP reviews the corrective action plan and notifies the cloud service provider otherwise. These reviews will mostly begin in February 2027.

## Agency Authorization In Process

Cloud services that are _Agency Auth In Process_ are in a bit of a weird situation when deadlines like this hit - their package may be under review by an agency and they might even be in a change freeze. This type of situation is one of the reasons FedRAMP is moving away from the Agency Certification path; the result is that after the Agency Certification is completed against legacy rules the cloud service is no longer compliant with current FedRAMP Certification requirements.

FedRAMP will work with these cloud services to help them complete their migration to the VDR/VER in a timely manner if they have not done so due to the limitations of being in process for an initial agency authorization.

1. **After December 7, 2026,** a cloud service that receives an agency authorization to operate (ATO) must provide a VDR/VER Migration Progress Report with its application for a new FedRAMP Rev5 Certification.

    If the service has not fully migrated, explain the planned corrective actions for each affected rule in the Mini-SDR. If FedRAMP approves the Corrective Action Plan, the service is eligible for a short-term certification with conditions based on that plan.

2. **After March 7, 2027,** FedRAMP will not initiate review of a service that has received an agency ATO unless it has fully migrated to VDR/VER before applying for a new Rev5 Certification.


## Agency-Provided Offerings

!!! danger "Agency-provided offerings are EXEMPT from the VDR/VER!"

    Agency-provided offerings, including those listed in the Marketplace's "By Government, For Government" section, are already subject directly to CISA BOD 26-04 and do not need to implement separate FedRAMP vulnerability-related rules. The federal system owners of these offerings should follow the instructions from their authorizing official to implement this directive appropriately.

FedRAMP expects agency-provided offerings to move to an A-130 Class G Certification in the near future, with entirely separate FedRAMP rules based on the fact that they are operated by a federal agency instead of a commercial company. Additional information on this path will be shared publicly soon.
