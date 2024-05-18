import { $, fetchWithRetry } from '@/utils/common'
import { HomePage } from '@/utils/urls'
import type { BaseResponse, IdentityType } from '@/types'

interface T {
  name: string
  department: string
}

/**
 * get user's name and department
 * @param identityType - {@link IdentityType}
 *
 * @returns user's name and department as {@link T} wrapped in {@link BaseResponse}
 */
export default async function getUserInfo(identityType?: IdentityType): Promise<BaseResponse<Partial<T>>> {
  try {
    const res = await fetchWithRetry(HomePage(identityType)).then((res) => {
      if (!res.ok)
        return Promise.reject(new Error('Failed to fetch'))

      return res.text()
    }).catch(Promise.reject)

    const dom = $(res)

    const name = dom('a.user-log')?.text().trim() || ''
    const department = dom('.fl.up-img-info p:nth-child(2) label')?.text().trim() || ''

    if (!name || !department) {
      return {
        status: false,
        message: 'Failed to get user info',
      }
    }

    return {
      status: true,
      data: { name, department },
      message: 'Get user info successfully',
    }
  }
  catch (e) {
    return {
      status: false,
      message: typeof e === 'string' ? e : 'Unknown error',
    }
  }
}

export { getUserInfo }
