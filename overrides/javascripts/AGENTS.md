# Mini-SDR validator maintenance

## Scope and files

`validate.js` is the entire browser validator: a readable, checked-in ordinary script with no dependencies, runtime downloads, generated lookup, or preprocessing. Keep it self-contained. The site must continue to build with `zensical build` alone. Node tests and optional schema-oracle checks are development checks, never site build prerequisites.

`content/validate.md` supplies the controls; `zensical.toml` loads the script; `overrides/stylesheets/extra.css` styles results. Downloads are under `overrides/assets/`. Source tests are `tests/validator.test.cjs`; the independently retained MCP evidence is `tests/fixtures/validator-applicability.json`.

The CommonJS export supports direct Node testing. In the browser, `window.VDRMiniSDR` exposes only functions and constants, not reports or results. The singleton guard prevents repeated script evaluation from installing another adapter.

## Function responsibilities

- `collector`: count all discovered errors, retaining at most 200. Paths are capped at 120 characters; messages do not echo narrative values.
- `realDate`: check the exact four-digit-year Gregorian `YYYY-MM-DD` form, including leap years. This checks calendar validity, not chronology or approval.
- `parseJSON`: use native parsing for syntax, then scan for duplicate decoded property names at every object level. Equivalent escaped names are duplicates. Reject nesting deeper than 64 levels.
- `parseCSV`: parse fields and records, including quoted commas/newlines, doubled quotes, CRLF/LF/CR, and a terminal newline. Reject malformed quoting, extra fields, and extra records. Blank records are errors.
- `csvDocument`: enforce the header and repeated metadata, reject duplicate rule IDs, map flat cells to the shared JSON shape, and retain record/line locations.
- `validateDocument`: enforce the contract described below after resolving the metadata profile and rule applicability.
- `validate(text, format)`: enforce the 5 MiB UTF-8 limit, remove one leading BOM, dispatch parsing, validate, and attach CSV locations. Return `{valid, errorCount, truncated, errors}` without retaining input.
- `decodeUTF8`: reject invalid UTF-8 file bytes rather than silently replacing characters.
- `install`: attach controls, read local files, render results, and manage navigation cleanup.

The browser adapter initializes after DOM readiness. A `MutationObserver` detects replacement of the validator panel during instant navigation; changes inside the same panel do not attach more handlers. Disposing a panel aborts its listeners and any file read, clears text, file selection, and results, and releases the panel reference. `pagehide` clears input; `pageshow` reattaches after history restoration. Late file callbacks cannot repopulate a disposed panel. Clear and text edits cancel active reads. Editing or changing format invalidates earlier results.

## Supported contract

Only format `0.2.0`, rules `2026.11.02.01`, and these profiles are supported: Rev5 B/C/D and 20x B/C. Do not silently accept later versions, Class A, or 20x D.

JSON permits only `metadata` and `responses` at the root. Metadata requires exactly the eight documented fields: `schemaVersion`, `rulesVersion`, `providerName`, `offeringName`, `framework`, `class`, `asOfDate`, and `fedrampId`. Names and ID must contain non-whitespace text. Version and profile values are exact and case-sensitive; the date must be real.

Require all 37 provider rule IDs, including framework-excluded rules. Reject unknown IDs/properties and incorrect object, string, or number types. Excluded rules must have an explained `Not Applicable` response and matching CAP status. Applicable MUST/MUST NOT rules cannot use implementation status `Not Applicable`. SHOULD/SHOULD NOT departures and unused MAY options can use `Not Applicable`; the validator does not judge the justification.

Every response requires an allowed status and nonblank `explanation`. `Partially Implemented` and `Not Implemented` also require separate nonblank `customerRisk`, `providerCompensation`, and `agencyCompensation`. Optional text fields can be omitted or exactly empty, but cannot contain only whitespace or a non-string value. `additionalAssurance` and `feedback` remain optional.

