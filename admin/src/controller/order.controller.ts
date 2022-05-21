import { Request, Response } from 'express'
import { date } from 'joi'
import { Parser } from 'json2csv'
import { AppDataSource } from '../../data-source'
import { Order } from '../entity/order.entity'

export const Orders = async (req: Request, res: Response) => {
  const take = 10
  const page = parseInt(req.query.page as string || '1')

  const repository = AppDataSource.getRepository(Order)

  const [data, total] = await repository.findAndCount({
    take: take,
    skip: (page - 1) * take,
    relations: { product: true, resident: true }
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

export const OrdersToday = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Order)

  const data = await repository.find({
    relations: { product: true, resident: true },
    // where: {
    //   created_at: new Date().toJSON()
    // }
  })

  res.send(data)
}

export const OrdersDashboard = async (req: Request, res: Response) => {
  const take = 5
  const page = parseInt(req.query.page as string || '1')

  const repository = AppDataSource.getRepository(Order)

  const [data, total] = await repository.findAndCount({
    take: take,
    skip: (page - 1) * take,
    relations: { product: true, resident: true }
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

export const RecentOrders = async (req: Request, res: Response) => {
  const take = 5
  const page = parseInt(req.query.page as string || '1')

  const repository = AppDataSource.getRepository(Order)

  const [data, total] = await repository.findAndCount()

  res.send({
    data: data,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take)
    }
  })
}

export const CreateOrder = async (req: Request, res: Response) => {
  const { product_id, resident_id, ...body } = req.body

  const repository = AppDataSource.getRepository(Order)

  const orderData  = await repository.save({
    ...body,
    product: {
      id: product_id
    },
    resident: {
      id: resident_id
    }
  })

  res.status(201).send(orderData)
}

export const GetOrder = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Order)
  const id = parseInt(req.params.id)

  //Find relations with params using .find
  //https://typeorm.io/find-options#basic-options
  const orderData  = await repository.findOne({
    // id: id
    relations: { product: true, resident: true },
    where: {
      id: id,
    }
  })
  
  res.send(orderData)
}

export const UpdateOrder = async (req: Request, res: Response) => {
  const { product_id, resident_id, ...body } = req.body

  const repository = AppDataSource.getRepository(Order)

  await repository.update(parseInt(req.params.id), {
    ...body,
    product: {
      id: product_id
    },
    resident: {
      id: resident_id
    }
  })

  const orderData = await repository.find({
    relations: { product: true, resident: true },
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(202).send(orderData)
}

export const DeleteOrder = async (req: Request, res: Response) => { 
  const repository = AppDataSource.getRepository(Order)

  await repository.delete(parseInt(req.params.id))
  
  res.status(204).json({
    message: 'Order deleted successfully'
  })
}

export const ExportCSV = async (req: Request, res: Response) => {
  const parser = new Parser({
    fields: ['Transaction ID', 'Product Title', 'Product Code', 'Resident Name','Address', 'Phone Number', 'Price', 'Created At']
  })

  const repository = AppDataSource.getRepository(Order)
  const currentDay = new Date()
  const orders = await repository.find({
    relations: { product: true, resident: true },
    // where: {
    //   created_at: currentDay.toISOString()
    // }
  })
    // { relations: ['order_items'] }

  const json = []

  orders.forEach((order: Order) => {
    json.push({
      'Transaction ID': order.id,
      'Product Title': order.product.title,
      'Product Code': order.product.code,
      'Resident Name': order.resident.first_name + ' ' + order.resident.last_name,
      'Address': order.resident.address,
      'Phone Number': order.resident.phone,
      'Price': order.product.price,
      'Created At': order.created_at
    })

    // order.order_items.forEach((item: OrderItem) => {
    //   json.push({
    //     ID: '',
    //     Name: '',
    //     Email: '',
    //     'Product Title': item.product_title,
    //     Price: item.price,
    //     Quantity: item.quantity
    //   })
    // })
  })

  const csv = parser.parse(json)

  res.header('Content-Type', 'text/csv')
  res.attachment('Transactions.csv')
  res.send(csv)
}

export const Chart = async (req: Request, res: Response) => {
  const result = await AppDataSource.query(`
    SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, SUM(oi.price * oi.quantity) as sum
    FROM \`order\` o
    JOIN order_item oi on o.id = oi.order_id
    GROUP BY date
  `)

  res.send(result)
}