import { type Options, build } from 'tsup'

const commonConfigs: Options = {
  entryPoints: ['index.ts', 'src/**/*.ts'],
  target: 'node22',
  clean: true,
  bundle: true,
  splitting: false,
  sourcemap: false,
} satisfies Options

await build({
  ...commonConfigs,
  format: ['esm'],
  outDir: 'dist',
  cjsInterop: false,
})

// await Bun.build({
//   entrypoints: ['./index.ts'],
//   target: 'bun',
//   outdir: './dist',
// })
