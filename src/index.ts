import { join } from 'node:path'
import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
// import { cron } from '@elysiajs/cron'

import { paramToModule, useError, useTest } from './utils'

export interface ModulesPluginConfig {
  apiVersion: string
  modulesDir: string
  // specialFiles: Record<string, string>
}

const InternetError = 'Internet error!'

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

      const moduleName = paramToModule(params['*'])

      const modulePath = join(modulesPath, moduleName)

      // TODO: special files

      // TODO
      const args = query

      return await import(modulePath).then(m => m.default).then(func => func(args))
        .catch(e => useError(e, InternetError, () => console.warn(`Module ${moduleName} not found`)))
    })
    .post(`/api/${apiVersion}/*`, async (req) => {
      const {
        body, // get method doesn't have body property
        params,
        ..._rest // TODO
      } = req

      const moduleName = paramToModule(params['*'])

      const modulePath = join(modulesPath, moduleName)

      // TODO: special files

      // TODO
      const args = body

      return await import(modulePath).then(m => m.default).then(func => func(args))
        .catch(e => useError(e, InternetError, () => console.warn(`Module ${moduleName} not found`)))
    })
}

export const app = new Elysia()
  // .use(cron({
  //   name: 'zzz',
  //   pattern: '*/5 * * * * *',
  //   run: () => console.log('zzz'),
  // }))
  .use(swagger())
  .use(modulesPluginGen(Bun.env.MODULE_VERSION || 'v1'))
  .all('/', 'Hello, here is cc. This project is 🚧 working in process 🚧, please wait for the release.') // TODO
  .all('/test', useTest)
  .onError(e => useError(e, InternetError))
  .listen(Bun.env.PORT || 3000)

export default app

/*!
 * GPL-3.0-only License
 *
 * Copyright (c) 2024 ChillCicada <2210227279@qq.com>
 */
