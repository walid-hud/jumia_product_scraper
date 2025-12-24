import { defineConfig} from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(path.dirname("."),'../shared/*'),
      '@server': path.resolve(path.dirname("."), '../server/*'),
    },
  },
});