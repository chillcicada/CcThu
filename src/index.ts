/* eslint-disable no-console */
import { join } from 'node:path'
import { Elysia } from 'elysia'
import { paramToModule } from './utils'

interface ModulesPluginConfig {
  apiVersion: `v${number}`
  modulesDir: string
  excludeFiles: string[]
  // specialFiles: Record<string, string>
}

/**
 * Modules Plugin
 * @param cfg see this configuration at {@link ModulesPluginConfig}
 * reduce the configuration to {@link ModulesPluginConfig.apiVersion}
 */
export function modulesPluginGen(cfg: Partial<ModulesPluginConfig> | ModulesPluginConfig['apiVersion'] = {}): Elysia {
  if (typeof cfg === 'string')
    cfg = { apiVersion: cfg }

  const {
    apiVersion = 'v1',
    modulesDir = 'modules',
    excludeFiles = [],
    // specialFiles = {},
  } = cfg

  const modulesPath = join(__dirname, modulesDir, apiVersion)

  return new Elysia({ name: 'modulesPlugin' })
    .get(`/api/${apiVersion}/*`, async (req) => {
      const {
        query,
        params,
        ..._rest // TODO
      } = req

      console.log(req)

      const moduleNames = `${paramToModule(params['*'])}.ts`

      const modulePath = join(modulesPath, moduleNames)

      if (excludeFiles.includes(moduleNames)) {
        return {
          status: 404,
        }
      }

      // TODO
      const args = query

      console.log(args)

      try {
        const func: Function = await import(modulePath).then(m => m.default)

        return func(args)
      }
      catch (e) {
        console.warn(`Module ${moduleNames} not found`)

        console.error(e)

        return {
          status: 404,
        }
      }
    })
    .post(`/api/${apiVersion}/*`, async (req) => {
      const {
        body,
        params,
        ..._rest // TODO
      } = req

      console.log(req)

      const moduleNames = `${paramToModule(params['*'])}.ts`

      const modulePath = join(modulesPath, moduleNames)

      if (excludeFiles.includes(moduleNames)) {
        return {
          status: 404,
        }
      }

      // TODO
      const args = body

      console.log(args)

      try {
        const func: Function = await import(modulePath).then(m => m.default)

        return func(args)
      }
      catch (e) {
        console.warn(`Module ${moduleNames} not found`)

        console.error(e)

        return {
          status: 404,
        }
      }
    })
}
