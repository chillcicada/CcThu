import { Logout } from '@/urls/learn'
import type { BaseResponse } from '@/types'
import { fetchWithRetry, rmCookie, useError, useFail } from '@/utils'

const LogoutError = 'Fail to logout!'

/**
 * Logout from the web learn
 *
 * @returns The response object as {@link BaseResponse}
 */
export default async function logout(): Promise<BaseResponse> {
  try {
    const res = await fetchWithRetry(Logout, { method: 'POST' })

    if (res.ok) {
      await rmCookie()
      return {
        status: res.ok,
        message: 'Logout successfully',
      }
    }

    return useFail(LogoutError)
  }
  catch (e) { return useError(e, LogoutError) }
}

export { logout }
