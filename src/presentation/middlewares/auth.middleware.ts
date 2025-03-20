import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthMiddleware {

  static async validateJWT(request: Request, response: Response, next: NextFunction) {

    const authorization = request.headers['authorization']

    if (!authorization) {
      response.status(401).json({error: 'Not token provided'})
      return
    }
    if (!authorization.startsWith('Bearer ')) {
      response.status(401).json({error: 'Invalid Bearer token'})
    }
    
    const token = authorization.split(' ').at(1) || ''

    try {
      const payload = await JwtAdapter.validateToken<{id: string}>(token)
      if(!payload)  {
        response.status(401).json({error: 'Invalid token'})
        return
      }
            
      next()
      
    } catch (error) {
      console.log(error)
      response.status(500).json({error: 'Internal server error'})
    }
  }
}