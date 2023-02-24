import { type Router } from 'express'
import { adaptRoute } from '../adapters/express/express-routes-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSignUpController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', adaptRoute(makeLoginController()))
}
