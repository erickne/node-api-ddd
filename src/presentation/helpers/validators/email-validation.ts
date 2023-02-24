import { type Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'
import { type EmailValidator } from '../../protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  // @ts-expect-error
  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
