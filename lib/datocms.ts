import { GraphQLClient } from 'graphql-request';

export const requestData = (query: string) => {
  const headers = {
    'content-type': 'application/json',
    authorization: 'Bearer ' + process.env.NEXT_DATOCMS_API_TOKEN,
  };
  const client = new GraphQLClient(`https://graphql.datocms.com/`, {
    headers,
  });
  return client.request(query);
};
