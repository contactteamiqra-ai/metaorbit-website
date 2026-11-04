import {spawn} from 'node:child_process';
import {watch} from 'node:fs';
let building=false,pending=false,timer;
function build(){if(building){pending=true;return;}building=true;const child=spawn(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});child.on('exit',code=>{building=false;if(code)console.error('Build failed; fix the source and save again.');if(pending){pending=false;build();}});}
const initial=spawn(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
initial.on('exit',code=>{if(code)process.exit(code);const server=spawn(process.execPath,['scripts/serve.mjs','dist'],{stdio:'inherit'});for(const dir of ['src','scripts'])watch(dir,{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(build,120);});for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{server.kill(signal);process.exit();});});
