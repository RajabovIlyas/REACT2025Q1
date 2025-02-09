import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    test: {
        globals: true,
        environment: 'jsdom',
        watch: false,
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            include: ['../*.tsx'],
        },
    },
});
