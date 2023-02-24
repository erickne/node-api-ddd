import {
  type AccountModel,
  type AddAccount,
  type AddAccountModel,
  type AddAccountRepository,
  type Hasher
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign(accountData, { password: hashedPassword }))
    return account
  }
}
