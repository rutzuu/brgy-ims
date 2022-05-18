import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Permission } from '../entity/permission.entity'

export const Permissions = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Permission)

  res.send(await repository.find())
}