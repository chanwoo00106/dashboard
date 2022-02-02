export interface PostProps {
  filter(arg0: (t: PostProps) => boolean): any;
  fillter?: any;
  id: number;
  author: AuthorProps;
  authorId: number;
  text: string;
  createdAt: Date;
  comments: CommentProps;
  likes: LikeProps;
}

export interface AuthorProps {
  id: number;
  createdAt: Date;
  email: string;
  password: string;
  imageUrl: string;
}

export interface CommentProps {
  id: number;
  createdAt: Date;
  text: string;
  postId: number;
  post: PostProps;
  authorId: number;
  author: AuthorProps;
  length: any;
  map?: any;
}

export interface LikeProps {
  id: number;
  createdAt: Date;
  postId: number;
  post: PostProps;
  authorId: number;
  author: AuthorProps;
  length: any;
}

export interface DeleteButtonProps {
  id: number;
  post: PostProps;
}
