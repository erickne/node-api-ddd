import { type SurveyModel } from '../../../../domain/models/survey'
import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { LoadSurveysController } from './load-surveys-controller'
import MockDate from 'mockdate'
import { ok, serverError } from '../../../helpers/http/http-helpers'

interface SutTypes {
  loadSurveyStub: LoadSurveys
  sut: LoadSurveysController
}

const makeLoadSurveyStub = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(makeFakeSurvey()) })
    }
  }

  return new LoadSurveyStub()
}
const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveyStub()
  const sut = new LoadSurveysController(loadSurveyStub)
  return {
    loadSurveyStub,
    sut
  }
}
const makeFakeSurvey = (): Array<{ date: Date, question: string, answers: Array<{ image: string, answer: string }>, id: string }> => {
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

describe('LoadSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveyStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
  test('Should return a 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurvey()))
  })

  test('Should throw if LoadSurveyStub throws', async () => {
    const { sut, loadSurveyStub } = makeSut()
    jest.spyOn(loadSurveyStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const httpPromise = await sut.handle({})
    expect(httpPromise).toEqual(serverError(new Error()))
  })
})
