import type { UrlLike, UseConfig } from '@/types'
import { CommonUrls } from '@/urls'

export interface pingOptions {
  timeout: number
}

export async function ping(url: UrlLike, cfg: UseConfig<pingOptions> = {}) {
  if (cfg instanceof Promise)
    cfg = await cfg
}

export interface getStatusOptions {
  default: pingOptions
  [key: string]: pingOptions
}

export default async function getStatus(cfg: UseConfig<getStatusOptions> = {}) {
  if (cfg instanceof Promise)
    cfg = await cfg

  for (const url in CommonUrls) {
    if (!(url.startsWith('WEBVPN')))
      // eslint-disable-next-line no-console
      console.log(url)
  }
}

export { getStatus }
