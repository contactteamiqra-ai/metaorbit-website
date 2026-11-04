import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {routes} from './site.mjs';
const titles=new Set();
for(const [route] of routes){
 const path=`dist${route}index.html`,html=await readFile(path,'utf8');
 const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title),`Duplicate title: ${route}`);titles.add(title);
 assert.equal((html.match(/class="brand-logo"/g)||[]).length,2,`Header/footer logos: ${route}`);
 assert(html.includes('<h1'),`Missing page heading: ${route}`);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)){
  const target=match[1];assert((await stat(`dist${target}${target.endsWith('/')?'index.html':''}`)).isFile(),`Broken asset or route: ${route} → ${target}`);
 }
}
const original=await readFile('metaorbit_logo_white_HD.png');
assert.deepEqual(await readFile('src/assets/metaorbit_logo_white_HD.png'),original);
assert.deepEqual(await readFile('dist/assets/metaorbit_logo_white_HD.png'),original);
const meta=JSON.parse(await readFile('dist/assets/orbit-symbol.json','utf8'));
assert.equal((await readFile('dist/assets/orbit-symbol.sdf')).length,meta.width*meta.height);
console.log('PASS: eight distinct static pages, all local navigation/assets, original logos and geometry integrity.');
