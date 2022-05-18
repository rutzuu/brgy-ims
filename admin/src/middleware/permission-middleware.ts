import { Request, Response } from 'express'
import { User } from '../entity/user.entity'

export const PermissionMiddleware = (access: string) => {
  return (req: Request, res: Response, next: Function) => {
    const user: User = req['user']

    const permissions = user.role.permissions

    if (req.method === 'GET') {
      if (!permissions.some(permission => (permission.name === `view_${access}`) || (permission.name === `edit_${access}`))) {
        return res.status(401).send({
          message: 'You do not have permission to view this resource'
        })
      }
    } else {
      if (!permissions.some(permission => permission.name === `edit_${access}`)) {
        return res.status(401).send({
          message: 'You do not have permission to view this resource'
        })
      }
    }
    next()
  }
}