# Data Collection via Emergency Test

FedRAMP announced that VDR/VER Migration Progress Reports will be collected via the FY27 Q1 Security Inbox Emergency Test in [NTC-0017](https://www.fedramp.gov/notices/0017). This page contains information about what to expect for this Emergency Test.

!!! info "Last Updated: Tuesday, November 10, 2026 (2026-11-10)"

!!! warning "These details are subject to change up until the day of the Emergency Test!"

    FedRAMP will avoid any unnecessary changes to these requirements, but may be directed to collect additional information or find problems that require changes to the collection requirements. Please monitor the [changelog](changelog.md) for this site.

---

## Expected Timeframes

The goal is to allow nearly two weeks for providers to receive the final data call and respond. Providers may respond before the deadline, and are strongly encouraged to prepare and test materials in advance.

| Likely Date | Action |
| -- | -- |
| Between **2026-12-01** and **2026-12-10** | FedRAMP will send the Emergency Test requesting a VDR/VER Migration Progress Report. Current target is **2026-12-03.** |
| **2026-12-17** at 2pm Eastern | Anticipated deadline for all providers to respond to the Emergency Test. |

## Expected Actions

The Emergency Test will most likely require the following actions:

1. **Supply [required information](report.md) to FedRAMP via a web form:** We are currently prototyping options for this and hope to supply a form on https://help.fedramp.gov for this action, but may need to revert to a google form or other alternative.

2. **Add [required information](report.md) to your FedRAMP package repository:** All providers will need to make VDR/VER Migration Progress Reports available to their customers, either by adding it to their trust center or package repository. This information also may be responsibly published publicly if the cloud service provider is confident it is not likely to impact confidentiality, integrity, or availability of the offering and does not contain sensitive business information.

!!! warning "VDR/VER Migration Progress Reports should be supplied responsibly!"

    Do not include sensitive information in these reports. FedRAMP will likely be using a Class B system to collect this information. They should be high-level and avoid any specifics that would likely identify an exploitable vulnerability.

## Expected Questions

The Emergency Test form will most likely require answers to the following questions:

1. Your email.
2. Your FedRAMP ID (will be provided in direct notification, one per cloud service offering in the Marketplace)
3. Your unique code (will be provided in direct notification, one per cloud service offering in the Marketplace).
4. Attachment: Your Progress Report Mini-SDR.
5. Attachment: A sample or example machine-readable activity report.
6. Attachment: A sample or example human-readable activity report.
7. Date of latest Corrective Action Plan target (if applicable).
8. Name and position of senior official attesting to the accuracy of this information.
9. Confirmation that the required information has been added to your package repository or trust center.
10. Any feedback you would like to provide to FedRAMP about the VDR/VER Migration Progress Report process overall.

## Exemptions to VDR/VER Migration Progress Report Collection

Cloud service offerings that are not subject to the VDR/VER Migration Process will receive a standard Emergency Test message requiring them to acknowledge the message. The following profiles and Marketplace statuses are exempt from this collection:

- FedRAMP 20x Class A
- FedRAMP 20x Class B (CR26)
- FedRAMP 20x Class C (CR26)
- FedRAMP Initial Implementation
- FedRAMP Rev5 Legacy Ready
- FedRAMP Rev5 Agency Authorization In Process
- By Government, For Government or other Agency-Provided Offerings
