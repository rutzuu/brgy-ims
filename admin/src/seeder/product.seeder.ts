import { AppDataSource } from '../../data-source'
import { Product } from '../entity/product.entity'


AppDataSource.initialize().then(async () => {
  const ProductRepository = AppDataSource.getRepository(Product)
  const productCode = ['BRGY-CL', 'CRT-ID', 'BRGY-ID']
  const productTitle = ['Barangay Clearance', 'Certificate of Indigence', 'Barangay ID']
  const productPrice = [250, 500, 100]

  for (let i = 0; i < productCode.length; i++) {
    await ProductRepository.save({
      code: productCode[i],
      title: productTitle[i],
      price: productPrice[i]
    })
  }

  process.exit(0)
})