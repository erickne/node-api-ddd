import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { noContent, ok, serverError } from '../../../helpers/http/http-helpers'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
