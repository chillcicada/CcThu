import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

const exclude: string[] = [
  '**\/node_modules/**',
  '**\/dist/**',
  '**\/.{idea,git,cache,output,temp}/**',
  '**\/*.config.*',
  // index.test.ts can only be tested under the bun environment
  // run `bun run test` to test when developing
  'test/index.test.ts',
  'src/modules/**',
  'src/urls/**',
]

export default defineConfig({
  test: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/*': resolve(__dirname, 'src/*'),
      '@@': resolve(__dirname),
      '@@/*': resolve(__dirname, '*'),
    },
    globals: true,
    exclude,
    coverage: {
      provider: 'v8',
      exclude,
    },
  },
})
