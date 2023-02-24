import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { type LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      // noinspection ES6MissingAwait
      void this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
