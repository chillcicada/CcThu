import { SemesterList } from '@/utils/urls'
import type { BaseResponse, MaybeArray } from '@/types'
import { fetchWithRetry } from '@/utils'

interface T {
  SemesterIdLists: MaybeArray<string>
}

/**
 * Get the list of semester IDs
 *
 * @returns The response object as {@link T} wrapped in {@link BaseResponse}
 */
export default async function getSemesterIdList(): Promise<BaseResponse<T>> {
  try {
    const res = await fetchWithRetry(SemesterList, {}, { fetchImpl: fetch })

    if (!res) {
      return {
        status: false,
        message: 'Failed to fetch',
      }
    }

    return {
      status: true,
      message: 'Get semester ID list successfully',
      data: await res.json(),
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
