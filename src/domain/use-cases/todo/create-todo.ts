import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories";


export interface CreateTodoUseCase {
  execute(createTodoDto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
  
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  execute(createTodoDto: CreateTodoDto): Promise<TodoEntity> {    
    return this.todoRepository.create(createTodoDto)    
  }

}