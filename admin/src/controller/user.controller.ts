import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { User } from '../entity/user.entity'
import bcryptjs from 'bcryptjs'

export const Users = async (req: Request, res: Response) => { 
  const take = 10
  const page = parseInt(req.query.page as string || '1')

  const repository = AppDataSource.getRepository(User)

  const [data, total] = await repository.findAndCount({
    relations: ['role'],
    take: take,
    skip: (page - 1) * take
  })

  res.send({
      data: data.map(user => {
        const { password, ...data } = user

        return data
      }),
      meta: {
        total,
        page, 
        last_page: Math.ceil(total / take)
      }
    }
  )
}

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body
  const hashedPassword = await bcryptjs.hash('1234', 10)

  const repository = AppDataSource.getRepository(User)

  const { password, ...userData } = await repository.save({
    ...body,
    password: hashedPassword,
    role: {
      id: role_id
    }
  })

  res.status(201).send(userData)
}

export const GetUser = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(User)
  const id = parseInt(req.params.id)

  //Find relations with params using .find
  //https://typeorm.io/find-options#basic-options
  const {password, ...userData}  = await repository.findOne({
    // id: id
    relations: ['role'],
    where: {
      id: id,
    }
  })
  
  res.send(userData)
  // res.send(userData.map(user => {
  //   const { password, ...userData } = user

  //   return {...userData}
  // }))
}

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body

  const repository = AppDataSource.getRepository(User)

  await repository.update(parseInt(req.params.id), {
    ...body,
    role: {
      id: role_id
    }
  })

  const userData = await repository.find({
    relations: ['role'],
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(202).send(userData.map(user => {
    const { password, ...userData } = user

    return userData
  }))
}

export const DeleteUser = async (req: Request, res: Response) => { 
  const repository = AppDataSource.getRepository(User)

  await repository.delete(parseInt(req.params.id))
  
  res.status(204).json({
    message: 'User deleted successfully'
  })
}