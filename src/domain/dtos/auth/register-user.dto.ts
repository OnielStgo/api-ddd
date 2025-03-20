import { regularExps } from "../../../config/regular-exp"

export class RegisterUserDto {

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {
    const { name, email, password } = object

    if(!name) return ['Property name is required', undefined]
    if(!email) return ['Property email is required', undefined]
    if(!regularExps.email.test(email)) return ['Property email not valid', undefined]
    if(!password) return ['Property password is required', undefined]
    if(password.length < 8) return ['Property password is too short']

    return [undefined, new RegisterUserDto(name, email, password)]
  }
}