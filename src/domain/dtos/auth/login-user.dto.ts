import { regularExps } from "../../../config/regular-exp"

export class LoginUserDto {

  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, LoginUserDto?] {
    const { email, password } = object

    if(!email) return ['Property email is required', undefined]
    if(!regularExps.email.test(email)) return ['Property email not valid', undefined]
    if(!password) return ['Property password is required', undefined]
    if(password.length < 8) return ['Property password is too short', undefined]

    return[undefined, new LoginUserDto(email, password)]
  }
}