import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import API_URL from '../API_URL';
import BackToHome from '../components/GoToHome';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../i18n';
import * as Yup from 'yup'


const ForgotPassword:React.FC = () =>{
  const[isValidate, setIsValidate] = useState<boolean>(false);
  const[isSent, setIsSent] = useState<boolean>(false);
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;
  // eslint-disable-next-line
  const {handleSubmit, handleChange, values, handleBlur, touched, errors} = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(`${ isI18NisEnglish ? 'It must be email' : 'To musi być email' }`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`),
    }),
    onSubmit: async ({email}) =>{
      await axios.post(`${API_URL}/auth/forgot-password`, { email })
      .then(() => setIsSent(true))
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
      { isSent ? 
        <>
          <div className="flex flex-col bg-white w-96 md:w-108 h-auto rounded-lg p-10">
            <h2 className="font-normal text-2xl text-second"><FormattedMessage id='emailSent'/></h2>
            <p className='text-second mt-4'><FormattedMessage id='emailSentInfo'/></p>
          </div>
        </>
      :
        <>
          <div className="flex flex-col items-center bg-white w-96 md:w-108 h-auto rounded-lg">
            <h2 className="text-2xl font-normal mt-6 text-second"><FormattedMessage id='enterEmail'/></h2>
            <form onSubmit={handleSubmit} className="p-10 w-full">
              <div className="default-input-box">
                <label htmlFor="">
                  <FormattedMessage id='email'/>
                </label>
                <div className="default-input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  className="icon-input"
                  placeholder='Email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  name="email"
                  value={values.email}
                />
              </div>
              <input
                className="default-input-submit"
                type="submit"
                value={`${isI18NisEnglish ? 'Send' : 'Wyślij'}`}
              />
            </form>
          </div>
          <div className="max-h-20 overflow-hidden">
            {touched.email && errors.email ? (
              <div className="login-register-alert" role="alert">
                <p className="font-bold"><FormattedMessage id='email'/></p>
                <p><FormattedMessage id={`${errors.email}`}/></p>
              </div>
            ): null}
            {isValidate ? (
              <div className="login-register-alert" role="alert">
                <p className="font-bold"><FormattedMessage id='dataBase'/></p>
                <p><FormattedMessage id='emailErorr'/></p>
              </div>
            ): null}
            <div className='p-3 w-80 md:w-96 mt-2 h-96'> </div>
          </div>
        </>
      }
    </div>
  )
}

export default ForgotPassword