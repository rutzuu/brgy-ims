import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source'
import { Product } from '../entity/product.entity'


export const Products = async (req: Request, res: Response) => {
  const take = 10
  const page = parseInt(req.query.page as string || '1')

  const repository = AppDataSource.getRepository(Product)

  const [data, total] = await repository.findAndCount({
    take: take,
    skip: (page - 1) * take,
  })

  res.send({
    data: data,
    meta: {
      total,
      page,
      take,
      last_page: Math.ceil(total / take)
    }
  })
}

export const CreateProduct = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Product)

  const product = await repository.save(req.body)

  res.status(201).send(product)
}

export const GetProduct = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Product)

  res.send(await repository.findOneBy({ id: parseInt(req.params.id) }))
}

export const UpdateProduct = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Product)

  await repository.update(parseInt(req.params.id), req.body)

  res.status(202).send(await repository.findOneBy({ id: parseInt(req.params.id) }))
}

export const DeleteProduct = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Product)

  await repository.delete(parseInt(req.params.id))

  res.status(204).json({
    message: 'Product deleted successfully'
  })
}