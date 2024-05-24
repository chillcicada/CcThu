import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
// import { cron } from '@elysiajs/cron'

import { modulesPluginGen } from '@'
import type { BaseResponse } from '@/types'

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
  .all('/', () => 'Hello, CcThu. This project is 🚧 working in process 🚧, please wait for the release.')
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
    return {
      status: false,
      message: typeof e === 'string' ? e : e instanceof Error ? e.message : 'Unknown Error',
    }
  })
  .listen(Bun.env.PORT || 3000)

// eslint-disable-next-line no-console
console.log(`🚀 The Server is running at:\x1B[32m http://${app.server?.hostname}:${app.server?.port} \x1B[0m💕`)
