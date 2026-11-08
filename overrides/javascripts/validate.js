/* VDR/VER Mini-SDR validator. See AGENTS.md beside this file for maintenance.
 * No dependencies, network requests, storage, or generated code.
 * Format 0.2.0; rules 2026.11.02.01.
 */
(function (root, factory) {
  "use strict";
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else if (!root.VDRMiniSDR) {
    root.VDRMiniSDR = factory();
    root.VDRMiniSDR.install(root);
  }
})(typeof window === "undefined" ? globalThis : window, function () {
  "use strict";
  const SCHEMA_VERSION = "0.2.0";
  const RULES_VERSION = "2026.11.02.01";
  const MAX_BYTES = 5 * 1024 * 1024;
  const MAX_ERRORS = 200;
  const MAX_DEPTH = 64;
  const PROFILES = ["Rev5/B", "Rev5/C", "Rev5/D", "20x/B", "20x/C"];
  // Derived from all 37 FedRAMP MCP get_rule records on 2026-11-08.
  // Imported 2026-11-06, commit 64fa769510416fa75fd00a4689466094265b8083.
  // Columns follow PROFILES. null means excluded, not optional.
  const M = "MUST", N = "MUST NOT", S = "SHOULD", T = "SHOULD NOT", Y = "MAY";
  const APPLICABILITY = {
    "VDR-CSO-DET": [M,M,M,M,M], "VDR-CSO-RES": [M,M,M,M,M],
    "VDR-CSO-FAV": [M,M,M,M,M], "VDR-CSO-DFR": [S,S,S,S,S],
    "VDR-CSO-ADT": [S,S,S,S,S], "VDR-CSO-DAC": [S,S,S,S,S],
    "VDR-CSO-MSP": [T,T,T,T,T], "VDR-CSO-AKE": [T,T,T,T,T],
    "VDR-CSO-SIR": [Y,Y,Y,Y,Y], "VDR-TFR-NMV": [M,M,M,M,M],
    "VDR-TFR-PDD": [S,S,S,S,S], "VDR-TFR-PCD": [S,S,S,S,S],
    "VDR-TFR-PVR": [S,S,S,S,S], "VDR-TFR-RMN": [S,S,S,S,S],
    "VDR-TFR-KEV": [S,S,S,S,S], "VDR-TFR-PSD": [S,S,S,S,S],
    "VDR-TFR-MVX": [null,null,null,M,M], "VDR-TFR-MVF": [S,M,M,null,null],
    "VER-EVA-ELX": [M,M,M,M,M], "VER-EVA-EIR": [M,M,M,M,M],
    "VER-EVA-EPA": [M,M,M,M,M], "VER-EVA-AIA": [M,M,M,M,M],
    "VER-EVA-GRV": [S,S,S,S,S], "VER-EVA-EFP": [S,S,S,S,S],
    "VER-EVA-EFA": [S,S,S,S,S], "VER-RPT-PER": [M,M,M,M,M],
    "VER-RPT-VDT": [M,M,M,M,M], "VER-RPT-AVI": [M,M,M,M,M],
    "VER-RPT-NID": [N,N,N,N,N], "VER-RPT-HLO": [S,S,S,S,S],
    "VER-RPT-RPD": [Y,Y,Y,Y,Y], "VER-TFR-MHR": [M,M,M,M,M],
    "VER-TFR-MAV": [M,M,M,M,M], "VER-TFR-MRH": [S,S,S,S,S],
    "VER-TFR-EVU": [S,S,S,S,S], "VER-TFR-IRI": [Y,S,S,Y,S],
    "VER-TFR-NRI": [Y,Y,S,Y,Y]
  };
  for (const forces of Object.values(APPLICABILITY)) Object.freeze(forces);
  Object.freeze(APPLICABILITY);
  const RULE_IDS = Object.keys(APPLICABILITY);
  const METADATA = ["schemaVersion", "rulesVersion", "providerName", "offeringName", "framework", "class", "asOfDate", "fedrampId"];
  const RISK_FIELDS = ["customerRisk", "providerCompensation", "agencyCompensation"];
  const OPTIONAL_TEXT = [...RISK_FIELDS, "additionalAssurance", "feedback"];
  const RESPONSE_FIELDS = ["status", "explanation", "correctiveActionPlan", ...OPTIONAL_TEXT];
  const CAP_FIELDS = ["capStatus", "capStatusExplanation", "capTargetDate", "capExplanation", "capConfidence", "capCompletedDate"];
  const CSV_HEADER = [...METADATA, "ruleId", "status", "explanation", ...CAP_FIELDS, ...OPTIONAL_TEXT];
  const STATUSES = ["Fully Implemented", "Partially Implemented", "Not Implemented", "Not Applicable"];
  const CAP_STATUSES = ["Planned", "In Progress", "Pending Plan", "Completed", "Not Applicable"];
  const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
  const nonblank = value => typeof value === "string" && /\S/u.test(value);
  const pointer = (path, key) => path + "/" + String(key).replace(/~/g, "~0").replace(/\//g, "~1");
  const printable = value => String(value).slice(0, 120);

  // Bounded error collection: keep counting without accumulating unlimited messages.
  function collector() {
    const errors = [];
    let count = 0;
    return {
      add(path, message, details = {}) {
        count++;
        if (errors.length < MAX_ERRORS) errors.push({ path: printable(path), message, ...details });
      },
      result() { return { valid: count === 0, errorCount: count, truncated: count > errors.length, errors }; }
    };
  }

  function realDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return month >= 1 && month <= 12 && day >= 1 && day <= days[month - 1];
  }

  // JSON.parse establishes syntax; a bounded second pass detects duplicate keys
  // before their last-value-wins behavior could hide a response or CAP field.
  function parseJSON(text, issues) {
    let data;
    try { data = JSON.parse(text); }
    catch (_) { issues.add("", "Invalid JSON. Check quotation marks, commas, brackets, and trailing content."); return null; }
    let i = 0;
    function whitespace() { while (/\s/.test(text[i] || "") && i < text.length) i++; }
    function string() {
      const start = i++;
      while (i < text.length) {
        if (text[i] === "\\") { i += 2; continue; }
        if (text[i++] === '"') break;
      }
      return text.slice(start, i);
    }
    function value(path, depth) {
      if (depth > MAX_DEPTH) throw new Error("depth");
      whitespace();
      if (text[i] === "{") {
        i++; whitespace(); const keys = new Set();
        if (text[i] === "}") { i++; return; }
        while (i < text.length) {
          whitespace(); const position = i; const key = JSON.parse(string());
          const next = pointer(path, key);
          if (keys.has(key)) issues.add(next, "Duplicate JSON property; each property must appear once.", { position });
          keys.add(key); whitespace(); i++; value(next, depth + 1); whitespace();
          if (text[i++] === "}") break;
        }
      } else if (text[i] === "[") {
        i++; whitespace(); let index = 0;
        if (text[i] === "]") { i++; return; }
        while (i < text.length) {
          value(pointer(path, index++), depth + 1); whitespace();
          if (text[i++] === "]") break;
        }
      } else if (text[i] === '"') string();
      else while (i < text.length && !/[\s,}\]]/.test(text[i])) i++;
    }
    try { value("", 0); }
    catch (_) { issues.add("", `JSON nesting exceeds the supported limit of ${MAX_DEPTH} levels.`); return null; }
    return data;
  }

  // CSV state machine. Record numbers include the header; physical lines are
  // tracked separately because a quoted field can span several lines.
  function parseCSV(text, issues) {
    const records = [];
    let cells = [], field = "", state = "start", line = 1, startLine = 1;
    const cell = () => { cells.push(field); field = ""; state = "start"; };
    const row = () => { cell(); records.push({ cells, line: startLine }); cells = []; startLine = line; };
    const fail = message => issues.add("", message, { record: records.length + 1, line, column: cells.length + 1 });
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const newline = ch === "\r" || ch === "\n";
      if (state === "quoted") {
        if (ch === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else state = "closed";
        } else {
          field += ch;
          if (newline) {
            if (ch === "\r" && text[i + 1] === "\n") field += text[++i];
            line++;
          }
        }
        continue;
      }
      if (ch === ",") {
        cell();
        if (cells.length >= CSV_HEADER.length) { fail("CSV record has more than 22 fields."); return null; }
        continue;
      }
      if (newline) {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        line++; row();
        if (records.length > RULE_IDS.length + 1) { fail("CSV has too many records; include one header and exactly 37 rule records."); return null; }
        continue;
      }
      if (state === "closed") { fail("Unexpected character after a closing CSV quote."); return null; }
      if (ch === '"') {
        if (state !== "start") { fail("A CSV quotation mark must start a field or be escaped inside a quoted field."); return null; }
        state = "quoted";
      } else { state = "plain"; field += ch; }
    }
    if (state === "quoted") { fail("Unclosed quoted CSV field."); return null; }
    // A single terminal newline terminates the last record; extra blank records
    // are not silently discarded, including those within the file.
    if (cells.length || field.length || state !== "start") row();
    return records;
  }

  function csvDocument(records, issues) {
    if (!records || !records.length) return null;
    if (records[0].cells.length !== CSV_HEADER.length || records[0].cells.some((v, i) => v !== CSV_HEADER[i])) {
      issues.add("", "CSV header must match the 22 template columns exactly, in their original order.", { record: 1, line: 1 });
      return null;
    }
    const data = { metadata: {}, responses: Object.create(null) };
    const locations = Object.create(null);
    if (records.length === 1) issues.add("/responses", "CSV contains a header but no rule records.");
    for (let i = 1; i < records.length; i++) {
      const { cells, line } = records[i];
      const details = { record: i + 1, line };
      if (cells.length !== CSV_HEADER.length) { issues.add("", "CSV record must have exactly 22 fields.", details); continue; }
      const row = Object.fromEntries(CSV_HEADER.map((key, j) => [key, cells[j]]));
      if (!has(data.metadata, "schemaVersion")) for (const key of METADATA) data.metadata[key] = row[key];
      for (const key of METADATA) {
        if (row[key] !== data.metadata[key]) issues.add(pointer("/metadata", key), "Metadata must be identical in every CSV record.", { ...details, column: CSV_HEADER.indexOf(key) + 1, field: key });
      }
      const rid = row.ruleId;
      if (has(data.responses, rid)) { issues.add(pointer("/responses", rid), "Duplicate rule ID in CSV.", { ...details, column: 9, field: "ruleId" }); continue; }
      locations[rid] = details;
      const response = { status: row.status, explanation: row.explanation };
      for (const key of OPTIONAL_TEXT) if (row[key] !== "") response[key] = row[key];
      const cap = {};
      for (const key of CAP_FIELDS) if (row[key] !== "") cap[key] = row[key];
      if (has(cap, "capConfidence")) {
        // Decimal notation, including exponents. Do not let Number("") or Number("0x10")
        // silently turn an absent or malformed CSV value into confidence.
        if (/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(cap.capConfidence)) cap.capConfidence = Number(cap.capConfidence);
      }
      if (Object.keys(cap).length) response.correctiveActionPlan = cap;
      data.responses[rid] = response;
    }
    return { data, locations };
  }

  function validateDocument(data, issues) {
    function shape(value, path, allowed, required) {
      if (!object(value)) { issues.add(path, "Expected an object."); return false; }
      for (const key of Object.keys(value)) if (!allowed.includes(key)) issues.add(pointer(path, key), "Unknown field.");
      for (const key of required) if (!has(value, key)) issues.add(pointer(path, key), "Required field is missing.");
      return true;
    }
    function text(value, path, required) {
      if (typeof value !== "string" || (!nonblank(value) && (required || value !== ""))) issues.add(path, required ? "Enter a nonblank text value." : "Use a text value that is empty or contains more than whitespace.");
    }
    function choice(value, path, values) {
      if (!values.includes(value)) issues.add(path, "Use one of: " + values.join(", ") + ".");
    }
    if (!shape(data, "", ["metadata", "responses"], ["metadata", "responses"])) return;
    let profile = -1;
    if (has(data, "metadata") && shape(data.metadata, "/metadata", METADATA, METADATA)) {
      const m = data.metadata;
      for (const key of ["providerName", "offeringName", "fedrampId"]) if (has(m, key)) text(m[key], pointer("/metadata", key), true);
      if (has(m, "schemaVersion") && m.schemaVersion !== SCHEMA_VERSION) issues.add("/metadata/schemaVersion", `Supported format version: ${SCHEMA_VERSION}.`);
      if (has(m, "rulesVersion") && m.rulesVersion !== RULES_VERSION) issues.add("/metadata/rulesVersion", `Supported rules version: ${RULES_VERSION}.`);
      if (has(m, "framework")) choice(m.framework, "/metadata/framework", ["Rev5", "20x"]);
      if (has(m, "class")) choice(m.class, "/metadata/class", m.framework === "20x" ? ["B", "C"] : ["B", "C", "D"]);
      if (has(m, "asOfDate") && !realDate(m.asOfDate)) issues.add("/metadata/asOfDate", "Use a real date in YYYY-MM-DD format.");
      if (typeof m.framework === "string" && typeof m.class === "string") profile = PROFILES.indexOf(m.framework + "/" + m.class);
    }
    if (!has(data, "responses") || !shape(data.responses, "/responses", RULE_IDS, RULE_IDS)) return;
    for (const rid of RULE_IDS) {
      if (!has(data.responses, rid)) continue;
      const r = data.responses[rid], path = pointer("/responses", rid);
      if (!shape(r, path, RESPONSE_FIELDS, ["status", "explanation"])) continue;
      if (has(r, "status")) choice(r.status, pointer(path, "status"), STATUSES);
      if (has(r, "explanation")) text(r.explanation, pointer(path, "explanation"), true);
      const gap = ["Partially Implemented", "Not Implemented"].includes(r.status);
      for (const key of OPTIONAL_TEXT) {
        if (gap && RISK_FIELDS.includes(key) && !has(r, key)) issues.add(pointer(path, key), "Required for a partially or not implemented rule.");
        else if (has(r, key)) text(r[key], pointer(path, key), gap && RISK_FIELDS.includes(key));
      }
      const force = profile < 0 ? undefined : APPLICABILITY[rid][profile];
      if (force === null && r.status !== "Not Applicable") issues.add(pointer(path, "status"), "This rule is excluded for the selected framework/class; use Not Applicable and explain why.");
      if ([M, N].includes(force) && r.status === "Not Applicable") issues.add(pointer(path, "status"), "This mandatory rule applies to the selected framework/class and cannot be marked Not Applicable.");
      const cp = pointer(path, "correctiveActionPlan");
      if (!has(r, "correctiveActionPlan")) {
        if (r.status !== "Fully Implemented") issues.add(cp, "A per-rule correctiveActionPlan object is required unless status is Fully Implemented.");
        continue;
      }
      const c = r.correctiveActionPlan;
      if (!shape(c, cp, CAP_FIELDS, ["capStatus", "capStatusExplanation"])) continue;
      if (has(c, "capStatus")) choice(c.capStatus, pointer(cp, "capStatus"), CAP_STATUSES);
      if (r.status === "Fully Implemented" && c.capStatus !== "Completed") issues.add(pointer(cp, "capStatus"), "A fully implemented rule can retain only a Completed CAP.");
      if (r.status === "Not Applicable" && c.capStatus !== "Not Applicable") issues.add(pointer(cp, "capStatus"), "Use CAP status Not Applicable for an implementation status of Not Applicable.");
      if (gap && [M, N].includes(force) && c.capStatus === "Not Applicable") issues.add(pointer(cp, "capStatus"), "An applicable mandatory-rule gap cannot use CAP status Not Applicable.");
      for (const key of ["capStatusExplanation", "capExplanation"]) if (has(c, key)) text(c[key], pointer(cp, key), true);
      for (const key of ["capTargetDate", "capCompletedDate"]) if (has(c, key) && !realDate(c[key])) issues.add(pointer(cp, key), "Use a real date in YYYY-MM-DD format.");
      if (has(c, "capConfidence") && (typeof c.capConfidence !== "number" || !Number.isFinite(c.capConfidence) || c.capConfidence < 0 || c.capConfidence > 100)) issues.add(pointer(cp, "capConfidence"), "Use a number from 0 through 100; decimals are allowed.");
      if (!CAP_STATUSES.includes(c.capStatus)) continue;
      let fields = [];
      if (["Planned", "In Progress"].includes(c.capStatus)) fields = ["capTargetDate", "capExplanation", "capConfidence"];
      if (c.capStatus === "Completed") fields = ["capCompletedDate", "capExplanation"];
      for (const key of fields) if (!has(c, key)) issues.add(pointer(cp, key), `Required for CAP status ${c.capStatus}.`);
      for (const key of CAP_FIELDS.slice(2)) if (!fields.includes(key) && has(c, key)) issues.add(pointer(cp, key), "Omit this field for the selected CAP status; leave its CSV cell empty.");
    }
  }

  function validate(text, format) {
    const issues = collector();
    if (typeof text !== "string") { issues.add("", "Provide file contents as text."); return issues.result(); }
    if (text.length > MAX_BYTES || new TextEncoder().encode(text).length > MAX_BYTES) { issues.add("", "Input exceeds the 5 MiB limit. Split reports by offering; do not omit required rule responses."); return issues.result(); }
    text = text.replace(/^\uFEFF/, "");
    if (!text.trim()) { issues.add("", "Choose a file or paste a completed Mini-SDR."); return issues.result(); }
    let data, locations;
    if (format === "json") data = parseJSON(text, issues);
    else if (format === "csv") {
      const parsed = csvDocument(parseCSV(text, issues), issues);
      if (parsed) { data = parsed.data; locations = parsed.locations; }
    } else { issues.add("", "Select JSON or CSV."); return issues.result(); }
    if (data !== undefined && data !== null) validateDocument(data, issues);
    // JSON null is syntactically valid but cannot be a Mini-SDR object.
    else if (format === "json" && text.trim() === "null") issues.add("", "Expected a Mini-SDR object, not null.");
    const result = issues.result();
    if (locations) {
      for (const error of result.errors) {
        if (error.record) continue;
        const parts = error.path.split("/").slice(1).map(v => v.replace(/~1/g, "/").replace(/~0/g, "~"));
        if (parts[0] === "responses" && has(locations, parts[1])) {
          Object.assign(error, locations[parts[1]]);
          const field = parts[2] === "correctiveActionPlan" ? parts[3] || "capStatus" : parts[2] || "ruleId";
          error.field = field; error.column = CSV_HEADER.indexOf(field) + 1;
        } else if (parts[0] === "metadata" && Object.keys(locations).length) {
          Object.assign(error, Object.values(locations)[0]);
          error.field = parts[1]; error.column = CSV_HEADER.indexOf(parts[1]) + 1;
        }
      }
    }
    return result;
  }

  function decodeUTF8(buffer) {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  }

  // Browser adapter. It does not expose input or results on the global API.
  function install(win) {
    const doc = win.document;
    let current = null;
    function attach() {
      const panel = doc.getElementById("validator");
      if (current && current.panel === panel) return;
      if (current) { current.dispose(); current = null; }
      if (!panel) return;
      const input = panel.querySelector("#submission-file");
      const text = panel.querySelector("#submission-text");
      const format = panel.querySelector("#format");
      const run = panel.querySelector("#run-validation");
      const clear = panel.querySelector("#clear-validation");
      const summary = panel.querySelector("#validation-summary");
      const list = panel.querySelector("#validation-errors");
      if (![input, text, format, run, clear, summary, list].every(Boolean)) return;
      const controller = new win.AbortController();
      let reader = null, disposed = false;
      const on = (element, event, handler) => element.addEventListener(event, handler, { signal: controller.signal });
      function cancelRead() {
        if (reader) { reader.onload = reader.onerror = reader.onabort = null; reader.abort(); reader = null; }
        run.disabled = false; panel.removeAttribute("aria-busy");
      }
      function resetResults(message = "Choose a file or paste a completed Mini-SDR.") {
        list.replaceChildren(); summary.textContent = message; delete summary.dataset.valid;
      }
      function clearInput() {
        cancelRead(); input.value = ""; text.value = ""; resetResults();
      }
      function render(result) {
        list.replaceChildren(); summary.dataset.valid = String(result.valid);
        summary.textContent = result.valid
          ? "No format or consistency errors found. This does not establish compliance or CAP approval."
          : `${result.errorCount} error${result.errorCount === 1 ? "" : "s"} found.${result.truncated ? ` Showing the first ${MAX_ERRORS}; fix these and validate again.` : ""}`;
        for (const error of result.errors) {
          const item = doc.createElement("li");
          const location = error.record ? `Record ${error.record}, line ${error.line}${error.column ? `, column ${error.column}` : ""}: ` : "";
          item.textContent = location + (error.path ? error.path + ": " : "") + error.message;
          list.appendChild(item);
        }
        summary.focus();
      }
      clearInput();
      on(run, "click", () => render(validate(text.value, format.value)));
      on(clear, "click", () => { clearInput(); text.focus(); });
      on(text, "input", () => { cancelRead(); input.value = ""; resetResults("Contents changed. Validate again to check the current text."); });
      on(format, "change", () => resetResults("Format changed. Validate again to check the current text."));
      on(input, "change", () => {
        cancelRead(); text.value = ""; resetResults();
        const file = input.files && input.files[0];
        if (!file) return;
        if (file.size > MAX_BYTES) { resetResults("File exceeds the 5 MiB limit. No contents were read."); input.value = ""; return; }
        if (/\.json$/i.test(file.name)) format.value = "json";
        else if (/\.csv$/i.test(file.name)) format.value = "csv";
        reader = new win.FileReader(); const active = reader;
        run.disabled = true; panel.setAttribute("aria-busy", "true"); resetResults("Reading the selected file locally…");
        active.onload = () => {
          if (disposed || reader !== active || !panel.isConnected) return;
          try { text.value = decodeUTF8(active.result); resetResults("File loaded. Select Validate to check it."); }
          catch (_) { text.value = ""; input.value = ""; resetResults("This file is not valid UTF-8 text. Save it as UTF-8 JSON or CSV and try again."); }
          reader = null; run.disabled = false; panel.removeAttribute("aria-busy");
        };
        active.onerror = () => {
          if (disposed || reader !== active) return;
          reader = null; input.value = ""; run.disabled = false; panel.removeAttribute("aria-busy"); resetResults("The file could not be read. Choose it again or paste its contents.");
        };
        active.onabort = () => {
          if (disposed || reader !== active) return;
          reader = null; run.disabled = false; panel.removeAttribute("aria-busy"); resetResults("File reading was cancelled.");
        };
        try { active.readAsArrayBuffer(file); }
        catch (_) { cancelRead(); input.value = ""; resetResults("The file could not be read. Choose it again or paste its contents."); }
      });
      current = { panel, dispose() { disposed = true; controller.abort(); clearInput(); } };
    }
    function start() {
      attach();
      // Observing replacement covers Zensical instant navigation without relying
      // on undocumented theme globals. Same-panel notifications are no-ops.
      const observer = new win.MutationObserver(attach);
      observer.observe(doc.body, { childList: true, subtree: true });
      win.addEventListener("pagehide", () => { if (current) current.dispose(); current = null; });
      win.addEventListener("pageshow", attach);
    }
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
  }

  return Object.freeze({ validate, realDate, decodeUTF8, install, APPLICABILITY,
    PROFILES: Object.freeze(PROFILES), RULE_IDS: Object.freeze(RULE_IDS), CSV_HEADER: Object.freeze(CSV_HEADER),
    SCHEMA_VERSION, RULES_VERSION, MAX_BYTES, MAX_ERRORS });
});
