import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { AuthRepository } from "../../repositories";

export interface UserLogged {
  id: number;
  name: string;
  email: string,
}


export interface AuthLoginUseCase {
  execute(loginUserDto: LoginUserDto): Promise<{token: string, user: UserLogged}>
}

export class AuthLogin implements AuthLoginUseCase {

  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<{token: any, user: UserLogged}> {
    
    const {password, ...userWithOutPassword} = await  this.authRepository.login(loginUserDto)

    const token = await JwtAdapter.generateToken({id: userWithOutPassword.id})
    // console.log({token})
    
    return {
      token: token,
      user: userWithOutPassword
    }
  }

}