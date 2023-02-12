import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = await this.controller.handle(httpRequest)
    // if (response.statusCode === 500) {
    //
    // }
    return response
    // return await new Promise(resolve => { resolve(null) })
    // const httpResponse = await this.controller.handle(httpRequest)
    // return httpResponse
  }
}
