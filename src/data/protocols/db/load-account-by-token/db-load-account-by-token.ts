import { type LoadAccountByToken } from '../../../../domain/usecases/load-account-by-token'
import { type AccountModel } from '../../../../domain/models/account'
import { type Decrypter } from '../../criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    // @ts-expect-error
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
