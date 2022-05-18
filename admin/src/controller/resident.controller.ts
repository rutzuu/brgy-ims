import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Resident } from '../entity/resident.entity'


export const Residents = async (req: Request, res: Response) => {
  const take = 10
  const page = parseInt(req.query.page as string || '1')
  const repository = AppDataSource.getRepository(Resident)

  const [data, total] = await repository.findAndCount({
    take: take,
    skip: (page - 1) * take,
  })

  res.send({
    data: data,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take)
    }
  })
}

export const AllResidents = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Resident)

  res.send(await repository.find())
}

export const CreateResident = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Resident)

  const resident = await repository.save(req.body)

  res.status(201).send(resident)
}

export const GetResident = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Resident)

  res.send(await repository.findOneBy({ id: parseInt(req.params.id) }))
}

export const UpdateResident = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Resident)

  await repository.update(parseInt(req.params.id), req.body)

  res.status(202).send(await repository.findOneBy({ id: parseInt(req.params.id) }))
}

export const DeleteResident = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Resident)

  await repository.delete(parseInt(req.params.id))

  res.status(204).json({
    message: 'Resident deleted successfully'
  })
}