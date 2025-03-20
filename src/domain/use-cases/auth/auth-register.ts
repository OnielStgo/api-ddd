import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { AuthRepository } from "../../repositories";

export interface UserRegistered {
  id: number;
  name: string;
  email: string,
}

export interface AuthRegisterUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserRegistered>
}

export class AuthRegister implements AuthRegisterUseCase {

  constructor(
    private readonly authRepository: AuthRepository
  ) {}
  
  async execute(registerUserDto: RegisterUserDto): Promise<UserRegistered> {
    const {password, ...userWithOutPassword} = await  this.authRepository.register(registerUserDto)
    return userWithOutPassword
  }

}