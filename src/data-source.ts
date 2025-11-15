import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();
const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [isProduction ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [isProduction ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
