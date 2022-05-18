import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './role.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string
  
  @Column()
  last_name: string

  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string

  //Assign role entity to this user entity
  @ManyToOne(() => Role )
  //JoinColumn is used to define the column name of the role id
  //https://typeorm.io/#creating-a-one-to-one-relation
  @JoinColumn({ name: 'role_id' })
  //Assign this column 'role 'to the role id named 'role_id', refer to the @JoinColumn decorator
  role: Role 
}