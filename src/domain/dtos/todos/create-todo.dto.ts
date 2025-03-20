
export class CreateTodoDto {

  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly completed: boolean
  ) {}

  static create(object: {[key: string]: any}): [string?, CreateTodoDto?] {
    const { title, description, completed } = object

    if(!title || title.length === 0) return ['Missing property title', undefined]
    if(!description || title.length === 0) return ['Missing property description', undefined]
    if(typeof completed !== 'boolean') return ['Missing property completed or its value is incorrect', undefined]

    return [undefined, new CreateTodoDto(title, description, completed)]
  }

}