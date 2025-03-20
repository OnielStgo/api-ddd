import { CreateTodoDto, UptateTodoDto } from "../dtos";
import { TodoEntity } from "../entities";

export abstract class TodoDatasource {

  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>
  abstract getAll(): Promise<TodoEntity[]>
  abstract getById(id: number): Promise<TodoEntity>
  abstract update(uptateTodoDto: UptateTodoDto): Promise<TodoEntity>
  abstract deleteById(id: number): Promise<TodoEntity>
}