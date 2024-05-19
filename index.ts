import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

// import { HMR } from '@'
import type { BaseResponse, IdentityType, Recv } from '@/types'
import * as modules from '@/modules'

// if (Bun.env.NODE_ENV === 'development')
//   HMR()

export const app = new Elysia()
  .use(swagger())
  .all('/', () => 'Hello, World. This project is 🚧 working in process 🚧, please wait for the release.')
  .all('/test', (): BaseResponse<string> => {
    return {
      message: 'Test Successfully',
      data: new Date().toISOString(),
      status: true,
    }
  })
  .all('/login', async ({ query: { username, password } }) => modules.login({ username, password }))
  .all('/logout', () => modules.logout())
  .all('/user/info', (
    { query: { identityType } }: Recv<{ identityType: IdentityType }>,
  ) => modules.getUserInfo({ identityType }))
  // .use(modulesPluginGen())
  .all('/semester/list', async () => await modules.getSemesterIdList())
  .onError((e): BaseResponse => {
    return {
      status: false,
      message: typeof e === 'string' ? e : e instanceof Error ? e.message : 'Unknown Error',
    }
  })
  .listen(Bun.env.PORT || 3000)

// eslint-disable-next-line no-console
console.log(`🚀 The Server is running at:\x1B[32m http://${app.server?.hostname}:${app.server?.port} \x1B[0m💕`)
