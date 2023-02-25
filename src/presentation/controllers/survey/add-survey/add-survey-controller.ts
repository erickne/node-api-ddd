import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { type Validation } from '../../../protocols/validation'
import { badRequest } from '../../../helpers/http/http-helpers'
import { type AddSurvey } from '../../../../domain/usecases/add-survey'

export class AddSurveyController implements Controller {
  // private readonly varName: number

  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { question, answers } = httpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })
    // @ts-expect-error
    return null
  }
}
