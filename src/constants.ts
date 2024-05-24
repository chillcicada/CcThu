// #region urls
export const LEARN_PREFIX = 'https://learn.tsinghua.edu.cn'
export const ID_PREFIX = 'https://id.tsinghua.edu.cn'
export const REGISTRAR_PREFIX = 'https://zhjw.cic.tsinghua.edu.cn'
// #endregion

// #region webvpn urls
// This only works for those that require web vpn when accessing from outside Tsinghua network
// ! This is all under https proxy
export const WEBVPN_PREFIX = 'https://webvpn.tsinghua.edu.cn'
export const WEBVPN_ID_PREFIX = `${WEBVPN_PREFIX}/https/77726476706e69737468656265737421f9f30f8834396657761d88e29d51367bcfe7`

export const WEBVPN_EMAIL_PREFIX = `${WEBVPN_PREFIX}/https/77726476706e69737468656265737421fdf64890347e7c4377068ea48d546d3011ff591d40`
export const WEBVPN_LIBRARY_ROOM_BOOK_PREFIX = `${WEBVPN_PREFIX}/https/77726476706e69737468656265737421f3f643d22b396a1e6a1b80a29f5d363409e413829737d1'`

export const TOJ_PREFIX = `https://dsa.cs.tsinghua.edu.cn/oj`
// #endregion

// #region constant values
export const MAX_SIZE = 200

export const MAX_RETRY = 3
export const DEFAULT_RETRY_INTERVAL = 1000 // ms
export const DEFAULT_TIMEOUT = 3000 // ms
// #endregion

// #region error messages
export const APIError = {

} as const
// #endregion
