import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase {
  
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  execute(id: number): Promise<TodoEntity> {
    return this.todoRepository.getById(id)
  }

}