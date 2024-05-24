import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import type { HTTPMethod } from 'elysia/types'

import { app } from '@@'

const client = treaty(app)

const username = Bun.env.API_USERNAME
const password = Bun.env.API_PASSWORD

// const toj_email = Bun.env.TOJ_EMAIL || ''
// const toj_password = Bun.env.TOJ_PASSWORD || ''

if (!username || !password)
  console.warn('API_USERNAME or API_PASSWORD is not set')

const tp = (str: string, method: HTTPMethod = 'GET') => `should return ${str} response with ${method} method`

describe('ccThu', () => {
  it(tp('test'), async () => {
    const { data } = await client.test.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('test', 'POST'), async () => {
    const { data } = await client.test.post()

    expect(data).toMatchSnapshot()
  })

  const api = (client as any).api.v1

  it(tp('api test'), async () => {
    const { data } = await api.test.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('login'), async () => {
    const { data } = await api.login.get({ query: { username, password } })

    expect(data).toMatchSnapshot()
  })

  it(tp('logout'), async () => {
    const { data } = await api.logout.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('login', 'POST'), async () => {
    const { data } = await api.login.post({ username, password })

    expect(data).toMatchSnapshot()
  })

  it(tp('user info'), async () => {
    const { data } = await api.user.info.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('user info', 'POST'), async () => {
    const { data } = await api.user.info.post()

    expect(data).toMatchSnapshot()
  })

  it(tp('semester list'), async () => {
    const { data } = await api.semester.list.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('semester list', 'POST'), async () => {
    const { data } = await api.semester.list.post()

    expect(data).toMatchSnapshot()
  })

  it(tp('logout', 'POST'), async () => {
    const { data } = await api.logout.post()

    expect(data).toMatchSnapshot()
  })
})
