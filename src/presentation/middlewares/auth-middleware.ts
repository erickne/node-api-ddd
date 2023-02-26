import { type Middleware } from '../protocols/middleware'
import { type HttpRequest, type HttpResponse } from '../protocols'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helpers'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
    // return await new Promise((resolve, reject) => { resolve(null) })
  }
}
