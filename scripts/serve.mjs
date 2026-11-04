import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(process.argv[2]||'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.sdf':'application/octet-stream'};
http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let file=resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}
  const info=await stat(file);
  if(info.isDirectory()){
   if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'}).end();return;}
   file=resolve(file,'index.html');
  }
  const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(body);
 }catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Page not found');}
}).listen(Number(process.env.PORT||4173),'0.0.0.0',()=>console.log(`Serving ${root} on port ${process.env.PORT||4173}`));
