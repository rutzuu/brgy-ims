import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Resident {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string
  
  @Column()
  middle_name: string
  
  @Column()
  last_name: string
  
  @Column({
    unique: true
  })
  email: string
  
  @Column()
  phone: string

  @Column()
  address: string

  @Column()
  date_issued: string

  @Column()
  valid_until: string

  @Column()
  date_of_birth: string

  @Column()
  gender: string

  @Column()
  place_of_birth: string

  @Column()
  nationality: string

  @Column()
  civil_status: string
}
