import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { type AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    console.log(result.ops[0])
    const { _id, ...accountWithoutId } = result.ops[0]
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
