import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Role } from '../entity/role.entity'

export const Roles = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Role)

  res.send(await repository.find())
} 

export const CreateRole = async (req: Request, res: Response) => { 
  const { name, permissions } = req.body

  const repository = AppDataSource.getRepository(Role)

  const role = await repository.save({
    name,
    permissions: permissions.map((id: any) => { return { id: id } })
  })

  res.status(201).send(role)
}

export const GetRole = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Role)

  res.send(await repository.findOne({
    relations: ['permissions'],
    where: {
      id: parseInt(req.params.id)
    }
  }))
}

export const UpdateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body

  const repository = AppDataSource.getRepository(Role)

  const role = await repository.save({
    id: parseInt(req.params.id),
    name,
    permissions: permissions.map((id: any) => { return { id: id } })
  })

  res.status(202).send(role)
}

export const DeleteRole = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Role)

  await repository.delete({
    id: parseInt(req.params.id)
  })

  res.status(204).send({
    message: 'Role deleted'
  })
}