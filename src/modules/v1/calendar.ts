import type { BaseResponse, Calendar, UseConfig } from '@/types'

interface T {
  Calendar: Calendar[]
}

export interface CalendarConfig {
  startDate: string | Date
  endDate: string | Date
  graduate: boolean
}

export default async function getCalendar(cfg: UseConfig<CalendarConfig> = {}): Promise<BaseResponse<T>> {
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
    if (import.meta.env.NODE_ENV === 'development')
      console.error(e)

    return {
      message: 'error',
      status: false,
    }
  }
}

export { getCalendar }
