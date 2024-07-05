import { decodeHTML as _decodeHTML } from 'entities'
import * as cheerio from 'cheerio'
import type { Element } from 'domhandler'
// import type { Element } from 'cheerio'
// // is it possible to import Element from cheerio?😎

import { getCookie } from './cookie'

import type { BaseResponse, SemesterType } from '@/types'
import { DEFAULT_RETRY_INTERVAL, DEFAULT_TIMEOUT, MAX_RETRY } from '@/constants'

/**
 * Add a CSRF token to a URL
 * @param url - The URL to add the CSRF token to
 * @param token - The CSRF token to add
 *
 * @returns The {@link URL} with the CSRF token added
 */
export function addCSRFTokenToUrl(url: string | URL, token: string): string {
  if (typeof url === 'string')
    url = new URL(url)
  url.searchParams.set('_csrf', token)
  return url.toString()
}

/**
 * Decode HTML string and Remove the overflow character of the conversion
 * @param html - The HTML string to decode
 *
 * @returns The decoded string
 */
export const decodeHTML = (html: string) => _decodeHTML(html).replace(/^(\\xC2\\x9E\\xC3\\xA9|(\\x9E)?\\xE9)\\x65/, '')

export const noLogin = (res: Response) => res.url.includes('login_timeout') || res.status === 403

/**
 * Turn a param string to a module name
 */
export const paramToModule = (params: string) => params.replace(/\//g, '-')

/**
 * Parse SemesterType from a number
 * @param n - The number to parse
 *
 * @returns The {@link SemesterType} parsed
 */
export function parseSemesterType(n: number): SemesterType {
  switch (n) {
    case 1:
      return 'autumn'
    case 2:
      return 'spring'
    case 3:
      return 'summer'
    default:
      return 'unknown'
  }
}

/**
 * Parse HTML string to Cheerio object
 * @param html - The HTML string or {@link Element} or Element[] to parse
 *
 * @returns The Cheerio object {@link cheerio.CheerioAPI}
 */
export const $ = (html: string | Element | Element[]) => cheerio.load(html, { xml: true, decodeEntities: false })

// #region fetch
/**
 * Config for {@link fetchWithTimeout}
 */
export interface FetchWithTimeoutConfig {
  useCookie: boolean
  useCSRFToken: boolean
  timeout: number
  fetchImpl: typeof fetch
}

/**
 * A wrapper for {@link fetch} with timeout
 * @param url - The string or {@link URL} or {@link Request} to fetch
 * @param options - The fetch options, default to {}
 * @param config - The fetch configuration, type {@link FetchWithTimeoutConfig}
 * @param config.useCookie - Whether to use cookie, default to true
 * @param config.useCSRFToken - Whether to use CSRF token, default to true
 * @param config.timeout - The timeout of the fetch, default to {@link DEFAULT_TIMEOUT}
 * @param config.fetchImpl - The fetch implementation, default to {@link fetch}
 *
 * @returns The {@link Response} of the fetch
 */
export async function fetchWithTimeout(
  url: string | URL | Request,
  options: RequestInit = {},
  config: Partial<FetchWithTimeoutConfig> = {},
): Promise<Response> {
  const {
    useCookie = true,
    timeout = DEFAULT_TIMEOUT,
    fetchImpl = fetch,
  } = config

  // TODO: Optimize this
  if (useCookie) {
    const useCSRFToken = config.useCSRFToken ?? true

    const cookie = await getCookie()

    const defaultOptions = { headers: { cookie } } as const

    options = {
      ...defaultOptions,
      ...options,
    }

    const csrfToken = cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || ''

    if (url instanceof Request)
      url = url.url

    if (useCSRFToken)
      url = addCSRFTokenToUrl(url, csrfToken)
  }

  if (timeout === 0)
    return fetchImpl(url, options)

  return new Promise((resolve, reject) => {
    const controller = new AbortController()
    const id = setTimeout(() => {
      controller.abort()
      reject(new Error('Timeout'))
    }, timeout)

    fetchImpl(url, { ...options, signal: controller.signal })
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(id))
  })
}

/**
 * Config for {@link fetchWithRetry}
 */
export interface FetchWithRetryConfig extends FetchWithTimeoutConfig {
  maxRetry: number
  retryInterval: number
}

/**
 * A wrapper for {@link fetch} with timeout and retry
 * @param url - The string or {@link URL} or {@link Request} to fetch
 * @param options - The fetch options, default to {}
 * @param config - The fetch configuration, type {@link FetchWithRetryConfig}
 * @param config.maxRetry - The maximum number of retries, default to {@link MAX_RETRY}
 * @param config.retryInterval - The interval between retries, default to {@link DEFAULT_RETRY_INTERVAL}
 * @param config.timeout - The timeout of the fetch, default to {@link DEFAULT_TIMEOUT}
 * @param config.fetchImpl - The fetch implementation, default to {@link fetch}
 *
 * @returns The {@link Response} of the fetch
 */
export async function fetchWithRetry(
  url: string | URL | Request,
  options: RequestInit = {},
  config: Partial<FetchWithRetryConfig> = {},
): Promise<Response> {
  const {
    maxRetry = MAX_RETRY,
    retryInterval = DEFAULT_RETRY_INTERVAL,
    ...rest
  } = config

  return new Promise((resolve, reject) => {
    let retry = 0

    const fetcher = async () => {
      try {
        resolve(await fetchWithTimeout(url, options, rest))
      }
      catch (e) {
        retry < maxRetry
          ? setTimeout(fetcher, retryInterval) && retry++
          : reject(e)
      }
    }

    fetcher()
  })
}
// #endregion

// TODO
export function SetResponse<T>(res: Response): Promise<T> {
  return res.json()
}

/**
 * Create a success message for {@link BaseResponse}
 * @param message - The message
 */
export const useFail = (message: string): BaseResponse => ({ status: false, message })

/**
 * Create a fail message for {@link BaseResponse}
 * @param e - The error to handle
 * @param message - The message
 * @param callback - The callback to run after handling the error
 */
export function useError(e: unknown, message: string, callback: (e: unknown) => void = () => { }): BaseResponse {
  if (import.meta.env.NODE_ENV === 'development')
    console.error(e)

  callback(e)

  return useFail(message)
}

/**
 * A simple network test
 */
export function netTest(): BaseResponse<string> {
  return {
    message: 'Test Successfully',
    data: new Date().toISOString(),
    status: true,
  }
}
