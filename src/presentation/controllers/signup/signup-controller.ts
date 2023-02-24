import {
  type AddAccount,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type Validation
} from './signup-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helpers'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, password, email } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
