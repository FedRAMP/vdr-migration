// playwright-cli run-code --filename=tests/browser-validator.js
// First open the local /vdr-migration/validate/ page. Synthetic data only.
async (page) => {
  page.setDefaultTimeout(10000);
  const assert=(ok,message)=>{if(!ok)throw new Error(message);};
  const base=new URL('../',page.url()).href, marker='VDR_TEST_CANARY_819273';
  const requests=[],failures=[],responses=[];
  page.on('request',r=>requests.push({url:r.url(),body:r.postData()||''}));
  page.on('requestfailed',r=>failures.push({url:r.url(),error:r.failure()?.errorText}));
  page.on('response',r=>responses.push({url:r.url(),status:r.status()}));
  await page.reload();await page.waitForFunction(()=>!!window.VDRMiniSDR);
  const text=page.locator('#submission-text'),run=page.locator('#run-validation'),result=page.locator('#validation-summary');
  const examples={};
  for(const name of ['aster','harbor','smallbrook'])for(const format of ['json','csv']){
    const r=await page.request.get(base+`assets/examples/${name}.${format}`);assert(r.ok(),name+' download');examples[name+'.'+format]=await r.text();
    await page.locator('#submission-file').setInputFiles({name:name+'.'+format,mimeType:'text/plain',buffer:await r.body()});
    await page.waitForFunction(()=>document.querySelector('#validation-summary').textContent.startsWith('File loaded.'));
    await run.click();assert(await result.getAttribute('data-valid')==='true',name+'.'+format+' browser result');
  }
  await page.locator('#format').selectOption('json');
  const sample=JSON.parse(examples['aster.json']);sample.metadata.providerName=marker;sample.responses['<img src=x onerror="window.hostileRan=true">']={};
  await text.fill(JSON.stringify(sample));await run.focus();await page.keyboard.press('Enter');
  assert(await result.getAttribute('data-valid')==='false','hostile key invalid');assert(await page.locator('#validation-errors img').count()===0,'hostile markup');
  assert(await page.evaluate(()=>!window.hostileRan&&document.activeElement.id==='validation-summary'),'focus and inert text');assert(await result.getAttribute('aria-live')==='polite','announced results');
  await page.locator('#clear-validation').focus();await page.keyboard.press('Space');assert(await text.inputValue()==='','clear text');assert(await page.evaluate(()=>document.activeElement.id==='submission-text'),'clear focus');
  await page.locator('#submission-file').focus();for(const id of ['format','submission-text','run-validation','clear-validation']){await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.activeElement.id)===id,'tab order '+id);}
  await text.fill('x'.repeat(5*1024*1024+1));await run.click();assert((await page.locator('#validation-errors').innerText()).includes('5 MiB'),'paste size');
  await page.evaluate(()=>{const dt=new DataTransfer();dt.items.add(new File(['x'.repeat(5*1024*1024+1)],'large.json'));const e=document.querySelector('#submission-file');e.files=dt.files;e.dispatchEvent(new Event('change'));});
  assert((await result.innerText()).includes('No contents were read'),'file size');
  await page.evaluate(()=>{window.realFileReader=window.FileReader;window.FileReader=class{readAsArrayBuffer(){this.onerror();}abort(){}};const dt=new DataTransfer();dt.items.add(new File(['{}'],'fail.json'));const e=document.querySelector('#submission-file');e.files=dt.files;e.dispatchEvent(new Event('change'));});
  assert((await result.innerText()).includes('could not be read'),'file read error');assert(await run.isEnabled(),'recover after read error');
  await page.evaluate(()=>{window.FileReader=class{constructor(){window.pendingReader=this;}readAsArrayBuffer(){}abort(){window.readAborted=true;}};const dt=new DataTransfer();dt.items.add(new File(['{}'],'pending.json'));const e=document.querySelector('#submission-file');e.files=dt.files;e.dispatchEvent(new Event('change'));});
  await page.locator('#clear-validation').click();assert(await page.evaluate(()=>window.readAborted&&window.pendingReader.onload===null),'cancel file read');await page.evaluate(()=>{window.FileReader=window.realFileReader;delete window.pendingReader;});
  await page.evaluate(()=>{window.navigationSentinel=42;window.oldText=document.querySelector('#submission-text');});await text.fill(marker);
  await page.locator('a[href$="/examples/"]').filter({hasText:'example'}).first().click();await page.waitForURL('**/examples/');await page.locator('#validator').waitFor({state:'detached'});
  assert(await page.evaluate(()=>window.navigationSentinel===42&&window.oldText.value===''),'instant leave cleanup');
  await page.goBack();await page.waitForURL('**/validate/');await text.waitFor({state:'visible'});assert(await text.inputValue()==='','return clears input');
  await page.evaluate(()=>{window.renderCount=0;const el=document.querySelector('#validation-errors'),original=el.replaceChildren.bind(el);el.replaceChildren=(...args)=>{window.renderCount++;original(...args);};});
  await run.click();assert(await page.evaluate(()=>window.renderCount)===1,'no duplicate handlers');
  await text.fill(marker);await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pagehide')));await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow')));assert(await text.inputValue()==='','history lifecycle clears input');
  await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile overflow');assert(await run.isVisible(),'mobile button');await page.screenshot({path:'/tmp/vdr-validator-mobile.png',fullPage:true});
  await page.setViewportSize({width:1280,height:900});await page.screenshot({path:'/tmp/vdr-validator-desktop.png',fullPage:true});
  assert(!requests.some(r=>(r.url+r.body).includes(marker)),'input in network traffic');
  const storage=await page.evaluate(async()=>({local:JSON.stringify(localStorage),session:JSON.stringify(sessionStorage),cookie:document.cookie,databases:await indexedDB.databases(),caches:await caches.keys()}));assert(!JSON.stringify(storage).includes(marker),'input persisted');
  assert(!await page.evaluate(()=>JSON.stringify(window.dataLayer||[]).includes('VDR_TEST_CANARY_819273')),'input in analytics data layer');
  return {passed:true,requests:requests.length,analyticsResponses:responses.filter(r=>/gtag|dap\.js|google-analytics/.test(r.url)),failures,storage};
}
