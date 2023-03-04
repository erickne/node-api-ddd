import { type AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { type AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import {
  type LoadAccountByEmailRepository
} from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { type UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import {
  type LoadAccountByTokenRepository
} from '../../../../data/protocols/db/account/load-account-by-token-repository'

export class AccountMongoRepository implements AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ email })
    return result ? MongoHelper.map(result) : null
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return result ? MongoHelper.map(result) : null
  }
}
