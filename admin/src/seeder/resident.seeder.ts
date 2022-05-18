import { AppDataSource } from '../../data-source'
import { Resident } from '../entity/resident.entity'
import { faker } from '@faker-js/faker'

AppDataSource.initialize().then(async () => {
  const ResidentRepository = AppDataSource.getRepository(Resident)
  
  for (let i = 0; i < 30; i++) {
    const firstName = faker.name.firstName()
    const middleName = faker.name.middleName()
    const lastName = faker.name.lastName()
    const currentDate = new Date()
    const validUntilDate = new Date(currentDate.getTime())

    validUntilDate.setFullYear(currentDate.getFullYear() + 1)

    const civil_statuses = ['Single', 'Married', 'Widowed']
    const randomOptions = (f: string | any[]) =>{
      return f[Math.floor(Math.random() * f.length)]
    } 
    const genders = ['Male', 'Female', 'Other']
    
    await ResidentRepository.save({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: faker.internet.email(firstName, lastName),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      date_issued: currentDate.toLocaleDateString(),
      valid_until: validUntilDate.toLocaleDateString(),
      date_of_birth: faker.date.past(75, new Date()).toLocaleDateString(),
      gender: randomOptions(genders),
      place_of_birth: faker.address.city(),
      nationality: 'Filipino',
      civil_status: randomOptions(civil_statuses)
    })
  }

  process.exit(0)
}) 