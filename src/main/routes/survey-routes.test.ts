import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection = Collection
let accountCollection = Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    // @ts-expect-error error no typescript
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 403 on add survey without token', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'https://image.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })
    test('Should return 200 on admin add survey ', async () => {
      const res = await accountCollection.insertOne({
        name: 'erick',
        email: 'erick@teste.com',
        password: 'any_password',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'https://image.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
    test('Should return 403 on not admin add survey ', async () => {
      const res = await accountCollection.insertOne({
        name: 'erick',
        email: 'erick@teste.com',
        password: 'any_password',
        role: 'user'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'https://image.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })
  })
})
