import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { GenericFunction } from '../../types';

// import * as pgtypes from '@types/pg';

dotenv.config();

const pool = new Pool({
  user: process.env.RDS_USER,
  host: process.env.RDS_HOST,
  database: process.env.RDS_DATABASE,
  password: process.env.RDS_PASSWORD,
  port: parseInt(process.env.RDS_PORT)
});

export default {
  query: async (text: string, params: any, callback: GenericFunction) => {
    try{
      const result = await pool.query(text, params, callback);
      return result;
    } catch(e) {
        console.log();
    }
  }
}

