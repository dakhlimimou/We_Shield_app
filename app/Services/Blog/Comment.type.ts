export type CommentType = {
  user: {
    profilImage: string;
    firstName: string;
    lastName: string;
    _id: string;
  };
  content: string;
  createdAt: string;
  _id: string;
};
export type CommentsType = Array<CommentType>;
