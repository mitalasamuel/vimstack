import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { defineConfig } from 'vite';

function stripUseClientDirective(): import('vite').Plugin {
  return {
    name: 'strip-use-client-directive',
    enforce: 'pre' as const,
    transform(code, id) {
      if (
        id.endsWith('.js') ||
        id.endsWith('.ts') ||
        id.endsWith('.tsx') ||
        id.endsWith('.mjs')
      ) {
        if (code.includes('"use client"') || code.includes("'use client'")) {
          return code.replace(/['"]use client['"];?\s*/g, '');
        }
      }
    },
  };
}

export default defineConfig({
    base: './',
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/css/dark-mode.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        stripUseClientDirective(),
        tailwindcss(),
    ],
    server: {
        host: 'localhost',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
        watch: {
            ignored: ['**/vendor/**', '**/node_modules/**']
        }
    },

    esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'react',
    },
    resolve: {
        alias: {
            // Make ziggy alias conditional - fallback if vendor doesn't exist
            'ziggy-js': (() => {
                const ziggyPath = resolve(__dirname, 'vendor/tightenco/ziggy');
                if (existsSync(ziggyPath)) {
                    return ziggyPath;
                }
                // Fallback for build environments where vendor isn't available yet
                const fallbackPath = resolve(__dirname, 'node_modules/ziggy-js');
                if (existsSync(fallbackPath)) {
                    return fallbackPath;
                }
                // Last resort: return the original path (will fail if not found, but better than breaking build)
                return ziggyPath;
            })(),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react';
                        }
                        if (id.includes('@radix-ui')) {
                            return 'vendor-radix';
                        }
                        if (id.includes('date-fns') || id.includes('clsx')) {
                            return 'vendor-utils';
                        }
                        if (id.includes('chart.js')) {
                            return 'vendor-charts';
                        }
                        return 'vendor';
                    }

                    if (id.includes('/resources/js/pages/')) {
                        const segments = id.split('/resources/js/pages/')[1]?.split('/');
                        return segments && segments.length ? `page-${segments[0].toLowerCase()}` : 'pages';
                    }

                    if (id.includes('/resources/js/components/')) {
                        return 'components';
                    }

                    return undefined;
                },
            },
        },
        assetsDir: 'assets',
        chunkSizeWarningLimit: 2000,
    }
});