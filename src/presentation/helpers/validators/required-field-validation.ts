import { type Validation } from '../../protocols/validation'
import { MissingParamError } from '../../errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  // @ts-expect-error
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
