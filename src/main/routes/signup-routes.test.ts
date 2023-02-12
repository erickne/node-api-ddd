import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    // @ts-expect-error error no typescript
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    accountCollection.deleteMany({})
  })

  test('Should return and account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'erick',
        email: 'erick@teste.com',
        password: 'erick123',
        passwordConfirmation: 'erick123'
      })
      .expect(200)
  })
})
