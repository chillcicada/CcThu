import { CARD_PREFIX } from './common'

export const CARD_I_VERSION_URL = `https://webvpn.tsinghua.edu.cn/http/77726476706e69737468656265737421f1e751d2242326446d0187ab9040227b239c069338e2/api/CardIVersion`

export const CARD_USER_BY_TOKEN_URL = `${CARD_PREFIX}/login/getUserInfoFromToken`
export const CARD_INFO_BY_USER_URL = `${CARD_PREFIX}/business/getCardUserinfo`
export const CARD_PHOTO_URL = `${CARD_PREFIX}/myaccount/showDbImage?idserial=`
export const CARD_TRANSACTION_URL = `${CARD_PREFIX}/business/querySelfTradeList`
export const CARD_CHANGE_PWD_URL = `${CARD_PREFIX}/business/modifyPwdByPhoneVerify`
export const CARD_MOD_MAX_CONSUME_URL = `${CARD_PREFIX}/business/modifyCardMaxConsamt`
export const CARD_REPORT_LOSS_URL = `${CARD_PREFIX}/business/cardReportLoss`
export const CARD_CANCEL_LOSS_URL = `${CARD_PREFIX}/business/solutionHang`
export const CARD_RECHARGE_FROM_BANK_URL = `${CARD_PREFIX}/business/moblieRecharge`
export const CARD_RECHARGE_FROM_WECHAT_URL = `${CARD_PREFIX}/wx/rechard/getRechargeHtml`
export const CARD_RECHARGE_FROM_ALIPAY_URL = `${CARD_PREFIX}/wx/rechard/qrcode`
