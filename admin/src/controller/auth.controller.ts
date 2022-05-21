import { Request, Response } from 'express'
import { RegisterValidation } from '../validation/register.validation'
import { AppDataSource } from '../../data-source'
import { User } from '../entity/user.entity'
import bcryptjs from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export const Register = async (req: Request, res: Response) => {
  const body = req.body

  const { error } = RegisterValidation.validate(body)

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    })
  }

  if (body.password !== body.password_confirmation) { 
    return res.status(400).json({
      success: false,
      error: 'Password and password confirmation do not match'
    })
  }

  const repository = AppDataSource.getRepository(User)
  // const repository = getManager().getRepository(User) //deprecated

  const { password, ...user } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10),
    role_id: body.role_id
  })

  res.send(user)
}

// Repository https://typeorm.io/readme#using-repositories
// Process env https://stackoverflow.com/questions/58673430/error-secretorprivatekey-must-have-a-value

export const Login = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(User)

  const user = await repository.findOne({
    relations: ['role'],
    where: {
      email: req.body.email,
    }
  })

  if (!user) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email or password'
    })
  }
  if (!await bcryptjs.compare(req.body.password, user.password)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email or password'
    })
  }
    
  if(!user.hasOwnProperty('role') || user.role === null) {
    return res.status(400).json({
      success: false,
      error: 'Your account is not activated yet. Please contact admin for activation.'
    })
  }

  const token = sign({ id: user.id }, `${process.env.SECRET_KEY}`)
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  })
  // res.send({ message: 'Logged in successfully' })
  res.send(user)
}

export const Authenticate = async (req: Request, res: Response) => {
  const { password, ...user } = req['user']
  res.send(user)
}

export const Logout = async (req: Request, res: Response) => { 
  res.cookie('token', '', { maxAge: 0 })
  res.send({
    message: 'Logged out successfully'
  })
}

export const UpdateInfo = async (req: Request, res: Response) => {              
  const user = req['user']
  const repository = AppDataSource.getRepository(User)
  
  const { password, ...data } = await repository.findOneBy({ id: user.id, })

  await repository.update(user.id, req.body)
  
  res.send(data)
}

export const UpdatePassword = async (req: Request, res: Response) => { 
  const user = req['user']
  
  if (!await bcryptjs.compare(req.body.old_password, user.password)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid old password'
    })
  }
  
  if (req.body.password !== req.body.password_confirmation) {
    return res.status(400).json({
      success: false,
      error: 'New password and password confirmation do not match'
    })
  }
  
  const repository = AppDataSource.getRepository(User)
  await repository.update(user.id, {
    password: await bcryptjs.hash(req.body.password, 10)
  })
  
  const { password, ...userData } = user
  res.send(userData)
}