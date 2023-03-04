import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    // @ts-expect-error
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
