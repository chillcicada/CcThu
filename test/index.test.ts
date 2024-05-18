import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import type { HTTPMethod } from 'elysia/types'

import { app } from '@@'

const api = treaty(app)

const username = Bun.env.API_USERNAME
const password = Bun.env.API_PASSWORD

const tp = (str: string, method: HTTPMethod = 'GET') => `should return ${str} response with ${method} method`

describe('ccThu', () => {
  it(tp('test'), async () => {
    const { data } = await api.test.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('test', 'POST'), async () => {
    const { data } = await api.test.post()

    expect(data).toMatchSnapshot()
  })

  it(tp('login'), async () => {
    const { data } = await api.login.get({ query: { username, password } })

    expect(data).toMatchSnapshot()
  })

  it(tp('user info'), async () => {
    const { data } = await api.user.info.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('semester list'), async () => {
    const { data } = await api.semester.list.get()

    expect(data).toMatchSnapshot()
  })

  it(tp('logout'), async () => {
    const { data } = await api.logout.get()

    expect(data).toMatchSnapshot()
  })
})
