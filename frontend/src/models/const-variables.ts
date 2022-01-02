import Cookies from 'universal-cookie';
import { Iuser, Ilink } from './models';
const cookies: Cookies = new Cookies();


export const user: Iuser = cookies.get('user');
export const jwt: string | boolean = cookies.get('jwt') ? cookies.get('jwt') : false;
export const authorization: object = { headers: { Authorization: `Bearer ${jwt}` } };
export const links: Ilink[] = [
  {
    name: "Strona główna",
    jwt: false,
    url: '',
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  },
  {
    name: "Polubione",
    jwt: true,
    url: 'liked',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    name: "Obserwowani",
    jwt: true,
    url: 'followeds',
    icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
  },
  {
    name: 'Ustawienia',
    jwt: false,
    url: 'settings',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
  }
]