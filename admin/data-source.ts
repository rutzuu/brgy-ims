import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "test1234",
  "database": "brgy_ims_admin",
  "entities": [
    "src/entity/*.ts"
  ],
  "logging": false,
  "synchronize": true
})