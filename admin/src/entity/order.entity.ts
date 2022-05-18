import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Product } from './product.entity'
import { Resident } from './resident.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  // @Column()
  // product_title: string

  // @Column()
  // product_code: string

  // @Column()
  // first_name: string

  // @Column()
  // last_name: string

  // @Column()
  // email: string

  @CreateDateColumn()
  created_at: string

  // get name(): string {
  //   return `${this.first_name} ${this.last_name}`
  // }

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @ManyToOne(() => Resident)
  @JoinColumn({ name: 'resident_id' })
  resident: Resident
  // @OneToMany(type resident> OrderItem, orderItem => orderItem.order)
  // order_items: OrderItem[]


  // get total(): number {
  //   return this.order_items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  // }
}