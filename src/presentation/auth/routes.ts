import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl } from "../../infrastruture/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastruture";

export class AuthRoutes {

  static get routes(): Router {
    const router = Router()
    
    const authDatasource = new AuthDatasourceImpl
    const authRepository = new AuthRepositoryImpl(authDatasource)
    const authController = new AuthController(authRepository)

    router.post('/register', authController.register)
    router.post('/login', authController.login)

    return router
  }
}