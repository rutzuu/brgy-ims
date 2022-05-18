import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppDataSource } from '../../data-source'
import { User } from '../entity/user.entity'

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => { 
  try {
    const token = req.cookies['token']

    const payload: any = verify(token, `${process.env.SECRET_KEY}`)

    if (!payload) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      })
    }

    const repository = AppDataSource.getRepository(User)

    req['user'] = await repository.findOne({
      relations: { role: { permissions: true } },
      where: { id: payload.id },
    })

    next()

  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    })
  }
}