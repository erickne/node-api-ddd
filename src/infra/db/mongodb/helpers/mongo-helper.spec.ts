import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    // @ts-expect-error MONGO URL
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconnect if mongo db is down', async () => {
    let accountConnection = await sut.getCollection('accounts')
    expect(accountConnection).toBeTruthy()
    await sut.disconnect()
    accountConnection = await sut.getCollection('accounts')
    expect(accountConnection).toBeTruthy()
  })
})
