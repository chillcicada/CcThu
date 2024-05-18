// TODO: optimize the code
import { readFile, unlink, writeFile } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// ? or use the `.temp` path at workspace root
const TmpPath = tmpdir()
const TargetFileName = 'cookie.tmp'

interface commonCookieConfig {
  path: string
  fileName: string
}

/**
 * Configuration for set cookie
 */
export interface setCookieConfig extends commonCookieConfig {
  cookie: string
}

/**
 * Async set cookie to file
 * @param cfg The configuration to set the cookie,
 * type {@link setCookieConfig | string}, default `{}`,
 * if the configuration is a string, then it will be treated as the cookie
 * @param cfg.cookie The cookie to set, type `string`
 * @param cfg.path The path to save the cookie, default {@link TmpPath}
 * @param cfg.fileName The file name to save the cookie, default {@link TargetFileName}
 *
 * @returns Promise
 */
export async function setCookie(cfg: Partial<setCookieConfig> | string = {}): Promise<void> {
  if (typeof cfg === 'string')
    cfg = { cookie: cfg }

  const {
    cookie = '',
    path = TmpPath,
    fileName = TargetFileName,
  } = cfg

  if (!cookie)
    console.warn('Empty cookie')

  const cookieFile = join(path, fileName)

  return new Promise<void>((resolve, reject) => {
    writeFile(cookieFile, cookie, e => e ? reject(e) : resolve())
  })
}

/**
 * Configuration for get cookie
 */
export interface getCookieConfig extends commonCookieConfig {
  encoding: BufferEncoding
}

/**
 * Async read cookie from file
 * @param cfg The configuration to read the cookie,
 * type {@link getCookieConfig | BufferEncoding}, default `{}`,
 * if the configuration is a {@link BufferEncoding}, then it will be treated as the encoding
 * @param cfg.path The path to read the cookie, default {@link TmpPath}
 * @param cfg.encoding The encoding to read the file, type {@link BufferEncoding}, default `utf-8`
 * @param cfg.fileName The file name to read the cookie, default {@link TargetFileName}
 *
 * @returns The cookie as string
 */
export async function getCookie(cfg: Partial<getCookieConfig> | BufferEncoding = {}): Promise<string> {
  if (typeof cfg === 'string')
    cfg = { encoding: cfg }

  const {
    path = TmpPath,
    encoding = 'utf-8',
    fileName = TargetFileName,
  } = cfg

  const cookieFile = join(path, fileName)

  return new Promise<string>((resolve, reject) => {
    readFile(cookieFile, encoding, (e, cookie) => e ? reject(e) : resolve(cookie))
  })
}

/**
 * Configuration for remove cookie
 */
export interface rmCookieConfig extends commonCookieConfig {}

/**
 * Async write cookie to file
 * @param cfg The configuration to remove the cookie,
 * type {@link rmCookieConfig}, default `{}`
 * @param cfg.path The path to remove the cookie, default {@link TmpPath}
 * @param cfg.fileName The file name to remove the cookie, default {@link TargetFileName}
 */
export async function rmCookie(cfg: Partial<rmCookieConfig> = {}): Promise<void> {
  const {
    path = TmpPath,
    fileName = TargetFileName,
  } = cfg

  const cookieFile = join(path, fileName)

  return new Promise<void>((resolve, reject) => {
    unlink(cookieFile, e => e ? reject(e) : resolve())
  })
}
