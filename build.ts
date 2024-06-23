import { type Options, build } from 'tsup'

const commonConfigs: Options = {
  entry: ['src/index.ts', 'src/modules'],
  target: 'esnext',
  clean: true,
  bundle: true,
  splitting: false,
  sourcemap: false,
  minify: true,
  treeshake: false,
} satisfies Options

await build({
  ...commonConfigs,
  format: ['esm'],
  outDir: 'dist',
  cjsInterop: false,
})
