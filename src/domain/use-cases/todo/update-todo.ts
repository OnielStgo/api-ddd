import { UptateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories";


export interface UpdateTodoUseCase {
  execute(updateTodoDto: UptateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
  
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  execute(updateTodoDto: UptateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.update(updateTodoDto)
  }

}