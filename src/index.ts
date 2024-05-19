/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
// import { Elysia } from 'elysia'

/**
 * Hot Module Reload Configuration
 */
interface HMRConfig {
  once: boolean
  modulesPath: string
}

// TODO: Auto upload modules
// interface ModulesPluginConfig {
//   modulesPath: string
//   excludeFiles: string[]
//   specialFiles: Record<string, string>
// }

// export function modulesPluginGen(cfg: Partial<ModulesPluginConfig> = {}): Elysia {
//   const {
//     modulesPath = path.join(__dirname, 'modules'),
//     excludeFiles = [],
//     specialFiles = {},
//   } = cfg

//   const app = new Elysia({ name: 'modulesPlugin' })
//     .post('/*', async ({ params, body }) => {

//     })

//   return app
// }

/**
 * Hot Module Reload
 * @param cfg see this configuration at {@link HMRConfig}
 */
export function HMR(cfg: Partial<HMRConfig> = {}): void {
  const {
    once = false,
    modulesPath = path.join(__dirname, 'modules'),
  } = cfg

  const watcher = fs.watch(modulesPath, { recursive: true }, (eventType, filename) => {
    console.log('Event type:', eventType)
    console.log('File changed:', filename)
  })

  if (once)
    watcher.close()
}
