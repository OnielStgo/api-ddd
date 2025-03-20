
export class TodoEntity {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public completed: boolean
  ){}

  get isCompleted() {
    return this.completed
  }
 
  public static fromObject(object: {[key: string]: any}): TodoEntity {
    const { id, title, description, completed } = object

    if(!id) throw new Error('Missing id property')
    if(!title) throw new Error('Missing title property')
    if(!description) throw new Error('Missing description property')
    if(typeof completed !== 'boolean') throw new Error('Missing completed property')

    return new TodoEntity(id, title, description, completed)     
  }
}