import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ddbClient } from './ddbClient';

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
