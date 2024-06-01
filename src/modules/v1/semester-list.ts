import { SemesterList } from '@/urls/learn'
import type { BaseResponse } from '@/types'
import { fetchWithRetry } from '@/utils'

interface T {
  SemesterIdLists: string[]
}

/**
 * Get the list of semester IDs
 *
 * @returns The response object as {@link T} wrapped in {@link BaseResponse}
 */
export default async function getSemesterIdList(): Promise<BaseResponse<T>> {
  try {
    const data = await fetchWithRetry(SemesterList).then((res) => {
      if (!res.ok)
        return Promise.reject(new Error('Failed to fetch'))

      return res.json()
    })

    return {
      status: true,
      message: 'Get semester ID list successfully',
      data,
    }
  }
  catch (e) {
    return {
      status: false,
      message: typeof e === 'string' ? e : 'Unknown error',
    }
  }
}

export { getSemesterIdList }
