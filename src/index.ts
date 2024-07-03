import { join } from 'node:path'
import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
// import { cron } from '@elysiajs/cron'

import { paramToModule } from './utils'
import type { BaseResponse } from '@/types'

interface ModulesPluginConfig {
  apiVersion: `v${number}`
  modulesDir: string
  excludeModules: string[]
  // specialFiles: Record<string, string>
}

/**
 * Modules Plugin
 * @param cfg see this configuration at {@link ModulesPluginConfig}
 * reduce the configuration to {@link ModulesPluginConfig.apiVersion}
 */
function modulesPluginGen(cfg: Partial<ModulesPluginConfig> | ModulesPluginConfig['apiVersion'] = {}): Elysia {
  if (typeof cfg === 'string')
    cfg = { apiVersion: cfg }

  const {
    apiVersion = 'v1',
    modulesDir = 'modules',
    excludeModules: excludeFiles = [],
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

      const moduleNames = `${paramToModule(params['*'])}`

      const modulePath = join(modulesPath, moduleNames)

      if (excludeFiles.includes(moduleNames)) {
        return {
          status: 404,
          message: 'Module not found',
        }
      }

      // TODO
      const args = query

      try {
        const func: Function = await import(modulePath).then(m => m.default)

        return func(args)
      }
      catch (e) {
        console.warn(`Module ${moduleNames} not found`)

        if (import.meta.env.NODE_ENV === 'development')
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

      const moduleNames = `${paramToModule(params['*'])}.ts`

      const modulePath = join(modulesPath, moduleNames)

      if (excludeFiles.includes(moduleNames)) {
        return {
          status: 404,
        }
      }

      // TODO
      const args = body

      try {
        const func: Function = await import(modulePath).then(m => m.default)

        return func(args)
      }
      catch (e) {
        console.warn(`Module ${moduleNames} not found`)

        if (import.meta.env.NODE_ENV === 'development')
          console.error(e)

        return {
          status: 404,
        }
      }
    })
}

export const app = new Elysia()
  // .use(cron({
  //   name: 'zzz',
  //   pattern: '*/5 * * * * *',
  //   run: () => {
  //     console.log('zzz')
  //   },
  // }))
  .use(swagger())
  .use(modulesPluginGen())
  .all('/', () => 'Hello, here is cc. This project is 🚧 working in process 🚧, please wait for the release.')
  .get('/test', (): BaseResponse<string> => {
    return {
      message: 'Test Successfully',
      data: new Date().toISOString(),
      status: true,
    }
  })
  .post('/test', (): BaseResponse<string> => {
    return {
      message: 'Test Successfully',
      data: new Date().toISOString(),
      status: true,
    }
  })
  .onError((e): BaseResponse => {
    if (import.meta.env.NODE_ENV === 'development')
      console.error(e)

    return {
      status: false,
      message: `Unknown error, ${typeof e === 'string' ? e : 'unknown error'}`,
    }
  })
  .listen(Bun.env.PORT || 3000)

export default app
