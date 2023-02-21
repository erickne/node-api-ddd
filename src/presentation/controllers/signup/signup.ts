import {
  type AddAccount,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type Validation
} from './signup-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

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
