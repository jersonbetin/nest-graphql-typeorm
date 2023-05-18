import { registerAs } from '@nestjs/config';

const config = registerAs('config', () => ({
  postgres: {
    dbName: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
  },
  jwtSecret: process.env.JWT_SECRET,
}));

export default config;
