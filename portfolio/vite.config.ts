import { fileURLToPath, URL } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { projects } from './src/content/projects';

export default defineConfig({
  plugins: [react(), {
    name: 'static-project-pages',
    async writeBundle(output) {
      // GitHub Pages needs a real file for direct visits; it has no SPA rewrite.
      const directory = resolve(output.dir ?? 'dist');
      const html = await readFile(resolve(directory, 'index.html'), 'utf8');
      await Promise.all(projects.map(async (project) => {
        const folder = resolve(directory, 'work', project.id);
        const url = `https://gabriel-dev.me/work/${project.id}/`;
        const page = html
          .replace(/<title>.*?<\/title>/, `<title>${project.name} — Gabriel Leal</title>`)
          .replace(/(<link rel="canonical" href=")[^"]+/, `$1${url}`)
          .replace(/(<meta property="og:url" content=")[^"]+/, `$1${url}`);
        await mkdir(folder, { recursive: true });
        await writeFile(resolve(folder, 'index.html'), page);
      }));
    },
  }],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: true,
    open: false,
  },
});
