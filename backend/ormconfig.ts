import { DataSource } from 'typeorm';
import { Users } from './src/users/entity/users.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