For this contract, whitespace is the ECMAScript WhiteSpace and LineTerminator set: U+0009–U+000D, U+0020, U+00A0, U+1680, U+2000–U+200A, U+2028–U+2029, U+202F, U+205F, U+3000, and U+FEFF. A required text answer must contain at least one character outside that set. An optional text answer may be omitted or exactly empty; any nonempty value must also contain a character outside the set. Keep the same set in the JSON Schema, CSV Schema, and browser validator.

Every status except `Fully Implemented` requires a per-rule `correctiveActionPlan`. Fully implemented responses may omit it or retain only a `Completed` CAP. Never introduce a standalone CAP file.

| CAP status | Required fields beyond status and explanation | Forbidden fields |
| --- | --- | --- |
| Planned, In Progress | `capTargetDate`, `capExplanation`, `capConfidence` | `capCompletedDate` |
| Completed | `capCompletedDate`, `capExplanation` | `capTargetDate`, `capConfidence` |
| Pending Plan, Not Applicable | None | Both dates, `capExplanation`, `capConfidence` |

All CAPs require `capStatus` and nonblank `capStatusExplanation`. Required action explanations must be nonblank. Confidence must be a finite number from 0 through 100, inclusive; fractions are allowed. Dates use the same calendar check as `asOfDate`. Implementation status `Not Applicable` requires CAP status `Not Applicable`. Applicable mandatory-rule gaps cannot use CAP status `Not Applicable`. Recommendation gaps can do so with the required explanation and separate risk/compensation fields.

Do not add prose length/quality judgments, deadline or CAP approval judgments, implementation-quality judgments, or activity-report validation. Past targets and dates after the reporting date are not schema failures. Sentence guidance in authoring instructions is not machine-enforced.

## CSV mapping and errors

The exact 22-column header is `CSV_HEADER` in the script and the first row of `implementation-status.csv`. Require the original names and order. The first eight columns map to metadata, repeated identically in every record. `ruleId` becomes a response key; `status` and `explanation` belong to that response. The six adjacent `cap*` columns become its nested CAP. The three risk/compensation columns, `additionalAssurance`, and `feedback` remain response properties.

Empty optional cells are omitted during mapping. Empty CAP cells are omitted; all six empty means no CAP object. Whitespace is preserved and checked, never trimmed into validity. Empty confidence is absent, not zero. Confidence uses decimal notation (optional sign, decimal point, and exponent), not hexadecimal, percentages, NaN, or Infinity. JSON uses native number syntax and rejects non-finite confidence.

Require exactly 37 unique rule records with full coverage. CSV Schema 1.1 checks individual IDs and uniqueness but cannot establish full coverage: the JavaScript companion check is necessary. JSON Schema validators also normally lose duplicate keys during parsing; the script explicitly rejects them before accepting a report.

JSON locations use escaped JSON Pointer paths. Duplicate-key results also carry a character position. CSV results carry one-based record, starting physical line, and column/field when available. Record 1 is the header; quoted newlines do not start records. Missing-rule errors have a path but no nonexistent record location. Show at most 200 errors and explicitly tell users when additional errors were omitted.

## Applicability provenance and refresh

The lookup was derived on November 8, 2026 from all 37 provider-rule `get_rule` records returned by FedRAMP MCP. Rules version: `2026.11.02.01`; source commit: `64fa769510416fa75fd00a4689466094265b8083`; imported snapshot synchronized November 6, 2026. This establishes the imported baseline, not current upstream freshness. The test fixture retains source framework, applicability, force, variants, and JSON paths.

To refresh:

