
export class UserEntity {

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static fromObject (object: {[key: string]: any}): UserEntity {
    const { id, name, email, password } = object

    if(!id) throw 'Missing id property'
    if(!name) throw 'Missing name property'
    if(!email) throw 'Missing email property'
    if(!password) throw 'Missing password property'

    return new UserEntity(id, name, email, password)
  }

}
