// interface SutTypes {
//   sut: AddSurv
// }
// const sut = (): SutType => {
//
// }
// const makeSut = ():SutTypes  => {
//
//   return {
//
//   }
// }

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

describe('AddSurvey Controller', () => {
  test('Should call validation with correct value', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        // @ts-expect-error
        return null
      }
    }

    const validationStub = new ValidationStub()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddSurveyController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
