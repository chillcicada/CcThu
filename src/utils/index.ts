// #region url
export * as urls from './urls'
export * as urls2 from './webvpn-urls'
// #endregion

// #region common
export {
  $,
  addCSRFTokenToUrl,
  decodeHTML,
  parseSemesterType,
  fetchWithRetry,
  fetchWithTimeout,
} from './common'
// #endregion

export { getCookie, rmCookie, setCookie } from './cookie'
