import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
