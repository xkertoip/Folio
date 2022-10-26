export type RequestProps = {
  query: string;
};

export type Project = {
  title: string;
  image: any;
  order: number;
  description: string;
  introduction: string;
  specific: string;
  slug: string;
  seo: string;
  technology: [];
};
export type Workplace = {
  id?: number;
  job: string;
  logo: any;
  company: string;
  description: string;
  time: any;
};

export type Framework = {
  id?: string;
  number: number;
  logo: any;
  name: string;
  randomNumber?: number;
};

export interface MailValues {
  user_email: string;
  user_message: string;
  user_choice?: string;
  user_budget?: number;
}
