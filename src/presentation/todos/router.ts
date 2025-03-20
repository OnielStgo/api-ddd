import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastruture/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastruture";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class TodoRoutes {

  static get routes(): Router {
    const router = Router()
    
    const datasource = new TodoDatasourceImpl()
    const respository = new TodoRepositoryImpl(datasource)
    const controller = new TodosController(respository)

    router.get('/', AuthMiddleware.validateJWT, controller.getTodos)
    router.get('/:id', AuthMiddleware.validateJWT, controller.getTodo)
    router.post('/', AuthMiddleware.validateJWT, controller.createTodo)
    router.put('/:id', AuthMiddleware.validateJWT, controller.updateTodo)
    router.delete('/:id', AuthMiddleware.validateJWT, controller.deleteTodo)

    return router
  }  

}
