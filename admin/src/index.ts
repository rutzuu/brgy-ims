import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { routes } from './routes'
import "reflect-metadata"
import { AppDataSource } from '../data-source'
import CookieParser from 'cookie-parser'

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())
  app.use(CookieParser())
  app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
  }))

  routes(app)

  app.listen(8000, () => {
    console.log('Server is running on port 8000')
  })
}).catch(error => console.log(error))