import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { type Validation } from '../../../protocols/validation'
import { badRequest } from '../../../helpers/http/http-helpers'

export class AddSurveyController implements Controller {
  // private readonly varName: number

  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    // @ts-expect-error
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
