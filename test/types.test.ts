import type * as t from '@/types'

describe('types', () => {
  it('should return expected types via types util', () => {
    interface U {
      foo: string
      bar: number
    }

    expectTypeOf<t.FirstKey<U>>().toMatchTypeOf<'foo' | 'bar'>()

    expectTypeOf<t.BaseResponse<U>>().toMatchTypeOf<{
      message: string
      data?: {
        foo?: string
        bar?: number
      }
      status: boolean
    }>()
  })
})
