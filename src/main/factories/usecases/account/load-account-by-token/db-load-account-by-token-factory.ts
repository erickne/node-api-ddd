import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { type LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import { DbLoadAccountByToken } from '../../../../../data/protocols/db/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt/jwt-adapter'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
