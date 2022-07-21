export type RequestProps = {
  query: string;
  variables?: any;
  preview?: boolean;
};

export type Project = {
  projectInfo: string;
  coverImage?: any;
  excerpt?: string;
  projectId: number;
  slug: string;
  projectTitle: string;
};
