import Cookies from 'universal-cookie';
import { Iuser, Iarticle } from './models';
const cookies: Cookies = new Cookies();

export const user: Iuser = cookies.get('user');
export const jwt: string | boolean = cookies.get('jwt') ? cookies.get('jwt') : false;
export const authorization: object = { headers: { Authorization: `Bearer ${jwt}` } };