import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { prisma } from "../../data/postgres";
import { AuthDatasource, LoginUserDto, RegisterUserDto } from "../../domain";
import { UserEntity } from "../../domain/entities";


export class AuthDatasourceImpl implements AuthDatasource {

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

      const user = await prisma.user.findFirst({
        where: {email: registerUserDto.email}
      })
      if(user) throw `Email ${registerUserDto.email} already exists`

      const hashedPassword = bcryptAdapter.hash(registerUserDto.password)
      const newUser = await prisma.user.create({
        data: {...registerUserDto, password: hashedPassword}
      })
      
      return UserEntity.fromObject(newUser)
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    
    const user = await prisma.user.findFirst({
      where: {email: loginUserDto.email}
    })
    if(!user) throw `Email ${loginUserDto.email} not found`

    const isPasswordCorrect = bcryptAdapter.compare(loginUserDto.password, user.password)
    if(!isPasswordCorrect) throw 'Password incorrect'

    

    return UserEntity.fromObject(user)

  }

}