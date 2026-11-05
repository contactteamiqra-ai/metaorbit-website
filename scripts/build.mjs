import {mkdir,copyFile,rm,cp,readFile,writeFile} from 'node:fs/promises';
import {shell} from './site.mjs';
import {pages} from './pages.mjs';
import {projectMarkup} from './project-study.mjs';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['styles.css','site.css','app.js','orbit.js','home.css','home-motion.js'])await copyFile(`src/${file}`,`dist/${file}`);
await cp('src/assets','dist/assets',{recursive:true});
await writeFile('dist/index.html',shell({path:'/',title:'Better websites. Less manual work.',description:'MetaOrbit builds websites, eCommerce stores, connected workflows and CRM systems for agencies and growing businesses.',body:(await readFile('src/index.html','utf8')).replaceAll('{{project-study}}',projectMarkup())}));
for(const page of pages){const directory=`dist${page.path}`;await mkdir(directory,{recursive:true});await writeFile(`${directory}index.html`,shell(page));}
console.log('Built 8 static pages → dist/ (directory indexes; no SPA fallback needed)');
