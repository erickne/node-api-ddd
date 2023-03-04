import { type SurveyModel } from '../../../../domain/models/survey'

export interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
