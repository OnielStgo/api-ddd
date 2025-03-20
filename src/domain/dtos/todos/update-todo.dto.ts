
export class UptateTodoDto {

  private constructor(
    public readonly id: number,
    public readonly title?: string,
    public readonly description?: string,
    public readonly completed?: boolean
  ) {}

  get values() {
    const returnObj: {[key: string]: any} = {}
    if(this.title) returnObj.title = this.title
    if(this.description) returnObj.description = this.description
    if(typeof this.completed === 'boolean') returnObj.completed = this.completed

    return returnObj
  }

  static create(object: {[key: string]: any}): [string?, UptateTodoDto?] {
    const { id, title, description, completed } = object

    if(!id || isNaN(Number(id)) || Number(id) <= 0 || !Number.isInteger(Number(id))) {
      return ['Id must be a positive integer', undefined];
    }

    return [undefined, new UptateTodoDto(id, title, description, completed)]
  }
}