import { Request, Response } from "express";
import { CreateTodo, CreateTodoDto, CustomError, DeleteTodo, GetTodo, GetTodos, TodoEntity, TodoRepository, UpdateTodo, UptateTodoDto } from "../../domain";

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  private handleError = (response: Response, error: unknown) => {

    if (error instanceof CustomError) {
      response.status(error.statusCode).json({error: error.message})
      return
    }
    response.status(500).json({error: 'Internal Server Error - Check logs'})
  }

  public createTodo = (request: Request, response: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(request.body);
    if(error) {
      response.status(400).json({error});
      return
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then(todo => response.status(201).json(todo))
      .catch(error => this.handleError(response, error));
  }

  public updateTodo = (request: Request, response: Response) => {
    const id = +request.params.id
    const [error, updateTodoDto] = UptateTodoDto.create({...request.body, id})
    if(error) {
      response.status(400).json({error})
      return
    } 

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then(todo => response.json(todo))
      .catch(error => this.handleError(response, error));
  }

  public getTodos = (request: Request, response: Response) => {

    new GetTodos(this.todoRepository)
      .execute()
      .then(todos => {
        return response.json(todos)
      })
      .catch(error => this.handleError(response, error));
  }

  public getTodo = (request: Request, response: Response) => {
    const id = +request.params.id

    new GetTodo(this.todoRepository)
      .execute(id)
      .then(todo => response.json(todo))
      .catch(error => this.handleError(response, error));
  }

  public deleteTodo = (request: Request, response: Response) => {
    const id = +request.params.id
    
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then(todo => response.json(todo))
      .catch(error => this.handleError(response, error));
  }
}