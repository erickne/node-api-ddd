import { type Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  // @ts-expect-error
  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
