// Original lightweight WebGL sculpture. No remote models, textures, or runtime dependencies.
export function initOrbit(canvas, motion) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
  if (!gl) return;
  const stage = canvas.parentElement;
  const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader unavailable'); return shader; };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, `attribute vec3 position; attribute vec3 normal; attribute vec3 color; uniform vec2 rotation; uniform float aspect; uniform float camera; uniform float zoom; varying vec3 vNormal; varying vec3 vColor; void main(){float c=cos(rotation.x),s=sin(rotation.x),d=cos(rotation.y),t=sin(rotation.y);mat3 rx=mat3(1.,0.,0.,0.,c,s,0.,-s,c);mat3 ry=mat3(d,0.,-t,0.,1.,0.,t,0.,d);vec3 p=ry*rx*position;vNormal=ry*rx*normal;vColor=color;p*=zoom;float z=camera-p.z;gl_Position=vec4(p.x*2.65/aspect,p.y*2.65, (z-2.)*.25,z);}`));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `precision mediump float; varying vec3 vNormal; varying vec3 vColor; void main(){vec3 n=normalize(vNormal);vec3 light=normalize(vec3(-.6,1.,1.5));float diffuse=max(dot(n,light),0.);float spec=pow(max(dot(reflect(-light,n),vec3(0.,0.,1.)),0.),65.);float rim=pow(1.-abs(n.z),3.);gl_FragColor=vec4(vColor*(.44+.66*diffuse)+vec3(.48)*spec+vec3(.12)*rim,1.);}`));
  gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return; gl.useProgram(program);
  // CSS owns the brand accent so buttons and sculpture use the same base colour.
  const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim();
  const accent = [1, 3, 5].map(offset => parseInt(accentHex.slice(offset, offset + 2), 16) / 255);
  const data = [];
  function mesh(fn, uCount, vCount, color) {
    const vertex = (u,v) => { const [p,n] = fn(u,v); data.push(...p,...n,...color); };
    for(let i=0;i<uCount;i++) for(let j=0;j<vCount;j++){ const u=i/uCount,v=j/vCount,U=(i+1)/uCount,V=(j+1)/vCount; vertex(u,v);vertex(U,v);vertex(U,V);vertex(u,v);vertex(U,V);vertex(u,V); }
  }
  function rotate(p,a,b) { const [x,y,z]=p;const yy=y*Math.cos(a)-z*Math.sin(a),zz=y*Math.sin(a)+z*Math.cos(a);return [x*Math.cos(b)+zz*Math.sin(b),yy,-x*Math.sin(b)+zz*Math.cos(b)]; }
  for(const [a,b,col] of [[.9,.35,[.69,.70,.72]],[-.9,-.45,accent],[.22,1.14,[.40,.41,.43]]]) mesh((u,v)=>{ const t=u*Math.PI*2,q=v*Math.PI*2; const n=[Math.cos(t)*Math.cos(q),Math.sin(t)*Math.cos(q),Math.sin(q)];const r=1.53+.068*Math.cos(q); return [rotate([r*Math.cos(t),r*Math.sin(t),.068*Math.sin(q)],a,b),rotate(n,a,b)]; },160,14,col);
  mesh((u,v)=>{ const a=u*Math.PI*2,b=v*Math.PI;const n=[Math.cos(a)*Math.sin(b),Math.cos(b),Math.sin(a)*Math.sin(b)];return [n.map(x=>x*.61),n]; },64,40,accent);
  for (const [cx,cy,cz,radius,col] of [[1.36,.38,.3,.12,accent],[-1.1,-.85,.2,.09,[.7,.71,.73]],[.3,1.36,-.3,.07,accent]]) {
    mesh((u,v)=>{const a=u*Math.PI*2,b=v*Math.PI;const n=[Math.cos(a)*Math.sin(b),Math.cos(b),Math.sin(a)*Math.sin(b)];return [[cx+n[0]*radius,cy+n[1]*radius,cz+n[2]*radius],n];},24,16,col);
  }
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
  for(const [name,offset] of [['position',0],['normal',12],['color',24]]) { const a=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,3,gl.FLOAT,false,36,offset); }
  gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);
  const rot=gl.getUniformLocation(program,'rotation'),aspect=gl.getUniformLocation(program,'aspect'),camera=gl.getUniformLocation(program,'camera'),zoom=gl.getUniformLocation(program,'zoom');
  const hero = document.querySelector('.hero');
  let px=0,py=0,rx=.21,ry=-.25,frame=0,visible=true;
  function draw(){ frame=0;if(gl.isContextLost()) return;const dpr=Math.min(devicePixelRatio,2);const w=Math.round(stage.clientWidth*dpr),h=Math.round(stage.clientHeight*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);} const rect=hero.getBoundingClientRect();const scroll=motion.matches?0:Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-innerHeight*.5)));rx+=(.21+(motion.matches?0:py*.2)+scroll*1.1-rx)*.08;ry+=(-.25+(motion.matches?0:px*.3)+scroll*1.5-ry)*.08;gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform2f(rot,rx,ry);gl.uniform1f(aspect,w/h);gl.uniform1f(camera,5.7-scroll*.9);gl.uniform1f(zoom,1+scroll*.12);gl.drawArrays(gl.TRIANGLES,0,data.length/9);stage.classList.add('is-ready');if(!motion.matches&&visible&&!document.hidden) frame=requestAnimationFrame(draw); }
  function wake(){if(!frame) frame=requestAnimationFrame(draw);}
  stage.addEventListener('pointermove',e=>{const rect=stage.getBoundingClientRect();px=(e.clientX-rect.left)/rect.width-.5;py=(e.clientY-rect.top)/rect.height-.5;wake();});stage.addEventListener('pointerleave',()=>{px=py=0;});
  new ResizeObserver(wake).observe(stage);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();}).observe(stage);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)wake();});
  motion.addEventListener('change',()=>{rx=.21;ry=-.25;wake();});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);stage.classList.remove('is-ready');});
  canvas.addEventListener('webglcontextrestored',()=>{stage.classList.remove('is-ready');});
  wake();
}
