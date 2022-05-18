import { Product } from './products'
import { Resident } from './residents'

export class Order {
  constructor (
    public id: number,
    public created_at: string,
    public product: Product,
    public resident: Resident
  ){}
}