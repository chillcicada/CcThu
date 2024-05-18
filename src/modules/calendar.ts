import type { BaseResponse, Calendar, MaybeArray, MaybePromise } from '@/types'

interface T {
  Calendar: MaybeArray<Calendar>
}

interface getCalendarConfig {
  startDate: string | Date
  endDate: string | Date
  graduate: boolean
}

export default async function getCalendar(cfg: MaybePromise<Partial<getCalendarConfig>> = {}): Promise<BaseResponse<T>> {
  try {
    if (cfg instanceof Promise)
      cfg = await cfg

    // TODO

    return {
      message: 'success',
      status: true,
    }
  }
  catch (e) {
    return {
      message: 'error',
      status: false,
    }
  }
}

export { getCalendar }
