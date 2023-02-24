import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection = Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    // @ts-expect-error error no typescript
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('erick123', 12)
      await accountCollection.insertOne({
        name: 'erick',
        email: 'erick@teste.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'erick@teste.com',
          password: 'erick123'
        })
        .expect(200)
    })
  })
})
