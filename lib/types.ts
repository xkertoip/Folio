export type RequestProps = {
  query: string;
  variables?: any;
  preview?: boolean;
};

export type Project = {
  title: string;
  image: string;
  description?: string;
  adds: number;
  slug: string;
  technology: string;
  introduction: string;
};
