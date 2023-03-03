import { type Decrypter } from '../../criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { type AccountModel } from '../../../../domain/models/account'
import { type LoadAccountByTokenRepository } from '../account/load-account-by-token-repository'

interface SutTypes {
  decrypterStub: Decrypter
  sut: DbLoadAccountByToken
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})
const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise((resolve, reject) => { resolve('any_value') })
    }
  }

  return new DecrypterStub()
}
const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise((resolve, reject) => { resolve(makeFakeAccount()) })
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}
const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)

  return {
    decrypterStub,
    loadAccountByTokenRepositoryStub,
    sut
  }
}

describe('DbLoadAccountByToken', () => {
  test('Should call decrypter with correct values', async () => {
    const { decrypterStub, sut } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
  test('Should return null if decrypter return null', async () => {
    const { decrypterStub, sut } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt')
      // @ts-expect-error
      .mockReturnValueOnce(new Promise((resolve, reject) => { resolve(null) }))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })
  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    const loadByToken = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByToken).toHaveBeenCalledWith('any_token', 'any_role')
  })
  test('Should return null if LoadAccountByTokenRepository return null', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      // @ts-expect-error
      .mockReturnValueOnce(new Promise((resolve, reject) => { resolve(null) }))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })
})
