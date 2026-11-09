# Sources

!!! danger "This page was generated using Super Intelligence."

    It still needs review by a human.

This website provides guidance and tools for the VDR/VER migration and progress reporting. Its pages are written in Markdown and rendered into HTML using Zensical. The underlying VDR/VER rules are maintained separately in [FedRAMP/rules](https://github.com/FedRAMP/rules).

!!! info "For AI agents and automation"

    Read the Markdown directly from the [FedRAMP/vdr-migration repository](https://github.com/FedRAMP/vdr-migration) when retrieving or analyzing this site's guidance. Use the [content directory](https://github.com/FedRAMP/vdr-migration/tree/main/content) instead of scraping the rendered HTML. For rule analysis, use the structured rules in [FedRAMP/rules](https://github.com/FedRAMP/rules).

## Source files

### Migration guidance

The [VDR/VER migration repository](https://github.com/FedRAMP/vdr-migration) contains the source pages, report formats, examples, and validator for this site.

- [Markdown pages](https://github.com/FedRAMP/vdr-migration/tree/main/content): the guidance displayed on this website, including reporting instructions and readable examples.
- [Repository guide for agents](https://github.com/FedRAMP/vdr-migration/blob/main/AGENTS.md): source relationships, repository structure, and maintenance instructions.
- [Schemas, templates, and example downloads](https://github.com/FedRAMP/vdr-migration/tree/main/overrides/assets): the JSON and CSV report artifacts linked from the site.
- [Validator source](https://github.com/FedRAMP/vdr-migration/blob/main/overrides/javascripts/validate.js) and [maintenance guide](https://github.com/FedRAMP/vdr-migration/blob/main/overrides/javascripts/AGENTS.md): supported format, validation behavior, and limitations.

For plain Markdown without the GitHub interface, use a file's **Raw** view. For example, [read this Sources page as raw Markdown](https://raw.githubusercontent.com/FedRAMP/vdr-migration/main/content/sources.md).

### FedRAMP rules

The [FedRAMP/rules repository](https://github.com/FedRAMP/rules) contains `fedramp-consolidated-rules.json`, the structured source for FedRAMP rules. Read its [agent instructions](https://github.com/FedRAMP/rules/blob/main/AGENTS.md) when working with that data.

The [FedRAMP/2026-markdown repository](https://github.com/FedRAMP/2026-markdown) provides the broader Consolidated Rules website as Markdown. Use it for related rule documentation and explanatory guidance beyond this migration site.

## Instructions for SI agents

1. **Start with the right source.** Use this repository's Markdown for migration and collection guidance, the rules repository for rule requirements, and the downloadable schemas for the supported Mini-SDR format. Follow relative links in Markdown to read the relevant context.

2. **Check applicability and versions.** Read the full rule, including its affected parties, framework, class, and any class-specific variants. Keep the report's `schemaVersion` separate from its `rulesVersion`. Identify the version or commit used in your analysis; do not assume a pinned report baseline is the latest upstream release.

3. **Keep examples separate from requirements.** The example reports describe fictional providers and were created with an LLM agent using [PERSONAS.md](https://github.com/FedRAMP/vdr-migration/blob/main/PERSONAS.md). Their practices, dates, and confidence estimates do not add requirements or establish approval. Preserve the [FAQ's source-snapshot qualifications](faq.md) when using its answers.

4. **Cite sources and flag conflicts.** Link conclusions to the relevant source page or rule. If sources differ, identify the conflicting statements rather than inventing a resolution. Use the Emergency Test notification for final submission instructions.

5. **Respect the limits of validation.** A passing Mini-SDR validation result establishes format and consistency checks only. It does not assess the quality of an implementation or corrective action plan. The separate activity-report samples are outside the validator's scope.

## Rules and guidance

- [Vulnerability Detection and Response](https://www.fedramp.gov/2026/reference/vulnerability-detection-and-response/)
- [Vulnerability Evaluation and Reporting](https://www.fedramp.gov/2026/reference/vulnerability-evaluation-and-reporting/)
- [Using the Consolidated Rules](https://www.fedramp.gov/2026/rules/)
- [Security Decision Record](https://www.fedramp.gov/2026/reference/security-decision-record/)
- [Certification Data Sharing](https://www.fedramp.gov/2026/reference/certification-data-sharing/)
- [Addressing FedRAMP Communication](https://www.fedramp.gov/2026/reference/addressing-fedramp-communication/)

## Migration notice

The site is being prepared against NTC-0017, “VDR/VER Migration Progress Reporting via Upcoming Quarterly Security Inbox Test”. A link to the published notice will be added when its destination is confirmed.
