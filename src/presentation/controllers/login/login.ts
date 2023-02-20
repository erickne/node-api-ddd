import {
  type Authentication,
  type Controller,
  type EmailValidator,
  type HttpRequest,
  type HttpResponse
} from './login-protocols'
import { badRequest, ok, serverError, unauthorizedError } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorizedError()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
