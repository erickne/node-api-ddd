import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
