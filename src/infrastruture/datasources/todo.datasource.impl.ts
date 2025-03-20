import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UptateTodoDto } from "../../domain";


export class TodoDatasourceImpl implements TodoDatasource {

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto
    })
    
    return TodoEntity.fromObject(todo)
  }
  
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany()
    return todos.map(todo => TodoEntity.fromObject(todo))
  }
  
  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {id}
    })
    if(!todo) throw CustomError.notFound(`Todo with id ${id} not found`) 

    return TodoEntity.fromObject(todo)
  }
  
  async update(uptateTodoDto: UptateTodoDto): Promise<TodoEntity> {
    await this.getById(uptateTodoDto.id)

    const updateTodo = await prisma.todo.update({
      where:{id: uptateTodoDto.id},
      data: uptateTodoDto.values
    })

    return TodoEntity.fromObject(updateTodo)
  }
  
  async deleteById(id: number): Promise<TodoEntity> {
    await this.getById(id)

    const deletedTodo = await prisma.todo.delete({
      where: {id}
    })

    return TodoEntity.fromObject(deletedTodo)
  }
  

}