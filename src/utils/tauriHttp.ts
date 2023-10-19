/** 基于tauri的Http封装,响应接口Result化 */

import {http} from '@tauri-apps/api'
import {Default, Err, Ok, Option, Result, Some, match, option} from './mod'

declare class Response<T> {
  /** The request URL. */
  url: string
  /** The response status code. */
  status: number
  /** A boolean indicating whether the response was successful (status in the range 200–299) or not. */
  ok: boolean
  /** The response headers. */
  headers: Record<string, string>
  /** The response raw headers. */
  rawHeaders: Record<string, string[]>
  /** The response data. */
  data: T
}

type MethodType = 'POST' | 'GET' | 'PUT' | 'DELETE'
type ResponseType = 'json' | 'text' | 'binary'
type RequestType = 'json' | 'form' | 'binary'
type RequestDate = Record<any, any> | ArrayBuffer

/** 请求参数 */
interface RequestConfig {
  base_url?: string
  url: string
  method: MethodType
  data?: RequestDate
  headers?: Record<string, string>
  timeout?: number
  response_type?: ResponseType
  requeset_type?: RequestType
}

/** 响应参数 */
interface ResponseConfig<T> {
  data: T
  status: number
  message: string
}

/** 请求拦截 */
const request_interceptors = (conf: RequestConfig): Result<RequestConfig, InterceptorsError> => {
  if (conf.method === undefined) {
    return Err(new InterceptorsError('需要声明请求类型'))
  }
  return Ok(conf)
}

/** 响应拦截 */
const response_interceptors = <T>(
  response: Response<unknown>,
): Result<ResponseConfig<T>, HttpError | InterceptorsError> => {
  return response.ok
    ? Ok({
        status: response.status,
        message: 'success return',
        data: response.data as T,
      })
    : Err(new HttpError())
}

export const request = async <T>(
  config: RequestConfig,
): Promise<Result<ResponseConfig<T>, MethodError | HttpError | InterceptorsError>> => {
  const req_inter = request_interceptors(config)
  if (req_inter.is_err()) return req_inter as Result<never, InterceptorsError>
  const conf = req_inter.unwarp()
  const res = await http
    .fetch(conf.base_url ? conf.base_url + conf.url : conf.url, {
      method: conf.method,
      headers: conf.headers,
      timeout: conf.timeout,
      responseType: match(
        conf.response_type,
        ['json', 1],
        ['text', 2],
        ['binary', 3],
        [Default, 1],
      ) as number,
      body: (
        match(
          conf.requeset_type,
          ['json', () => http.Body.json(conf.data as Record<any, any>)],
          ['binary', () => http.Body.bytes(conf.data as ArrayBuffer)],
          ['form', () => http.Body.form(conf.data as Record<any, any>)],
          [Default, () => undefined],
        ) as Function
      )(),
    })
    .then((re) => response_interceptors<T>(re)) //请求没问题但是需要自己定义处理逻辑的情况
    .catch((err) => Err(new MethodError(err))) //请求有问题的情况
  return res
}

/** 方法本身造成的错误 */
class MethodError extends Error {
  constructor(msg: string = 'Method Error') {
    super(msg)
  }
}

/** http状态码不是正常的状态码 */
class HttpError extends Error {
  constructor(status: number = 500, msg: string = 'Http Error') {
    super(
      JSON.stringify({
        status,
        msg,
      }),
    )
  }
}

/** 拦截器拦截 */
class InterceptorsError extends Error {
  constructor(msg: string = 'Interceptor to do') {
    super(msg)
  }
}
