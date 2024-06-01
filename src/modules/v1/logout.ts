import { Logout } from '@/urls/learn'
import type { BaseResponse } from '@/types'
import { fetchWithRetry, rmCookie } from '@/utils'

/**
 * Logout from the web learn
 *
 * @returns The response object as {@link BaseResponse}
 */
export default async function logout(): Promise<BaseResponse> {
  try {
    const res = await fetchWithRetry(Logout, { method: 'POST' })

    if (res.ok)
      await rmCookie()

    return {
      status: res.ok,
      message: res.ok ? 'Logout Successfully' : 'Failed to logout',
    }
  }
  catch (e) {
    return {
      status: false,
      message: `Logout failed, ${typeof e === 'string' ? e : 'unknown error'}`,
    }
  }
}

export { logout }
