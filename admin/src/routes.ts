import express, { Router } from 'express'
import { Register, Login, Authenticate, Logout, UpdateInfo, UpdatePassword } from './controller/auth.controller'
import { Users, CreateUser, GetUser, UpdateUser, DeleteUser } from './controller/user.controller'
import { Products, CreateProduct, GetProduct, UpdateProduct, DeleteProduct } from './controller/product.controller'
import { AllResidents, RecentResidents, Residents, CreateResident, GetResident, UpdateResident, DeleteResident, ResidentsDashboard, LoginResident } from './controller/resident.controller'
import { Chart, ExportCSV, Orders, CreateOrder, GetOrder, UpdateOrder, DeleteOrder, RecentOrders, OrdersDashboard } from './controller/order.controller'
import { UploadImages } from './controller/image.controller'
import { Permissions } from './controller/permission.controller'
import { Roles, CreateRole, GetRole, UpdateRole, DeleteRole } from './controller/role.controller'
import { AuthMiddleware } from './middleware/auth-middleware'
import { PermissionMiddleware } from './middleware/permission-middleware'

export const routes = (router: Router) => {
  //Auth controllers
  //POST
  router.post('/api/register', Register)
  router.post('/api/login', Login)
  router.post('/api/logout', AuthMiddleware, Logout)
  //GET
  router.get('/api/user', AuthMiddleware, Authenticate)
  //PUT
  router.put('/api/users/info', AuthMiddleware, UpdateInfo)
  router.put('/api/users/info/password', AuthMiddleware, UpdatePassword)

  //User controllers
  //POST
  router.post('/api/users', AuthMiddleware, PermissionMiddleware('users'), CreateUser)
  //GET
  router.get('/api/users', AuthMiddleware, PermissionMiddleware('users'), Users)
  router.get('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), GetUser)
  //PUT
  router.put('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), UpdateUser)
  //DELETE
  router.delete('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), DeleteUser)

  //Product controllers
  //POST
  router.post('/api/products', AuthMiddleware, PermissionMiddleware('products'), CreateProduct)
  //GET
  router.get('/api/products', AuthMiddleware, PermissionMiddleware('products'), Products)
  router.get('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), GetProduct)
  //PUT
  router.put('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), UpdateProduct)
  //DELETE
  router.delete('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), DeleteProduct)

  //Resident controllers
  //POST
  router.post('/api/residents', CreateResident)
  //GET
  router.get('/api/residents/login/:phone', LoginResident)
  router.get('/api/residents/all', AuthMiddleware, PermissionMiddleware('residents'), AllResidents)
  router.get('/api/residents/recent', AuthMiddleware, PermissionMiddleware('residents'), RecentResidents)
  router.get('/api/residents/dashboard', AuthMiddleware, PermissionMiddleware('residents'), ResidentsDashboard)
  router.get('/api/residents', AuthMiddleware, PermissionMiddleware('residents'), Residents)
  router.get('/api/residents/:id', GetResident)
  //PUT
  router.put('/api/residents/:id', UpdateResident)
  //DELETE
  router.delete('/api/resident/:id', AuthMiddleware, PermissionMiddleware('residents'), DeleteResident)

  //Permission controllers
  //POST
  //GET
  router.get('/api/permissions', AuthMiddleware, Permissions)

  //Role controllers
  //POST
  router.post('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), CreateRole)
  //GET
  router.get('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), Roles)
  router.get('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), GetRole)
  //PUT
  router.put('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), UpdateRole)
  //DELETE
  router.delete('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), DeleteRole)

  //Image controllers
  //POST
  router.post('/api/upload', AuthMiddleware, UploadImages)
  //GET
  router.use('/api/uploads', express.static('./uploads'))

  //Order controllers
//POS
  router.post('/api/orders/export-csv', AuthMiddleware, ExportCSV)
  router.post('/api/orders', AuthMiddleware, PermissionMiddleware('orders'), CreateOrder)
  //GET
  router.get('/api/orders', AuthMiddleware, Orders)
  router.get('/api/orders/recent', AuthMiddleware, RecentOrders)
  router.get('/api/orders/dashboard', AuthMiddleware, OrdersDashboard)
  router.get('/api/orders/:id', AuthMiddleware, GetOrder)
  router.get('/api/orders/chart', AuthMiddleware, Chart)
  //PUT
  router.put('/api/orders/:id', AuthMiddleware, PermissionMiddleware('orders'), UpdateOrder)
  //DELETE
  router.delete('/api/orders/:id', AuthMiddleware, PermissionMiddleware('orders'), DeleteOrder)
}