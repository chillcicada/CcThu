function preprocess(str: string, useLen = false): number[] {
  const v: number[] = []
  const len = str.length

  for (let i = 0; i < len; i += 4) {
    v.push(
      str.charCodeAt(i) | (str.charCodeAt(i + 1) << 8) | (str.charCodeAt(i + 2) << 16) | (str.charCodeAt(i + 3) << 24),
    )
  }

  return useLen ? [...v, len] : v
}

/**
 * xxtea encrypt for srun network
 */
export function xEncode(str: string, key: string): string {
  if (str === '')
    return ''

  const s = preprocess(str, true)
  const k = preprocess(key)

  if (k.length < 4)
    k.length = 4

  const n = s.length - 1
  const delta = 0x9E3779B9

  let z = s[n]
  let y = s[0]
  let q = Math.floor(6 + 52 / (n + 1))
  let d = 0

  while (q-- > 0) {
    d += delta
    const e = d >>> 2 & 3

    for (let p = 0; p < n; p++) {
      y = s[p + 1]
      let mx = z >>> 5 ^ y << 2
      mx += y >>> 3 ^ z << 4 ^ (d ^ y)
      mx += k[p & 3 ^ e] ^ z
      s[p] += mx
      z = s[p]
    }

    y = s[0]
    let mx = z >>> 5 ^ y << 2
    mx += y >>> 3 ^ z << 4 ^ (d ^ y)
    mx += k[n & 3 ^ e] ^ z
    s[n] += mx
    z = s[n]
  }

  return s.map(v => String.fromCharCode(v & 0xFF, v >> 8 & 0xFF, v >> 16 & 0xFF, v >> 24 & 0xFF)).join('')
}

/**
 * A minimal modified base64 encoder/decoder
 */

export function xEncodeBase64(str: string) {
  const _base64Alphabet = 'LVoJPiCN2R8G90yg+hmFHuacZ1OWMnrsSTXkYpUq/3dlbfKwv6xztjI7DeBE45QA'
  const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  return btoa(str).split('').map(c => c === '=' ? '=' : _base64Alphabet.charAt(base64Alphabet.indexOf(c))).join('')
}
