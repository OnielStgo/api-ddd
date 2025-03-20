import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto } from "../../domain";
import { UserEntity } from "../../domain/entities";


export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly authDatasource: AuthDatasource
  ) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto)
  }

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto)
  }

}