1. Check MCP status and record imported version, commit, and synchronization time. Retrieve every provider-affecting VDR/VER rule, including `varies_by_class` entries. Do not use the textual force label alone.
2. Resolve subset applicability (affected party, framework/type, classes) and the rule's framework. Resolve each supported class variant. Use `null` for excluded rules; this is different from MAY.
3. Compare the set and each profile cell against the retained source fixture. Preserve all required responses even where a profile excludes a rule. Review changes to scope or report fields with the user before implementation.
4. Update the inline table, provenance, independent source fixture, and tests together. Do not generate the runtime script or fetch rules during validation.
5. Align JSON Schema conditional references, CSV Schema conditions, templates, examples, `content/schemas.md`, `content/requirements.md`, and plan records when their contract or rule set changes. Revalidate all six examples and recalculate any affected summaries. Do not automatically change reporting dates or persona narratives.

## Privacy, rendering, accessibility, and checks

Do not send report contents, filenames, result text, or field values through fetch, XMLHttpRequest, forms, beacons, analytics events, URLs, console logs, or error reporting. Do not write input to cookies, local/session storage, IndexedDB, caches, or downloads. Keep file contents only in the active textarea and temporary validation/read state. Use `textContent` for all generated errors, never HTML interpolation. Avoid retaining input in closures after navigation.

Controls have visible labels and native keyboard behavior. Results use an announced status region and receive focus after validation; Clear returns focus to the textarea. Keep focus styling and dark-mode contrast. A file read failure must recover without stale text or a disabled Validate button. Check asynchronous cancellation, malformed UTF-8, and size limits for both file and paste paths.

Run the dependency-free tests:

```sh
node --test tests/validator.test.cjs
```

All six completed examples must pass and starter templates must fail. The matrix exercises every rule across five profiles, four implementation statuses, and six CAP choices. Additional tests cover missing fields, unexpected types/properties, duplicate JSON keys/rules, malformed CSV, quoted/multiline fields, BOM/line endings, dates, confidence, size, error truncation, and required/optional text against every character in the ECMAScript whitespace set.

Optional JSON Schema comparison uses a preinstalled AJV 2020-12 plus ajv-formats:

```sh
AJV_MODULE_DIR=/absolute/path/to/node_modules node --test tests/validator.test.cjs
```

The oracle test must compare 4,879 cases without mismatches. Without that environment variable it is explicitly skipped. Export equivalent cases for CSV Schema 1.1 comparison with `VALIDATOR_CASES_OUTPUT=/tmp/validator-cases.json`. Use The National Archives CSV Validator 1.4.4 on the exported CSV and `overrides/assets/implementation-status.csvs`; exclude the missing-rule-only case from oracle parity because coverage is a companion check. This external engine is not a browser/runtime dependency.

Run `zensical build`, inspect generated script and download links under `/vdr-migration/`, then test direct loading and instant navigation in a browser. Include file/paste, JSON/CSV, keyboard operation, hostile strings, 5 MiB boundaries, read failures/cancellation, clear, history restoration, and leaving/returning repeatedly. Inspect network and storage with the site's analytics enabled using synthetic data. Static inspection of the validator alone does not prove privacy of third-party page scripts. Record actual browser and deployment limitations in `PLAN-STEP4.md`; leave acceptance checks open when unperformed.

## Recorded verification and browser rerun

November 8: all eight Node test groups passed with AJV enabled (4,504 comparisons), and 189 selected CSV oracle cases agreed. Run `python3 tests/csv-oracle.py /tmp/validator-cases.json /path/to/java /path/to/csv-validator-cmd-1.4.4.jar` after exporting cases.

For browser checks, start the local preview, open `/vdr-migration/validate/` in Playwright CLI, then run `playwright-cli run-code --filename=tests/browser-validator.js`. The browser script uses only synthetic data, returns network/storage observations, and writes desktop/mobile screenshots under `/tmp`. It passed in temporary Chromium, including all six uploads, navigation cleanup, keyboard controls, hostile text, limits, read failures, and cancellation. DAP loaded, but Google gtag was blocked; full analytics-enabled privacy, deployed behavior, and actual history-cache restoration remain pending in STEP4. Do not convert those partial observations into an unconditional whole-page privacy claim.
