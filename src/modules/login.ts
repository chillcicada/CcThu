import type { BaseResponse, UseConfig } from '@/types'
import { fetchWithRetry, setCookie } from '@/utils'
import { LearnAuth, Login } from '@/utils/urls'

/**
 * Login form parameters for query
 */
const LoginFormBody = {
  username: 'i_user',
  password: 'i_pass',
  atOnce: 'atOnce',
} as const

/**
 * Login configuration
 * @param username - The username to login
 * @param password - The password to login
 */
export interface LoginConfig {
  username: string
  password: string
}

/**
 * Login to the web learn
 * @param cfg - The login configuration {@link LoginConfig}
 *
 * @returns The response object as {@link BaseResponse}
 */
export default async function login(cfg: UseConfig<LoginConfig> = {}): Promise<BaseResponse> {
  try {
    /**
     * If the configuration is a promise, then wait for it to resolve
     */
    if (cfg instanceof Promise)
      cfg = await cfg

    if (!cfg.username || !cfg.password) {
      return {
        status: false,
        message: 'Username or password is empty',
      }
    }

    /**
     * Create a new form data and append the login credentials
     */
    const form = new FormData()

    form.append(LoginFormBody.username, cfg.username)
    form.append(LoginFormBody.password, cfg.password)
    form.append(LoginFormBody.atOnce, 'true')

    /**
     * Fetch the {@link Login} page and get the ticket
     *
     * @returns The ticket as string
     */
    const ticket = await fetchWithRetry(Login, {
      body: form,
      method: 'POST',
    }, { useCookie: false }).then((res) => {
      if (!res.ok)
        return Promise.reject(new Error('Failed to login'))

      return res.text()
    }).then((text) => {
      const ticket = text.match(/ticket=([^"]+)/)?.[1]

      if (!ticket || ticket === 'BAD_CREDENTIALS')
        return Promise.reject(new Error('Bad credentials'))

      return ticket
    })

    /**
     * Authenticate the {@link LearnAuth} with the ticket
     *
     * @returns The response object as {@link T}
     */
    const auth = await fetchWithRetry(LearnAuth(ticket), {}, { useCookie: false }).then((res) => {
      if (!res.ok)
        return Promise.reject(new Error('Failed to authenticate'))

      return res
    })

    const targetUrl = auth.url

    const jsessionid = targetUrl.match(/jsessionid=([^"]+)/)?.[1]

    const token = await fetchWithRetry(targetUrl, {}, { useCookie: false }).then((res) => {
      if (!res.ok)
        return Promise.reject(new Error('Failed to get course list page'))

      // ? maybe here can directly parse the token (maybe optimal)
      return res.headers.get('set-cookie')?.match(/XSRF-TOKEN=([^;]+)/)?.[1] || ''
    })

    const cookie = `JSESSIONID=${jsessionid}; XSRF-TOKEN=${token}`

    await setCookie(cookie)

    return {
      status: true,
      message: 'Login successfully',
    }
  }
  catch (e) {
    return {
      status: false,
      message: `Login failed, ${typeof e === 'string' ? e : 'unknown error'}`,
    }
  }
}

export { login }
