
import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UptateTodoDto } from "../../domain";



export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly datasource: TodoDatasource
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  getById(id: number): Promise<TodoEntity> {
    return this.datasource.getById(id);
  }

  update(uptateTodoDto: UptateTodoDto): Promise<TodoEntity> {
    return this.datasource.update(uptateTodoDto);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
  
}