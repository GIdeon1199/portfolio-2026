import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/portfolio-2026/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        work: resolve(__dirname, 'work.html'),
        contact: resolve(__dirname, 'contact.html'),
        resume: resolve(__dirname, 'resume.html'),
        hero: resolve(__dirname, 'hero.html'),
        caseMuseum: resolve(__dirname, 'case-museum-of-broken-systems.html'),
        casePerkUp: resolve(__dirname, 'case-perk-up.html'),
        caseTruth: resolve(__dirname, 'case-truth-or-twisted.html'),
        caseFlutter: resolve(__dirname, 'case-flutter-archive.html'),
        ongoingAnansi: resolve(__dirname, 'ongoing-anansi.html'),
      },
    },
  },
});
