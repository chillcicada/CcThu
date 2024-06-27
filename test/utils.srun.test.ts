import * as r from '@/utils/srun'

describe('utils/srun', () => {
  it('should encrypt', () => {
    expect(r.xEncode('123456', '1234567890')).toBe('ág¡[ÏW¿Çû')

    expect(r.xEncode('abcd', 'abcd')).toBe('Íé&Ä÷úº')
  })

  it('should encode', () => {
    expect(new r.XBase64().encode(r.xEncode('str', 'key'))).toBe('sLYfdgWlbBL=')
  })

  // sadly that we can't test decode
})
