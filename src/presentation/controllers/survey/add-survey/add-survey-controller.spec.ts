import { type HttpRequest } from '../../../protocols'
import { AddSurveyController } from './add-survey-controller'
import { type Validation } from '../../../protocols/validation'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
})

interface SutTypes {
  sut: AddSurveyController
  validationStub: Validation
}

class ValidationStub implements Validation {
  validate (input: any): Error {
    // @ts-expect-error
    return null
  }
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new AddSurveyController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddSurvey Controller', () => {
  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
