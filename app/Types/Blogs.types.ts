export type BlogType = {
  _id: string;
  title: string;
  content: string;
  image: string;
  user: { firstName: string; lastName: string; role: string; _id: string };
  date: Date;
  tags: Array<string>;
  description: string;
  createdAt: string;
};

export type BlogsType = Array<BlogType>;
