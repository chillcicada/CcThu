import { WEBVPN_NETWORK_PREFIX } from './common'

export const NETWORK_DETAIL_URL = `${WEBVPN_NETWORK_PREFIX}/user_detail_statistics.php?action=query`
export const NETWORK_IMPORT_USER = `${WEBVPN_NETWORK_PREFIX}/import_online_user.php`
export const NETWORK_IMPORT_IP = `${WEBVPN_NETWORK_PREFIX}/ip_login_import.php`
export const NETWORK_IMPORT_CHALLENGE = `https://webvpn.tsinghua.edu.cn/https/77726476706e69737468656265737421f1e25594737e7c4377068ea48d546d30da79d227b1/cgi-bin/get_challenge?callback=m&username={username}&ip={ip}`
export const NETWORK_IMPORT_LOGIN = `https://webvpn.tsinghua.edu.cn/https/77726476706e69737468656265737421f1e25594737e7c4377068ea48d546d30da79d227b1/cgi-bin/srun_portal?callback=m&action=login&username={username}&password=%7BMD5%7D{pass_md5}&ac_id={nas_id}&ip={ip}&info={info}&chksum={checksum}&n=200&type=1`
export const NETWORK_1X_USER = `${WEBVPN_NETWORK_PREFIX}/1x_online_user.php`
export const NETWORK_USER_INFO = `${WEBVPN_NETWORK_PREFIX}/user_info.php`
