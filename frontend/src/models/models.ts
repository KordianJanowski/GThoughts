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

export interface Iarticle{
  title: string;
  body: IarticleBody[];
  main_image: string;
  author_id: string;
  author_name: string;
  id: string;
  _id: string;
}

export interface Icomment{
  body: string;
  username: string;
  user_avatar: string;
  id: number;
}

export interface Ifeedback{
  body: string;
  username: string;
  user_avatar: string;
  id: number;
}