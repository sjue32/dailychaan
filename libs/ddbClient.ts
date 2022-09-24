import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import * as dotenv from 'dotenv';

dotenv.config();

const REGION = 'us-east-1';

const ddbClient = new DynamoDBClient({ 
  region: REGION, 
  credentials: { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string} 
  });

export { ddbClient };