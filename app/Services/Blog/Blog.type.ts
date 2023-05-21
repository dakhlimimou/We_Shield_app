export type BlogType = {
  _id: string;
  title: string;
  content: string;
  image: string;
  tags: Array<string>;
  user: { firstName: string; lastName: string; role: string };
};
