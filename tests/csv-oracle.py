import json,subprocess,concurrent.futures,tempfile,sys
from pathlib import Path
# Usage: python3 tests/csv-oracle.py cases.json /path/to/java /path/to/csv-validator-cmd-1.4.4.jar
cases=json.load(open(sys.argv[1]))
selected=[c for c in cases if c['name'].endswith(' baseline') or c['name'].startswith(('20x/C VDR-CSO-DET ', '20x/C VDR-CSO-DFR ', '20x/C VDR-CSO-SIR ')) or (' VDR-TFR-MVF Not Applicable ' in c['name']) or (' VDR-TFR-MVX Not Applicable ' in c['name']) or '/' not in c['name']]
selected=[c for c in selected if c['name']!='missing rule'] # complete coverage is a companion check
cmd=[sys.argv[2],'-Xmx128m','-jar',sys.argv[3]]
for name in ['aster','harbor','smallbrook']:
 selected.append(dict(name=name,valid=True,csv=Path(f'overrides/assets/examples/{name}.csv').read_text()))
def check(c):
 with tempfile.NamedTemporaryFile(suffix='.csv',mode='w') as f:
  f.write(c['csv']);f.flush();r=subprocess.run(cmd+[f.name,'overrides/assets/implementation-status.csvs'],capture_output=True,text=True)
  if (r.returncode==0)!=c['valid']:return {'name':c['name'],'expected':c['valid'],'code':r.returncode,'output':r.stdout+r.stderr}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:failures=[r for r in pool.map(check,selected) if r]

print(f'{len(selected)} CSV cases checked; {len(failures)} mismatches.')
for f in failures[:5]: print(f)
assert not failures
