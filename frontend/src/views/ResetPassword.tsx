import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";

import API_URL from '../API_URL';
import axios from 'axios';

import { jwt} from '../models/const-variables'
import GoToHome from '../components/GoToHome';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../i18n';

interface IregisterInputsValue {
  password: string,
  repeatPassword: string,
}

const ResetPassword:React.FC = () =>{
  const history: any = useHistory();
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  const[isValidation, setIsValidation] = useState<boolean>(false);

  // eslint-disable-next-line
  useEffect(() => { if(jwt || window.location.href.length < 20) return history.push('/dashboard') }, []);

  const {handleSubmit, handleChange, values, handleBlur, touched, errors} = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(30, `${ isI18NisEnglish ? 'Password must be shorter than 30 characters' : 'Hasło musi być krótsze niż 30 znaków'}`)
        .min(4, `${ isI18NisEnglish ? 'Password must be longer than 4 characters' : 'Hasło musi być dłuższe niż 4 znaków'}`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`),
      repeatPassword: Yup.string()
        .max(30, `${ isI18NisEnglish ? 'Repeat password must be shorter than 30 characters' : 'Powtórzone Hasło musi być krótsze niż 30 znaków'}`)
        .min(4, `${ isI18NisEnglish ? 'Repeat password must be longer than 4 characters' : 'Powtórzone hasło musi być dłuższe niż 4 znaków'}`)
        .oneOf([Yup.ref('password'), null], `${isI18NisEnglish ? 'Password must match' : 'Hasło musi być zgodne z powtórzonym hasłem'}`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`)
    }),
    onSubmit: async ({password, repeatPassword}: IregisterInputsValue) =>{
      const code: string = window.location.href.split("").splice(42, window.location.href.length).join('')

      const data = {
        code,
        password,
        passwordConfirmation: repeatPassword
      }
      
      await axios.post(`${API_URL}/auth/reset-password`, data)
      .then(() => {
        setTimeout(() =>{
          setIsValidation(false);
          history.push('/login')
        }, 2000)
        return setIsValidation(true);
      })
      .catch(err => console.log(err))
    }
  })

  return(
  <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-b from-main to-second">
    <GoToHome />
    <div className="flex flex-col items-center bg-white w-80 md:w-96 h-auto rounded-lg">
      <h2 className="text-2xl font-normal mt-10 text-main">
        <FormattedMessage id='resetPassword'/>
      </h2>
      <form className="p-10 w-full" onSubmit={handleSubmit}>
        <div className="default-input-box">
          <label htmlFor="">
            <FormattedMessage id='password'/>
          </label>
          <div className="default-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            className="icon-input"
            placeholder={`${isI18NisEnglish ? 'Password': 'Hasło'}`}
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="default-input-box">
          <label htmlFor="">
          <FormattedMessage id='repeatPassword'/>
          </label>
          <div className="default-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            className="icon-input"
            placeholder={`${isI18NisEnglish ? 'Repeat password': 'Powtórz hasło'}`}
            type="password"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <input
          className="default-input-submit"
          type="submit"
          value={`${isI18NisEnglish ? 'Change password' : 'Zmień hasło'}`}
        />
      </form>
    </div>
    <div className="max-h-20 overflow-hidden">
      {touched.password && errors.password ? (
        <div className="login-register-alert" role="alert">
          <p className="font-bold"><FormattedMessage id='password'/></p>
          <p><FormattedMessage id={ `${errors.password}` }/></p>
        </div>
      ): null}
      {touched.repeatPassword && errors.repeatPassword ? (
        <div className="login-register-alert" role="alert">
          <p className="font-bold"><FormattedMessage id='repeatPassword'/></p>
          <p><FormattedMessage id={ `${errors.repeatPassword}` }/></p>
        </div>
      ): null}
      {isValidation ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-xs sm:text-sm text-main p-3 w-80 sm:w-96 mt-2 h-16" role="alert">
          <p className="font-bold"><FormattedMessage id='dataBase'/></p>
          <p><FormattedMessage id="resetPasswordSuccess" /></p>
        </div>
      ): null}
      <div className='p-3 w-80 md:w-96 mt-2 h-96'> </div>
    </div>
  </div>
  )
}

export default ResetPassword