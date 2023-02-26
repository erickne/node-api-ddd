import { type Middleware } from '../protocols/middleware'
import { type HttpRequest, type HttpResponse } from '../protocols'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helpers'
import { type LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
