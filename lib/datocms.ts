import { RequestProps } from './types';
import { GraphQLClient } from 'graphql-request';

export const request = ({ query, variables }: RequestProps) => {
  const client = new GraphQLClient(`https://graphql.datocms.com/`, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });
  return client.request(query, variables);
};
