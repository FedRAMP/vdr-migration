'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const v = require('../overrides/javascripts/validate.js');
const schema = JSON.parse(fs.readFileSync(path.join(root, 'overrides/assets/implementation-status.schema.json')));
const source = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/validator-applicability.json')));
const read = name => fs.readFileSync(path.join(root, 'overrides/assets/examples', name), 'utf8');
const csvSchemaText = fs.readFileSync(path.join(root, 'overrides/assets/implementation-status.csvs'), 'utf8');
const copy = data => JSON.parse(JSON.stringify(data));
const jsonResult = data => v.validate(JSON.stringify(data), 'json');
const ECMASCRIPT_WHITESPACE = [
  0x0009, 0x000a, 0x000b, 0x000c, 0x000d, 0x0020, 0x00a0, 0x1680,
  ...Array.from({length: 11}, (_, i) => 0x2000 + i),
  0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff
].map(codePoint => String.fromCodePoint(codePoint));
const ECMASCRIPT_NON_WHITESPACE = [0x0085, 0x180e, 0x200b].map(codePoint => String.fromCodePoint(codePoint));
function cap(status) {
  const result = { capStatus: status, capStatusExplanation: 'The owner has documented the current action status.' };
  if (['Planned', 'In Progress'].includes(status)) Object.assign(result, {capTargetDate:'2027-01-31', capExplanation:'Complete the assigned work and verify the result.', capConfidence:85.5});
  if (status === 'Completed') Object.assign(result, {capCompletedDate:'2026-12-01', capExplanation:'Completed the assigned work and verified the result.'});
  return result;
}
function baseline(profile = '20x/C') {
  const d = JSON.parse(read('aster.json'));
  [d.metadata.framework, d.metadata.class] = profile.split('/');
  for (const id of v.RULE_IDS) {
    d.responses[id] = {status:'Fully Implemented', explanation:'Implemented with retained verification evidence.'};
    if ((id === 'VDR-TFR-MVX' && d.metadata.framework === 'Rev5') || (id === 'VDR-TFR-MVF' && d.metadata.framework === '20x')) d.responses[id] = {status:'Not Applicable', explanation:'This rule applies to the other framework.', correctiveActionPlan:cap('Not Applicable')};
  }
  return d;
}
function csv(data, eol = '\n') {
  const quote = value => /[",\r\n]/.test(String(value)) ? '"' + String(value).replaceAll('"', '""') + '"' : String(value);
  const rows = [v.CSV_HEADER];
  for (const [id, response] of Object.entries(data.responses)) {
    const row = {...data.metadata, ruleId:id, ...response, ...response.correctiveActionPlan};
    rows.push(v.CSV_HEADER.map(key => Object.hasOwn(row, key) ? row[key] : ''));
  }
  return rows.map(row => row.map(quote).join(',')).join(eol) + eol;
}
const cases = [];
function check(name, data, expected, csvEquivalent = true) {
  cases.push({name, data:copy(data), valid:expected, csvEquivalent});
  assert.equal(jsonResult(data).valid, expected, name + ': ' + JSON.stringify(jsonResult(data).errors));
  if (csvEquivalent) assert.equal(v.validate(csv(data), 'csv').valid, expected, name + ' CSV');
}

test('MCP lookup independently resolves all five profiles and all 37 rules', () => {
  assert.equal(source.rulesVersion, v.RULES_VERSION);
  assert.deepEqual(v.PROFILES, source.profiles);
  assert.deepEqual(v.RULE_IDS, schema.properties.responses.required);
  assert.equal(Object.keys(source.rules).length, 37);
  for (const [id, record] of Object.entries(source.rules)) {
    const expected = source.profiles.map(profile => {
      const [fw, cls] = profile.split('/');
      const a = record.applicability;
      if (!a.affects.includes('Providers') || !a.types.includes(fw) || !a.classes.includes(cls) || (record.framework !== 'all' && record.framework.toLowerCase() !== fw.toLowerCase())) return null;
      return record.force || record.variants[cls.toLowerCase()] || null;
    });
    assert.deepEqual(v.APPLICABILITY[id], expected, id);
  }
});

test('all six example files pass; starter templates fail', () => {
  for (const n of ['aster','harbor','smallbrook']) for (const f of ['json','csv']) assert.equal(v.validate(read(`${n}.${f}`), f).valid, true, `${n}.${f}`);
  for (const f of ['json','csv']) assert.equal(v.validate(fs.readFileSync(path.join(root,`overrides/assets/implementation-status.${f}`),'utf8'),f).valid,false);
});

test('all rule/profile/status/CAP combinations agree for JSON and CSV', () => {
  const statuses = ['Fully Implemented','Partially Implemented','Not Implemented','Not Applicable'];
  const caps = [null,'Planned','In Progress','Pending Plan','Completed','Not Applicable'];
  for (const profile of v.PROFILES) {
    check(profile + ' baseline', baseline(profile), true);
    for (const id of v.RULE_IDS) {
      const record = source.rules[id]; const [fw, cls] = profile.split('/');
      const excluded = record.framework !== 'all' && record.framework.toLowerCase() !== fw.toLowerCase();
      const force = record.force || record.variants[cls.toLowerCase()];
      for (const status of statuses) for (const cs of caps) {
        const d = baseline(profile);
        d.responses[id] = {status, explanation:'A documented explanation.', customerRisk:'Customer exposure remains.', providerCompensation:'Provider restrictions apply.', agencyCompensation:'Agency actions are described.'};
        if (cs) d.responses[id].correctiveActionPlan = cap(cs);
        let valid = status === 'Fully Implemented' ? cs === null || cs === 'Completed' : cs !== null;
        if (status === 'Not Applicable') valid = cs === 'Not Applicable' && !['MUST','MUST NOT'].includes(force);
        if (['Partially Implemented','Not Implemented'].includes(status) && ['MUST','MUST NOT'].includes(force) && cs === 'Not Applicable') valid = false;
        if (excluded) valid = status === 'Not Applicable' && cs === 'Not Applicable';
        check(`${profile} ${id} ${status} ${cs}`,d,valid);
      }
    }
  }
});

test('conditional fields, dates, versions and unknown properties', () => {
  const id = 'VDR-CSO-DET';
  const partial = () => { const d=baseline();d.responses[id]={status:'Partially Implemented',explanation:'A gap remains.',customerRisk:'Risk.',providerCompensation:'Restriction.',agencyCompensation:'Agency action.',correctiveActionPlan:cap('Planned')};return d; };
  for (const key of ['explanation','customerRisk','providerCompensation','agencyCompensation']) {
    const d=partial();delete d.responses[id][key];check('missing '+key,d,false);
  }
  for (const cs of ['Planned','In Progress','Pending Plan','Completed','Not Applicable']) {
    for (const key of Object.keys(cap(cs))) {
      const d=baseline();d.responses['VDR-CSO-DFR']={status:'Partially Implemented',explanation:'Gap.',customerRisk:'Risk.',providerCompensation:'Action.',agencyCompensation:'Action.',correctiveActionPlan:cap(cs)};
      delete d.responses['VDR-CSO-DFR'].correctiveActionPlan[key];check(`${cs} missing ${key}`,d,false);
    }
  }
  for (const [value, expected] of [[0,true],[100,true],[0.1,true],[-1,false],[101,false],['85',false],[null,false]]) {
    const d=partial();d.responses[id].correctiveActionPlan.capConfidence=value;check('confidence '+value,d,expected,typeof value==='number');
  }
  for (const [date,valid] of [['2028-02-29',true],['2027-02-29',false],['2026-04-31',false],['2026-00-01',false],['2026-13-01',false],['2026-01-00',false],['2026-1-01',false],['Unknown',false],['N/A',false]]) {
    const d=partial();d.responses[id].correctiveActionPlan.capTargetDate=date;check('date '+date,d,valid);
  }
  for (const value of ['', ' ', '\n\t', null, 9, [], {}]) {
    const d=baseline();d.metadata.fedrampId=value;check('identifier '+JSON.stringify(value),d,false,typeof value==='string');
  }
  for (const field of ['capTargetDate','capConfidence','capCompletedDate','capExplanation']) {
    const d=partial();d.responses[id].correctiveActionPlan=cap('Pending Plan');d.responses[id].correctiveActionPlan[field]=field.includes('Date')?'2027-01-31':field==='capConfidence'?0:'Actions.';check('irrelevant '+field,d,false);
  }
  for (const key of ['schemaVersion','rulesVersion']) {const d=baseline();d.metadata[key]='old';check('version '+key,d,false);}
  const unsupported=baseline();unsupported.metadata.class='A';check('unsupported class',unsupported,false);
  const d=baseline();d.metadata.class='D';check('20x D',d,false);
  const extra=baseline();extra.responses[id].completionTarget='Unknown';check('old field',extra,false,false);
  const top=baseline();top.extra='unknown';check('extra root',top,false,false);
  const missing=baseline();delete missing.responses[id];check('missing rule',missing,false);
  const unknown=baseline();unknown.responses['VER-AGM-MAP']={status:'Fully Implemented',explanation:'Agency rule.'};check('extra rule',unknown,false);
  // Dates are format checks, not approval or chronology judgments.
  const past=partial();past.responses[id].correctiveActionPlan.capTargetDate='2025-01-01';check('past target is not a structural failure',past,true);
  const future=baseline();future.responses[id].correctiveActionPlan=cap('Completed');future.responses[id].correctiveActionPlan.capCompletedDate='2030-01-01';check('future completed date is not a structural failure',future,true);
});

test('required and optional text use ECMAScript whitespace semantics', () => {
  const expectedWhitespace = Array.from({length: 0x10000}, (_, codePoint) => String.fromCodePoint(codePoint))
    .filter(character => /\s/u.test(character));
  assert.deepEqual(ECMASCRIPT_WHITESPACE, expectedWhitespace);

  const csvPattern = String.raw`(?s).*[^\x{9}-\x{D}\x{20}\x{A0}\x{1680}\x{2000}-\x{200A}\x{2028}\x{2029}\x{202F}\x{205F}\x{3000}\x{FEFF}].*`;
  const csvTextPatterns = [...csvSchemaText.matchAll(/regex\("([^"]+)"\)/g)]
    .map(([, pattern]) => pattern)
    .filter(pattern => pattern.includes('\\x{9}'));
  assert.equal(csvTextPatterns.length, 14);
  assert.ok(csvTextPatterns.every(pattern => pattern === csvPattern));
  const jsSchemaPattern = csvPattern
    .replace(/^\(\?s\)/, '')
    .replace(/\\x\{([0-9A-Fa-f]+)\}/g, '\\u{$1}');
  const csvSchemaTextMatcher = new RegExp(jsSchemaPattern, 'su');
  for (const whitespace of ECMASCRIPT_WHITESPACE) assert.equal(csvSchemaTextMatcher.test(whitespace), false);
  for (const character of ECMASCRIPT_NON_WHITESPACE) assert.equal(csvSchemaTextMatcher.test(character), true);

  const id = 'VDR-CSO-DET';
  const requiredFields = [
    ['providerName', (d, value) => { d.metadata.providerName = value; }],
    ['offeringName', (d, value) => { d.metadata.offeringName = value; }],
    ['fedrampId', (d, value) => { d.metadata.fedrampId = value; }],
    ['explanation', (d, value) => { d.responses[id].explanation = value; }],
    ['customerRisk', (d, value) => { d.responses[id].customerRisk = value; }],
    ['providerCompensation', (d, value) => { d.responses[id].providerCompensation = value; }],
    ['agencyCompensation', (d, value) => { d.responses[id].agencyCompensation = value; }],
    ['capStatusExplanation', (d, value) => { d.responses[id].correctiveActionPlan.capStatusExplanation = value; }],
    ['capExplanation', (d, value) => { d.responses[id].correctiveActionPlan.capExplanation = value; }]
  ];
  const optionalFields = ['customerRisk', 'providerCompensation', 'agencyCompensation', 'additionalAssurance', 'feedback'];
  const baseWithRequiredContext = field => {
    const d = baseline();
    const response = d.responses[id];
    if (['customerRisk', 'providerCompensation', 'agencyCompensation', 'capStatusExplanation', 'capExplanation'].includes(field)) {
      Object.assign(response, {
        status: 'Partially Implemented',
        customerRisk: 'Customer exposure remains.',
        providerCompensation: 'Provider restrictions apply.',
        agencyCompensation: 'Agency actions are described.',
        correctiveActionPlan: cap('Planned')
      });
    }
    return d;
  };

  for (const whitespace of ECMASCRIPT_WHITESPACE) {
    for (const [field, setValue] of requiredFields) {
      const d = baseWithRequiredContext(field);
      setValue(d, whitespace);
      const oracleCase = field === 'explanation';
      check(`Text whitespace required ${field} U+${whitespace.codePointAt(0).toString(16).toUpperCase()}`, d, false, oracleCase);
    }
    for (const field of optionalFields) {
      const d = baseline();
      d.responses[id][field] = whitespace;
      const oracleCase = field === 'feedback';
      check(`Text whitespace optional ${field} U+${whitespace.codePointAt(0).toString(16).toUpperCase()}`, d, false, oracleCase);
    }
  }

  const allWhitespace = ECMASCRIPT_WHITESPACE.join('');
  for (const [name, field, oracleCase] of [
    ['explanation', 'explanation', true],
    ['CAP status explanation', 'capStatusExplanation', false],
    ['optional feedback', 'feedback', true]
  ]) {
    const d = baseWithRequiredContext(field);
    if (field === 'feedback') d.responses[id][field] = allWhitespace;
    else if (field === 'capStatusExplanation') d.responses[id].correctiveActionPlan.capStatusExplanation = allWhitespace;
    else d.responses[id].explanation = allWhitespace;
    check(`Text whitespace sequence ${name}`, d, false, oracleCase);
  }

  for (const [field, setValue] of requiredFields) {
    const d = baseWithRequiredContext(field);
    setValue(d, ` \u00a0Meaningful text\u2003 `);
    check(`Text with surrounding whitespace ${field}`, d, true, field === 'explanation');
  }
  for (const field of optionalFields) {
    const d = baseline();
    d.responses[id][field] = ` \u00a0Meaningful text\u2003 `;
    check(`Optional text with surrounding whitespace ${field}`, d, true, field === 'feedback');
    const blank = baseline();
    blank.responses[id][field] = '';
    check(`Empty optional text ${field}`, blank, true, field === 'feedback');
  }

  for (const character of ECMASCRIPT_NON_WHITESPACE) {
    const d = baseline();
    d.responses[id].explanation = character;
    check(`ECMAScript non-whitespace U+${character.codePointAt(0).toString(16).toUpperCase()}`, d, true, true);
  }
});

test('JSON parsing, duplicate properties, hostile keys and nesting', () => {
  for(const s of ['', ' ', '{', '{"x":1,}', 'null', '[]','5','"text"']) assert.equal(v.validate(s,'json').valid,false,s);
  const raw=JSON.stringify(baseline());
  for(const [needle,replacement] of [['"metadata":','"metadata":{},"metadata":'],['"status":"Fully Implemented"','"status":"Not Applicable","status":"Fully Implemented"']]) {
    const result=v.validate(raw.replace(needle,replacement),'json');assert.equal(result.valid,false);assert.ok(result.errors.some(e=>e.message.includes('Duplicate')));
  }
  const escaped=raw.replace('"providerName":','"provider\\u004eame":"first","providerName":');assert.ok(v.validate(escaped,'json').errors.some(e=>e.message.includes('Duplicate')));
  assert.equal(v.validate('\ufeff'+raw,'json').valid,true);
  const d=baseline();d.responses['<img src=x onerror=alert(1)>']={};const result=jsonResult(d);assert.equal(result.valid,false);assert.ok(result.errors.some(e=>e.path.includes('<img')));
  assert.equal(v.validate('{"__proto__":{"polluted":true}}','json').valid,false);assert.equal({}.polluted,undefined);
  assert.equal(v.validate('['.repeat(70)+'0'+']'.repeat(70),'json').valid,false);
});

test('CSV quotes, multiline records, BOM, header and cell handling', () => {
  const d=baseline();d.responses['VDR-CSO-DET'].explanation='A comma, an escaped "quote",\nand a second line.';
  for(const eol of ['\n','\r\n','\r']) assert.equal(v.validate('\ufeff'+csv(d,eol),'csv').valid,true);
  const base=csv(baseline());
  for(const bad of ['','a,b\n1,2',base.replace('schemaVersion','unexpected'),base+'\n',base.replace('Fully Implemented','"Fully Implemented"x'),base.replace('Fully Implemented','Fully" Implemented')]) assert.equal(v.validate(bad,'csv').valid,false);
  assert.equal(v.validate('"schemaVersion','csv').valid,false);
  const lines=base.trimEnd().split('\n');lines[2]=lines[1];assert.ok(v.validate(lines.join('\n'),'csv').errors.some(e=>e.message.includes('Duplicate')));
  const inconsistent=base.trimEnd().split('\n');inconsistent[2]=inconsistent[2].replace('EXAMPLE-ASTER-20X-C','EXAMPLE-OTHER');const result=v.validate(inconsistent.join('\n'),'csv');assert.ok(result.errors.some(e=>e.record===3&&e.field==='fedrampId'));
  const gap=baseline();gap.responses['VDR-CSO-DET']={status:'Partially Implemented',explanation:'First line.\nSecond line.',customerRisk:'Risk.',providerCompensation:'Action.',agencyCompensation:'Action.',correctiveActionPlan:cap('Planned')};
  const good=csv(gap);for(const value of ['', ' ', '0x10','NaN','Infinity','85%']) {
    const r=v.validate(good.replace('85.5',value),'csv');assert.equal(r.valid,false);assert.ok(r.errors.some(e=>e.record===2&&e.field==='capConfidence'));
  }
  for (const value of ['0', '1e2', '8.55e1']) assert.equal(v.validate(good.replace('85.5',value),'csv').valid,true);
  assert.equal(v.validate(good.replace('85.5','1e3'),'csv').valid,false);
});

test('size, error cap, UTF-8 and pure module have bounded behavior', () => {
  assert.equal(v.validate(' '.repeat(v.MAX_BYTES+1),'json').valid,false);
  assert.ok(v.validate('é'.repeat(v.MAX_BYTES/2+1),'json').errors[0].message.includes('5 MiB'));
  assert.throws(()=>v.decodeUTF8(new Uint8Array([0xff]).buffer));
  assert.equal(v.decodeUTF8(new Uint8Array([0xef,0xbb,0xbf,0x7b,0x7d]).buffer),'{}');
  const d=baseline();for(const id of v.RULE_IDS)d.responses[id]={status:'Partially Implemented',correctiveActionPlan:{capStatus:'Planned'}};
  const r=jsonResult(d);assert.equal(r.errors.length,200);assert.ok(r.errorCount>200);assert.equal(r.truncated,true);
  assert.equal(v.validate('{}','xml').valid,false);
});

// Optional independent oracles. Runtime/site has no dependency on these tools.
// Set AJV_MODULE_DIR to the node_modules directory containing ajv and ajv-formats.
test('JSON acceptance agrees with Draft 2020-12 oracle', {skip:!process.env.AJV_MODULE_DIR}, () => {
  const Ajv=require(path.join(process.env.AJV_MODULE_DIR,'ajv/dist/2020'));
  const formats=require(path.join(process.env.AJV_MODULE_DIR,'ajv-formats'));
  const ajv=new Ajv({strict:true,allErrors:true});formats(ajv);const valid=ajv.compile(schema);
  for(const c of cases) assert.equal(valid(c.data),c.valid,c.name+' '+JSON.stringify(valid.errors));
  console.log(`Compared ${cases.length} cases against AJV.`);
});

// Export equivalent cases for the external CSV Schema 1.1 oracle runner.
if (process.env.VALIDATOR_CASES_OUTPUT) process.on('beforeExit',()=>{
  fs.writeFileSync(process.env.VALIDATOR_CASES_OUTPUT,JSON.stringify(cases.filter(c=>c.csvEquivalent).map(c=>({name:c.name,valid:c.valid,csv:csv(c.data)}))));
});
