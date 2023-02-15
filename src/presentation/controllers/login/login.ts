import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helpers'
import { MissingParamError } from '../../errors'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
  }
}
