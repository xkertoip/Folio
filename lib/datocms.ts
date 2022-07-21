import { GraphQLClient } from 'graphql-request';
import { RequestProps, Project } from './types';

export const request = ({ query, variables }: RequestProps) => {
  const client = new GraphQLClient(`https://graphql.datocms.com/`, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });
  return client.request(query, variables);
};

export async function getAllProjects(): Promise<Project[]> {
  const ALL_PROJECTS_QUERY = `
query ALL_PROJECTS_QUERY {
   allProjects {
    projectInfo
    slug
    projectTitle
    projectAdds
    projectId
  }
}
`;
  const data = await request({
    query: ALL_PROJECTS_QUERY,
  });
  return data?.allProjects;
}
