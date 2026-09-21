const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
for(const viewport of [{width:1741,height:1100},{width:1280,height:800},{width:390,height:844}]){
 const page=await browser.newPage({viewport});await page.goto('http://localhost:3000');await page.evaluate(()=>sessionStorage.setItem('p7-current-page','persona'));await page.reload();await page.getByRole('button',{name:'设计规范',exact:true}).click();await page.waitForTimeout(400);
 const c=await page.locator('.deck-canvas').boundingBox(),p=await page.locator('#design-panel').boundingBox();
 console.log(viewport,c,p);assert.ok(c.x+c.width<=p.x+1 || c.y+c.height<=p.y+1);assert.ok(c.x>=0&&c.x+c.width<=viewport.width+1);
 await page.getByRole('button',{name:'关闭设计规范'}).click();assert.equal(await page.locator('.deck-canvas').evaluate(e=>e.style.zoom),'');await page.close();
}
const page=await browser.newPage({viewport:{width:1741,height:1100}});await page.goto('http://localhost:3000');
const old={id:'old-size',name:'旧尺寸',purpose:'旧卡片',kind:'size',values:{value:'333px'}};
await page.evaluate(old=>{sessionStorage.setItem('p7-current-page','persona');localStorage.setItem('p7-library-v1',JSON.stringify([old]));localStorage.setItem('p7-element-styles-v1',JSON.stringify({persona:{'.deck-canvas h3':{'letter-spacing':'1px'}}}));localStorage.setItem('p7-design-settings-v1',JSON.stringify({blue:'#123456'}));},old);await page.reload();
assert.ok((await page.evaluate(()=>JSON.parse(localStorage.getItem('p7-library-v1')))).some(r=>r.id==='old-size'&&r.values.value==='333px'));
assert.equal(await page.locator('[data-design-card] h3').first().evaluate(e=>getComputedStyle(e).letterSpacing),'1px');
await page.getByRole('button',{name:'设计规范',exact:true}).click();await page.getByRole('button',{name:'规范库',exact:true}).click();await page.getByRole('button',{name:'全局规范',exact:true}).click();
const color=page.locator('#design-control-blue input');await color.fill('#654321');assert.equal(await page.evaluate(()=>document.documentElement.style.getPropertyValue('--ds-blue')),'#654321');await page.getByRole('button',{name:'撤销',exact:true}).click();assert.equal(await page.evaluate(()=>document.documentElement.style.getPropertyValue('--ds-blue')),'#123456');
await page.getByRole('button',{name:'编辑元素',exact:true}).click();await page.locator('[data-design-card]').first().click({position:{x:10,y:10}});const before=await page.locator('[data-design-card]').first().evaluate(e=>getComputedStyle(e).width);await page.getByLabel('宽度模式',{exact:true}).selectOption('fixed');await page.getByLabel('自定义宽度（px）',{exact:true}).fill('300');await page.getByRole('button',{name:'关闭设计规范'}).click();await page.waitForTimeout(800);assert.ok(Math.abs(parseFloat(await page.locator('[data-design-card]').first().evaluate(e=>getComputedStyle(e).width))-parseFloat(before))<1);
console.log('PASS old library/settings/legacy preserved, global undo, close cancels preview');await browser.close();})();
