import { AppDataSource } from '../../data-source'
import { Permission } from '../entity/permission.entity'
import { Role } from '../entity/role.entity'

AppDataSource.initialize().then(async() => {
  const PermissionRepository = AppDataSource.getRepository(Permission)
  const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders', 'view_residents', 'edit_residents']

  let permissions = []

  for (let i = 0; i < perms.length; i++) {
    permissions.push(await PermissionRepository.save({
      name: perms[i]
    }))
  }

  const roleRepository = AppDataSource.getRepository(Role)

  await roleRepository.save({
    name: 'Admin',
    permissions: permissions
  })

  await roleRepository.save({
    name: 'Employee',
    permissions: [permissions[0], permissions[1], permissions[2], permissions[4], permissions[5], permissions[6], permissions[7], permissions[8], permissions[9]]
  })

  await roleRepository.save({
    name: 'Customer',
    permissions: [permissions[0], permissions[2], permissions[4], permissions[6], permissions[8]]
  })

  process.exit(0)
})