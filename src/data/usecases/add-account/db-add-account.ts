import {
  type AccountModel,
  type AddAccount,
  type AddAccountModel,
  type AddAccountRepository,
  type Hasher
} from './db-add-account-protocols'
import { type LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.encrypter.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign(accountData, { password: hashedPassword }))
      return newAccount
    }
    // @ts-expect-error
    return null
  }
}
