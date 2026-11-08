# Validate a Mini-SDR

Choose a UTF-8 JSON or CSV file, or paste its contents below. The validator processes the contents in your browser memory; its code does not upload them or write them to browser storage. Clear the form when finished. This website also loads analytics; verification of the complete page's network behavior is tracked separately from the validator's code checks.

This checks the Mini-SDR format `0.2.0` and rules baseline `2026.11.02.01`, including all 37 provider rules, framework/class applicability, required fields, and per-rule corrective actions. It does not validate the separate activity-report samples or determine implementation quality, adequate explanations, compliance, or CAP approval.

The input limit is **5 MiB**. CSV must use the template's 22 columns in their original order. Keep one offering per file and include every rule; excluded rules still need an explained `Not Applicable` response. See [Schemas & Templates](schemas.md) for field requirements or download a fictional [example](examples/index.md) to try the validator.

<div id="validator" class="validator" role="region" aria-label="Mini-SDR validator">
  <label for="submission-file">JSON or CSV file</label>
  <input id="submission-file" type="file" accept=".json,.csv,application/json,text/csv" aria-describedby="text-help">
  <label for="format">File format</label>
  <select id="format"><option value="json">JSON</option><option value="csv">CSV</option></select>
  <label for="submission-text">File contents</label>
  <textarea id="submission-text" rows="12" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" aria-describedby="text-help"></textarea>
  <p id="text-help">You can paste or edit contents here. Editing does not change the original file. Changing the text or format clears earlier results.</p>
  <div class="validator-row">
    <button id="run-validation" type="button">Validate</button>
    <button id="clear-validation" type="button">Clear</button>
  </div>
  <p id="validation-summary" role="status" aria-live="polite" aria-atomic="true" tabindex="-1">Choose a file or paste a completed Mini-SDR.</p>
  <ul id="validation-errors" aria-label="Validation errors"></ul>
</div>

<noscript>JavaScript is required for this browser validator. The downloadable schemas and field instructions remain available on the Schemas & Templates page.</noscript>

## Reading the results

JSON errors identify a field path, such as `/responses/VDR-CSO-DET/explanation`. CSV errors identify the record, its starting line, and the column where available. Record 1 is the header; a quoted field can span more than one line. Missing-rule errors identify the required rule even when no corresponding CSV record exists.

The page displays at most 200 errors at a time. If more are found, correct the displayed errors and validate again. A passing result means the file passed these format and consistency checks; it does not establish that the offering has completed migration.
