import { type LoadSurveys } from '../../../domain/usecases/load-surveys'
import { type SurveyModel } from '../../../domain/models/survey'
import { type LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    // @ts-expect-error
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
