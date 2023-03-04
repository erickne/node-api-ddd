import { type LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { type SurveyModel } from '../../../domain/models/survey'
import { DbLoadSurveys } from './db-load-surveys'

interface SutTypes {
  loadSurveysRepositoryStub: LoadSurveysRepository
  sut: DbLoadSurveys
}

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise((resolve, reject) => { resolve(makeFakeSurveys()) })
    }
  }

  return new LoadSurveysRepositoryStub()
}
const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}
const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{ image: 'any_image', answer: 'any_answer' }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{ image: 'other_image', answer: 'other_answer' }],
    date: new Date()
  }]
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Should a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })
  test('Should throw if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
