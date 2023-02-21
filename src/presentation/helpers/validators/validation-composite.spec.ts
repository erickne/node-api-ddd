import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import { type Validation } from './validation'

const makeSut = (validations: Validation[]): ValidationComposite => {
  return new ValidationComposite(validations)
}
describe('Validation Composite', () => {
  test('Should return return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }

    const validationStub = new ValidationStub()
    const sut = makeSut([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual((new MissingParamError('field')))
  })
})
