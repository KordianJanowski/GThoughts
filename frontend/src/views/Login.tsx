import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { Link, useHistory } from "react-router-dom";
import API_URL from '../API_URL';
import { jwt } from '../models/const-variables';

import { IcookieArguments } from '../models/models';

const Login:React.FC = () =>{
  const history = useHistory();
  const cookies = new Cookies();

  const[isValidate, setIsValidate] = useState<boolean>(false);
  // eslint-disable-next-line
  useEffect(() => { if(jwt) return history.push('/dashboard') }, []);

  const {handleSubmit, handleChange, values, handleBlur} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({email, password}) =>{
      await axios.post(`${API_URL}/auth/local`, {
        identifier: email,
        password: password
      })
      .then(res =>{
        const cookieArguments: IcookieArguments = {
          time: '7d', path: '/'
        }

        cookies.set('jwt', res.data.jwt, cookieArguments)
        cookies.set('user', res.data.user, cookieArguments)
        history.go(0)
        return history.push('/dashboard')
      })
      .catch(() =>{
        setTimeout(() =>{
          setIsValidate(false)
        }, 4000)
        setIsValidate(true)
      })
    }
  })

  return(
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-b from-main to-second">
      <div className="flex flex-col items-center bg-white w-96 md:w-108 h-auto rounded-lg">
        <h2 className="text-2xl font-normal mt-10 text-second">Zaloguj się na konto</h2>
        <form onSubmit={handleSubmit} className="p-10 w-full">
          <div className="login-register-input-box">
            <label htmlFor="">Adres email</label>
            <div className="login-register-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              className="login-register-input"
              placeholder="Adres email"
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              name="email"
              value={values.email}
            />
          </div>
          <div className="login-register-input-box">
            <label htmlFor="">Hasło</label>
            <div className="login-register-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              className="login-register-input"
              placeholder="Hasło"
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="password"
              value={values.password}
            />
          </div>
          <input
            className="login-register-input-submit"
            type="submit"
            value="Zaloguj"
          />
        </form>
        <Link
          to="/register"
          className="w-full flex justify-center items-center pb-6 p-5 bg-gray-100 text-gray-600 text-lg border-t border-gray-300 rounded-b-lg"
        >
          Nowy na stronie? <span className="text-second ml-2"> Zarejestuj się</span>
        </Link>
      </div>
      <div className="top-3/4 absolute">
        {isValidate ?
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-4 w-96 mt-2" role="alert">
            <p className="font-bold">Login error</p>
            <p>email or password is incorrect</p>
          </div>
        : null}
      </div>
    </div>
  )
}

export default Login