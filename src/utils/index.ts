// #region url
export * as urls from './urls'
export * as urls2 from './webvpn-urls'
// #endregion

export {
  $,
  addCSRFTokenToUrl,
  decodeHTML,
  parseSemesterType,
  fetchWithRetry,
  fetchWithTimeout,
  paramToModule,
} from './common'

export { getCookie, rmCookie, setCookie } from './cookie'
