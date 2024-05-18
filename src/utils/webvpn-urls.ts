import { WEBVPN_ID_PREFIX, WEBVPN_LIBRARY_ROOM_BOOK_PREFIX, WEBVPN_PREFIX } from '@/constants'

/**
 * webvpn login url
 */
export const WebvpnLogin = `${WEBVPN_PREFIX}/login`

/**
 * webvpn oauth login url
 */
export const WebvpnOauthLogin = `${WEBVPN_PREFIX}/oauth/login`

/**
 * webvpn logout url
 */
export const WebvpnLogout = `${WEBVPN_PREFIX}/logout`

/**
 * webvpn id form url
 */
export const WebvpnIdForm = `${WEBVPN_ID_PREFIX}/do/off/ui/auth/login/form/`

/**
 * webvpn id login url
 */
export const WebvpnIdLogin = `${WEBVPN_ID_PREFIX}/do/off/ui/auth/login/check`

// #region library room book
/**
 * webvpn library room book search url
 */
// export const LIBRARY_FUZZY_SEARCH_ID_URL = `${WEBVPN_LIBRARY_ROOM_BOOK_PREFIX}/ic-web/account/getMembers?page=1&pageNum=10&key=`

/**
 * webvpn library room book action url
 */
// export const WebvpnLibraryRoomBookAction = `${WEBVPN_LIBRARY_ROOM_BOOK_PREFIX}/ic-web/reserve`

/**
 * webvpn library room book record url
 * ? what the hell of the query params ??
 */
export const WebvpnLibraryRoomBookRecord = `${WEBVPN_LIBRARY_ROOM_BOOK_PREFIX}/ic-web/reserve/resvInfo?needStatus=8454&orderKey=gmt_create&orderModel=desc`

/**
 * webvpn library room cancel book url
 */
export const WebvpnLibraryRoomCancelBook = `${WEBVPN_LIBRARY_ROOM_BOOK_PREFIX}/ic-web/reserve/delete`

/**
 * webvpn library room update email url
 */
export const WebvpnLibraryRoomUpdateEmail = `${WEBVPN_LIBRARY_ROOM_BOOK_PREFIX}/ic-web/account/update`
// #endregion
