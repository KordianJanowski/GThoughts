import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import API_URL from '../API_URL';
import { user } from '../models/const-variables';
import BackToHome from './GoToHome';
import GoToForgotPassword from './GoToForgotPassword';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../i18n';

type Props = {
  setIsPasswordTrue: (isPasswordTrue: boolean) => void
}

const CheckPassword:React.FC<Props> = ({ setIsPasswordTrue }) =>{
  const[isValidate, setIsValidate] = useState<boolean>(false);
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;
  // eslint-disable-next-line
  const {handleSubmit, handleChange, values, handleBlur} = useFormik({
    initialValues: {
      password: ''
    },
    onSubmit: async ({password}) =>{
      await axios.post(`${API_URL}/auth/local`, {
        identifier: user.email,
        password: password
      })
      .then(() => setIsPasswordTrue(true))
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
      <BackToHome />
      <div className="flex flex-col items-center bg-white w-96 md:w-108 h-auto rounded-lg">
        <h2 className="text-2xl font-normal mt-6 text-second">Wpisz hasło</h2>
        <form onSubmit={handleSubmit} className="p-10 w-full">
          <div className="default-input-box">
            <label htmlFor="">
              <FormattedMessage id='enterPassword'/>
            </label>
            <div className="default-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              className="icon-input"
              placeholder={`${isI18NisEnglish ? 'Password' : 'Hasło'}`}
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
            value={`${isI18NisEnglish ? 'Check' : 'Sprawdź'}`}
          />
        </form>
      </div>
      <GoToForgotPassword />
      <div className="top-3/4 absolute">
        {isValidate ?
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-4 w-96 mt-2" role="alert">
            <p className="font-bold"><FormattedMessage id='password'/></p>
            <p><FormattedMessage id='passwordError'/></p>
          </div>
        : null}
      </div>
    </div>
  )
}

export default CheckPassword