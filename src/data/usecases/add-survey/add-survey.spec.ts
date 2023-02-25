import { DbAddSurvey } from './add-survey'
import { type AddSurveyModel } from '../../../domain/usecases/add-survey'
import { type AddSurveyRepository } from '../../protocols/db/survey/add-survey-repository'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ]
})

interface SutTypes {
  sut: AddSurveyRepository
}

// const makeSut = (): SutTypes => {
//
// }

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
        // @ts-expect-error
        await new Promise(resolve => { resolve() })
      }
    }

    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
