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
  let mx: number
  let e: number
  let q = Math.floor(6 + 52 / (n + 1))
  let d = 0

  while (q-- > 0) {
    d += delta
    e = d >>> 2 & 3

    for (let p = 0; p < n; p++) {
      y = s[p + 1]
      mx = z >>> 5 ^ y << 2
      mx += y >>> 3 ^ z << 4 ^ (d ^ y)
      mx += k[p & 3 ^ e] ^ z
      s[p] += mx
      z = s[p]
    }

    y = s[0]
    mx = z >>> 5 ^ y << 2
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
export class XBase64 {
  private n = 'LVoJPiCN2R8G90yg+hmFHuacZ1OWMnrsSTXkYpUq/3dlbfKwv6xztjI7DeBE'
  private r = '='

  public encode(t: string): string {
    const a = t.length
    let h: number
    let u = ''

    for (let o = 0; o < a; o += 3) {
      h = t.charCodeAt(o) << 16 | (o + 1 < a ? t.charCodeAt(o + 1) << 8 : 0) | (o + 2 < a ? t.charCodeAt(o + 2) : 0)

      for (let i = 0; i < 4; i += 1)
        o * 8 + i * 6 > a * 8 ? u += this.r : u += this.n.charAt(h >>> 6 * (3 - i) & 63)
    }

    return u
  }

  public decode(e: string): string {
    let o = 0
    let i: number
    let h: number
    let u: number
    let a: number
    let c: number
    let l: number
    let D: number
    let B: number
    let C = 0

    const s: string[] = []

    if (!e)
      return e

    e = e.replace(new RegExp(`\\${this.r}`, 'gi'), '')
    do {
      a = this.n.indexOf(e.charAt(o += 1))
      c = this.n.indexOf(e.charAt(o += 1))
      l = this.n.indexOf(e.charAt(o += 1))
      D = this.n.indexOf(e.charAt(o += 1))

      B = a << 18 | c << 12 | l << 6 | D
      i = B >> 16 & 255
      h = B >> 8 & 255
      u = B & 255
      C += 1

      if (l === 64) {
        s[C] = String.fromCharCode(i)
      }
      else if (D === 64) {
        s[C] = String.fromCharCode(i, h)
      }
      else {
        s[C] = String.fromCharCode(i, h, u)
      }
    } while (o < e.length)

    return s.join('')
  }
}
