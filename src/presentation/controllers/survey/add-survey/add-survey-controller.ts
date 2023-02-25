import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { type Validation } from '../../../protocols/validation'

export class AddSurveyController implements Controller {
  // private readonly varName: number

  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    // @ts-expect-error
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
