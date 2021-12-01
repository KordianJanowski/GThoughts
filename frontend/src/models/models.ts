export interface Iuser{
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface IarticleBody{
  subtitle: string;
  body: string;
  image?: string;
  id: number;
}

export interface Iarticle {
  title: string;
  body: IarticleBody[];
  main_image: string;
  author_id: string;
  author_name: string;
  createdAt: string;
  published_at: string;
  updatedAt: string;
  id: string;
  _id: string;
  __v: number;
  isLiked?: boolean;
}

export interface Icomment{
  body: string;
  username: string;
  user_avatar: string;
  user_id: string
  article_id: string;
  id_: number;
  id?: string;
}

export interface Ifeedback{
  body: string;
  username: string;
  user_avatar: string;
  user_id: string
  article_id: string;
  id_: number;
  id?: string;
}

export interface Iliked{
  article_id: string;
  user_id: string;
  id?: string;
}

export interface Ilink {
  name: string;
  url: string;
}