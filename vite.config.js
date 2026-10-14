import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Relative base lets the build work on GitHub Pages project sites and any static host.
export default defineConfig({ base: './', plugins: [react()] });
