import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ddbClient } from './ddbClient';

const marshallOptions = {
  removeUndefinedValues: true,
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);
