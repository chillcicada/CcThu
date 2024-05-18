import { describe, expect, it } from 'bun:test'

import * as c from '@/utils/common'

describe('utils/common', () => {
  it('should add CSRF token to URL', () => {
    const token = 'csrf-token'

    const url1 = 'https://example.com'
    const result1 = 'https://example.com/?_csrf=csrf-token'

    expect(c.addCSRFTokenToUrl(url1, token).toString()).toBe(result1)

    const url2 = 'https://example.com?foo=bar'
    const result2 = 'https://example.com/?foo=bar&_csrf=csrf-token'

    expect(c.addCSRFTokenToUrl(url2, token).toString()).toBe(result2)

    const url3 = 'https://example.com?foo=bar&_csrf=token'
    const result3 = 'https://example.com/?foo=bar&_csrf=csrf-token'

    expect(c.addCSRFTokenToUrl(url3, token).toString()).toBe(result3)
  })

  it('should get CSRF token from URL', () => {
    const targetToken = 'csrf-token'

    const url1 = `https://example.com/?_csrf=${targetToken}`
    expect(c.getCSRFTokenFromUrl(url1)).toBe(targetToken)

    const url2 = `https://example.com/?foo=bar&_csrf=${targetToken}`
    expect(c.getCSRFTokenFromUrl(url2)).toBe(targetToken)

    const url3 = 'https://example.com/?foo=bar'
    expect(c.getCSRFTokenFromUrl(url3)).toBe('')

    const url4 = 'https://example.com'
    expect(c.getCSRFTokenFromUrl(url4)).toBe('')
  })

  it('should parse semester type', () => {
    expect(c.parseSemesterType(1)).toBe('autumn')
    expect(c.parseSemesterType(2)).toBe('spring')
    expect(c.parseSemesterType(3)).toBe('summer')
    expect(c.parseSemesterType(4)).toBe('unknown')
  })
})
