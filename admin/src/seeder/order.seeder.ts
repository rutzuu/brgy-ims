import { AppDataSource } from '../../data-source'
import { Order } from '../entity/order.entity'
// import { OrderItem } from '../entity/order-item.entity'
import { Resident } from '../entity/resident.entity'
import { Product } from '../entity/product.entity'
import { randomInt } from 'crypto'


AppDataSource.initialize().then(async () => {
  const OrderRepository = AppDataSource.getRepository(Order)
  // const OrderItemRepository = AppDataSource.getRepository(OrderItem)
  const ResidentRepository = AppDataSource.getRepository(Resident)
  const ProductRepository = AppDataSource.getRepository(Product)

  
  for (let i = 0; i < 30; i++) {
    const productId = await ProductRepository.findOne({ where: {id: i} })
    const residentID = await ResidentRepository.findOne({ where: {id: i} })
    // const productId = randomInt(0,4)
    await OrderRepository.save({
      product: {
        id: i,
      },
      resident: {
        id: i,
      }
      // resident_id: residentId.id,
      // first_name: residentId.first_name,
      // last_name: residentId.last_name,
      // email: residentId.email,

    })
    
    // for (let j = 0; j < 5; j++) {
    //   await OrderItemRepository.save({
    //     order,
    //     product_title: productId.title,
    //     price: productId.price,
    //     quantity: randomInt(1, 5)
    //   })
    // }
  }

  process.exit(0)
}) 