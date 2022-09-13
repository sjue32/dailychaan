import { Pool } from 'pg';
import { QueryResult } from 'pg';
import * as dotenv from 'dotenv';
import { GenericFunction } from '../../types';
// import express from 'express';

// import '@types/pg';

dotenv.config();

const pool = new Pool({
  user: process.env.RDS_USER,
  host: process.env.RDS_HOST,
  // database: process.env.RDS_DATABASE,
  database: 'postgres',
  password: process.env.RDS_PASSWORD,
  // port: parseInt(process.env.RDS_PORT)
  port: 5432
});

export default {
  query: async (text: string, params?: any, callback?: GenericFunction):Promise<any>  => {
    try {
      const result = await pool.query(text, params, callback);
      return result;
    } catch(e) {
        console.log('Error in pool: ', e);
        return null;
    }
  }
}

