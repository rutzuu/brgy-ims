import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  code: string

  @Column() 
  title: string

  @Column()
  price: number
}