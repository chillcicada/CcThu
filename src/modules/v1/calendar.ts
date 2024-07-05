import type { BaseResponse, Calendar, DateLike, UseConfig } from '@/types'

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

    return {
      message: 'success',
      status: true,
    }
  }
  catch (e) {
    if (import.meta.env.NODE_ENV === 'development')
      console.error(e)

    return {
      message: 'error',
      status: false,
    }
  }
}

export { getCalendar }
