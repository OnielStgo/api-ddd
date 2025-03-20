import { Router } from "express"
import { TodoRoutes } from "./todos/router"
import { AuthRoutes } from "./auth/routes"

export class Routes {

  static get routes(): Router {    
    const router = Router()

    router.use('/api/v1/todo', TodoRoutes.routes)
    router.use('/api/v1/auth', AuthRoutes.routes)

    return router
  }
}