// #region urls
export const LEARN_PREFIX = 'https://learn.tsinghua.edu.cn'
export const ID_PREFIX = 'https://id.tsinghua.edu.cn'
export const REGISTRAR_PREFIX = 'https://zhjw.cic.tsinghua.edu.cn'
export const CARD_PREFIX = 'https://card.tsinghua.edu.cn'
export const TOJ_PREFIX = 'https://dsa.cs.tsinghua.edu.cn/oj'
export const INFO2021_PREFIX = 'https://info2021.tsinghua.edu.cn'
export const NETWORK_PREFIX = 'https://usereg.tsinghua.edu.cn'
export const WEBVPN_PREFIX = 'https://webvpn.tsinghua.edu.cn'
export const HOME_PREFIX = 'http://myhome.tsinghua.edu.cn' // ! not https
export const OVERLEAF_PREFIX = 'https://overleaf.tsinghua.edu.cn'
/**
 * @deprecated Use INFO2021_PREFIX instead
 */
export const ACADEMIC_PREFIX = 'https://academic.tsinghua.edu.cn'
/**
 * The prefix of the mail system
 * @param isStudent Whether the user is a student, default to `true`
 */
export const MAIL_PREFIX = (isStudent = true) => `https://mail${isStudent ? 's' : ''}.tsinghua.edu.cn`
// #endregion

// #region webvpn urls
// This only works for those that require web vpn when accessing from outside Tsinghua network
// ! This is all under `https` proxy
export const WEBVPN_ID_PREFIX = `${WEBVPN_PREFIX}/https/77726476706e69737468656265737421f9f30f8834396657761d88e29d51367bcfe7`
export const WEBVPN_EMAIL_PREFIX = `${WEBVPN_PREFIX}/https/77726476706e69737468656265737421fdf64890347e7c4377068ea48d546d3011ff591d40`
export const WEBVPN_LIBRARY_ROOM_BOOK_PREFIX = `${WEBVPN_PREFIX}/https/77726476706e69737468656265737421f3f643d22b396a1e6a1b80a29f5d363409e413829737d1'`
export const WEBVPN_NETWORK_PREFIX = `${WEBVPN_PREFIX}/https/77726476706e69737468656265737421e5e4448e223726446d0187ab9040227b54b6c80fcd73`
// #endregion
