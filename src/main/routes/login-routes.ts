import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeSignUpController } from '../factories/controllers/auth/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/auth/login/login-controller-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSignUpController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', adaptRoute(makeLoginController()))
}
