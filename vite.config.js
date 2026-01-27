import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const toBool = (v) => String(v).toLowerCase() === 'true';

    return defineConfig({
        base: env.VITE_BASE ?? '/',
        plugins: [],
        resolve: {
            alias: { '@': path.resolve(__dirname, 'src') },
        },
        server: {
            port: Number(env.VITE_PORT ?? 5173),
            open: toBool(env.VITE_OPEN),
            strictPort: false,
        },
        preview: {
            port: Number(env.VITE_PREVIEW_PORT ?? 4173),
            open: toBool(env.VITE_PREVIEW_OPEN),
            strictPort: false,
        },
        build: {
            outDir: env.VITE_OUT_DIR ?? 'dist',
            sourcemap: toBool(env.VITE_SOURCEMAP),
            minify: env.VITE_MINIFY ?? 'esbuild',
            target: env.VITE_BUILD_TARGET ?? 'esnext',
        },
        css: {
            devSourcemap: toBool(env.VITE_CSS_SOURCEMAP),
        },
        define: {
            __APP_VERSION__: JSON.stringify(env.APP_VERSION ?? '0.0.0'),
        },
        optimizeDeps: {
            include: env.VITE_OPTIMIZE_INCLUDE?.split(',').filter(Boolean) ?? [],
            exclude: env.VITE_OPTIMIZE_EXCLUDE?.split(',').filter(Boolean) ?? [],
        },
        clearScreen: false,
    });
};