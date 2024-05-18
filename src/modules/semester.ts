import type { BaseResponse } from '@/types'
import { fetchWithRetry } from '@/utils'
import { CurrentSemester } from '@/utils/urls'

export default async function getCurrentSemester(): Promise<BaseResponse> {
  try {
    const res = await fetchWithRetry(CurrentSemester).then(res => res.json()).catch(Promise.reject)

    if (!res || res.message !== 'success') {
      return {
        status: false,
        message: 'Failed to get current semester',
      }
    }

    return {
      status: true,
      message: 'success',
      data: res.data,
    }
  }
  catch (e) {
    return {
      status: false,
      message: `Failed to get current semester, ${typeof e === 'string' ? e : 'unknown error'}`,
    }
  }
}

export { getCurrentSemester }
