import type { BaseResponse, Calendar, DateLike, UseConfig } from '@/types'
import { fetchWithRetry, useError } from '@/utils'

interface T {
  Calendar: Calendar[]
}

export interface CalendarConfig {
  startDate: DateLike
  endDate: DateLike
  graduate: boolean
}

export default async function getCalendar(cfg: UseConfig<CalendarConfig> = {}): Promise<BaseResponse<T>> {
  try {
    if (cfg instanceof Promise)
      cfg = await cfg

    // TODO
    // const {
    //   startDate = new Date(),
    //   endDate,
    //   graduate,
    // } = cfg

    const res = await fetchWithRetry('https://api.hanyang.ac.kr/v1/calendar', {}).then(res => res.json())

    return {
      message: 'success',
      data: res,
      status: true,
    }
  }
  catch (e) { return useError(e, 'Fail to get calendar!') }
}

export { getCalendar }
