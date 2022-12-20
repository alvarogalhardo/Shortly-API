import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const {Pool} = pkg;

const connection = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '91Dc001832//',
      database: 'shortly'
    });

export default connection;