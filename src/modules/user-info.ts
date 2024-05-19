import type { BaseResponse, IdentityType, UseConfig } from '@/types'
import { $, fetchWithRetry } from '@/utils'
import { HomePage } from '@/utils/urls'

interface T {
  name: string
  department: string
}

/**
 * Configuration for getting user's name and department
 */
export interface UserInfoConfig {
  identityType: IdentityType
}

/**
 * get user's name and department
 * @param cfg - The configuration {@link UserInfoConfig}
 *
 * @returns user's name and department as {@link T} wrapped in {@link BaseResponse}
 */
export default async function getUserInfo(cfg: UseConfig<UserInfoConfig> = {}): Promise<BaseResponse<T>> {
  try {
    if (cfg instanceof Promise)
      cfg = await cfg

    const { identityType } = cfg

    const res = await fetchWithRetry(HomePage(identityType)).then((res) => {
      if (!res.ok)
        return Promise.reject(new Error('Failed to fetch'))

      return res.text()
    })

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
