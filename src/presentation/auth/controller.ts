import { Request, Response } from "express";
import { AuthLogin, AuthRegister, AuthRepository, LoginUserDto, RegisterUserDto } from "../../domain";

export class AuthController {

  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  public register = (request: Request, response: Response) => {
    const [error, registerAuthDto] = RegisterUserDto.create(request.body)

    if(error) {
      response.status(400).json({error})
      return
    }
    
    new AuthRegister(this.authRepository)
      .execute(registerAuthDto!)
      .then(user => response.status(201).json(user))
      .catch(error => response.status(400).json({error}))
  }
  
  public login = (request: Request, response: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(request.body)
    if(error) {
      response.status(400).json({error})
      return
    }

    new AuthLogin(this.authRepository)
      .execute(loginUserDto!)
      .then(user => response.status(200).json(user))
      .catch(error => response.status(400).json({error}))
  }
}