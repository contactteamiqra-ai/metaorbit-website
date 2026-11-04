import { mkdir, copyFile, rm, cp } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const file of ['index.html', 'styles.css', 'app.js', 'orbit.js', 'content.js']) await copyFile(`src/${file}`, `dist/${file}`);
await cp('src/assets', 'dist/assets', { recursive: true });
console.log('Built static homepage → dist/');
