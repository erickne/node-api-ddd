import { type LoadAccountByToken } from '../../../../domain/usecases/load-account-by-token'
import { type AccountModel } from '../../../../domain/models/account'
import { type Decrypter } from '../../criptography/decrypter'
import { type LoadAccountByTokenRepository } from '../account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) return account
    }
    // @ts-expect-error
    return await new Promise((resolve, reject) => { resolve(null) })
  }
}
