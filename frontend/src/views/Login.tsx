import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { Link, useHistory } from "react-router-dom";
import API_URL from '../API_URL';
import { jwt } from '../models/const-variables';

import { IcookieArguments } from '../models/models';
import GoToHome from '../components/GoToHome';
import GoToForgotPassword from './../components/GoToForgotPassword';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from './../i18n/locales';

const Login:React.FC = () =>{
  const history = useHistory();
  const cookies = new Cookies();

  const[isValidate, setIsValidate] = useState<boolean>(false);
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;
  // eslint-disable-next-line
  useEffect(() => { if(jwt) return history.push('/dashboard') }, []);

  const {handleSubmit, handleChange, values, handleBlur} = useFormik({
    initialValues: {
      identifier: '',
      password: ''
    },
    onSubmit: async ({identifier, password}) =>{
      await axios.post(`${API_URL}/auth/local`, {
        identifier: identifier,
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
      <GoToHome />
      <div className="flex flex-col items-center bg-white w-80 md:w-96 h-auto rounded-lg">
        <h2 className="text-2xl font-normal mt-10 text-second"><FormattedMessage id='login'/></h2>
        <form onSubmit={handleSubmit} className="p-10 w-full">
          <div className="default-input-box">
            <label htmlFor=""><FormattedMessage id='username'/> / <FormattedMessage id='email'/></label>
            <div className="default-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              className="icon-input"
              placeholder={`${isI18NisEnglish ? 'Username' : 'Nazwa użytkownika'} / Email`}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="identifier"
              value={values.identifier}
            />
          </div>
          <div className="default-input-box">
            <label htmlFor=""><FormattedMessage id='password'/></label>
            <div className="default-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              className="icon-input"
              placeholder={`${isI18NisEnglish ? 'Password': 'Hasło'}`}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="password"
              value={values.password}
            />
          </div>
          <input
            className="default-input-submit"
            type="submit"
            value={`${isI18NisEnglish ? 'Log in' : 'Zaloguj się'}`}
          />
        </form>
        <Link
          to="/register"
          className="w-full flex justify-center items-center pb-6 p-5 bg-gray-100 text-gray-600 text-lg border-t border-gray-300 rounded-b-lg"
        >
          <FormattedMessage id='newOnTheWebsite'/> <span className="text-second ml-2"> <FormattedMessage id='register'/></span>
        </Link>
      </div>
      <GoToForgotPassword />
      <div className='max-h-20 overflow-hidden'>
      { isValidate ?
        <div className="login-register-alert" role="alert">
          <p className="font-bold">Login</p>
          <p><FormattedMessage id='loginValidate'/></p>
        </div>
      : 
        <div className='p-3 mt-2 h-16'></div>
      }
      </div>
      
    </div>
  )
}

export default Login