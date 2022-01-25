import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import Resizer from 'react-image-file-resizer'
import axios from 'axios';

import API_URL from '../API_URL';
import { authorization, jwt, user} from '../models/const-variables';
import { Iuser ,IcookieArguments } from '../models/models';

import Navbar from '../components/Navbar';
import SidemenuDashboard from '../components/Sidemenus/SidemenuDashboard';
import CheckPassword from '../components/CheckPassword';
import { LOCALES } from './../i18n/locales';
import { FormattedMessage } from 'react-intl';

const ChangeUserData:React.FC = () =>{
  const cookies: Cookies = new Cookies();
  const history: any = useHistory();
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  const[isValidation, setIsValidation] = useState<boolean>(false);
  const[validationText, setValidationText] = useState<string>('');
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const[isPasswordTrue, setIsPasswordTrue] = useState<boolean>(false);

  const[image, setImage] = useState<any>();
  // eslint-disable-next-line
  useEffect(() => { if(!jwt) return history.push('/dashboard') }, []);

  const resizeFile = (file: Blob) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG/PNG/JPG', 100, 0,
    (uri) => {
      resolve(uri);
    }, 'base64' );
  });

  const refreshCookies = (user: Iuser) => {
    cookies.remove('user');
    const cookieArguments: IcookieArguments = { time: '7d', path: '/' };
    cookies.set('user', user, cookieArguments);
  }

  const changeUserData = async (name: string, cookieValue: string | undefined, value: string) =>{
    setIsLoading(true);
    if(value !== cookieValue){
      let data: any = {};
      data[name] = value;

      await axios.put(`${API_URL}/users/me`, data , authorization)
      .then(res =>{
        refreshCookies(res.data);
        if(name === 'username') history.go(0);
        setIsLoading(false);
      })
      .catch(() => {
        setTimeout(() => {
          setIsValidation(false);
        }, 4000)
        setValidationText(name === 'username' ? 'usernameAlreadyTaken' : 'emailAlreadyTaken');
        setIsValidation(true);
      })
    } else{
      setTimeout(() => {
        setIsValidation(false);
      }, 4000)
      setValidationText('sameData');
      return setIsValidation(true);
    }
  }

  const changeAvatar = async () =>{
    const imageResized: any = await resizeFile(image)

    const data = new FormData()
    data.append('file', imageResized)
    data.append("api_key", '732376169492789');
    data.append("api_secret", 'A-dhHrnEZqJYnhAGqLAGcWSDI1M');
    data.append("cloud_name", 'digj3w8rk');
    data.append("upload_preset", "bb7forio");

    await axios.post(
      `	https://api.cloudinary.com/v1_1/digj3w8rk/image/upload`,
      data
    )
    .then(async res => {
      await axios.put(`${API_URL}/users/me`, { avatar: res.data.secure_url } , authorization)
      .then(res => {
        refreshCookies(res.data)
      })
    })
    .catch(err => console.log(err))
  }


  const {handleChange, values, handleBlur, touched, errors} = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, `${ isI18NisEnglish ? 'Username must be shorter than 20 characters' : 'Nazwa użytkownika musi być krótsza niż 20 znaków' }`)
        .min(4, `${ isI18NisEnglish ? 'Username must be longer than 4 characters' : 'Nazwa użytkownika musi być dłuższa niż 4 znaki' }`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`),
      email: Yup.string()
        .max(40, `${ isI18NisEnglish ? 'Email must be shorter than 20 characters' : 'Email musi być krótszy niż 20 znaków' }`)
        .min(4, `${ isI18NisEnglish ? 'Email must be longer than 4 characters' : 'Email musi być dłuższy niż 4 znaków' }`)
        .email(`${ isI18NisEnglish ? 'It must be email' : 'To musi być email' }`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`),
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
    onSubmit: () => {},
  })

  return(
    <>
      { isPasswordTrue ?
        <div className="wrapper">
          <Navbar />
          { isLoading ?
            <div className='main'>
              <div className="flex items-center justify-center h-screen">
                <div className="w-80 h-80 border-t-4 border-b-4 border-red-500 rounded-full animate-spin"></div>
              </div>
            </div>
          :
            <div className="main" >
              <div className='main-header'>
                <h2 className='main-header-text'><FormattedMessage id='userInfo'/></h2>
              </div>

              <div className='flex flex-col items-center w-full'>
                <div className="default-input-box w-full xl:w-1/2">
                  <label htmlFor="" className='text-xl font-normal'><FormattedMessage id='username'/></label>
                  <div className="default-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    className="icon-input"
                    placeholder={`${isI18NisEnglish ? 'Username' : 'Nazwa użytkownika'}`}
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <input
                  className="change-user-data-input-submit"
                  type="submit"
                  value={`${isI18NisEnglish ? 'Save change' : 'Zapisz zmianę' }`}
                  onClick={() => changeUserData('username', user.username , values.username)}
                />
                <div className="default-input-box w-full xl:w-1/2 mt-10">
                  <label htmlFor="" className='text-xl font-normal'><FormattedMessage id='email'/></label>
                  <div className="default-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    className="icon-input"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <input
                  className="change-user-data-input-submit"
                  type="submit"
                  value={`${isI18NisEnglish ? 'Save change' : 'Zapisz zmianę' }`}
                  onClick={() => changeUserData('email', user.email , values.email)}
                />
                <div className="default-input-box w-full xl:w-1/2 mt-10">
                  <label htmlFor="" className='text-xl font-normal'><FormattedMessage id='password'/></label>
                  <div className="default-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    className="icon-input"
                    placeholder={`${isI18NisEnglish ? 'Password' : 'Hasło'}`}
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="default-input-box w-full xl:w-1/2">
                  <label htmlFor="" className='text-xl font-normal'><FormattedMessage id='repeatPassword'/></label>
                  <div className="default-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    className="icon-input"
                    placeholder={`${isI18NisEnglish ? 'Repeat password' : 'Powtórz hasło'}`}
                    type="password"
                    name="repeatPassword"
                    value={values.repeatPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <input
                  className="change-user-data-input-submit"
                  type="submit"
                  value={`${isI18NisEnglish ? 'Save change' : 'Zapisz zmianę' }`}
                  onClick={() => changeUserData('password', user.password , values.password)}
                />
                <div className="default-input-box w-full xl:w-1/2 mt-10">
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                    accept="image/png, image/jpeg"
                    onChange={(e: any) => setImage(e.currentTarget.files[0])}
                  />
                  {image ?
                    <img src={URL.createObjectURL(image)} className="w-20 mt-2" alt="" />
                  :
                    <img src={user.avatar} className="w-20 mt-2" alt="" />
                  }
                </div>
                <input
                  className="change-user-data-input-submit"
                  type="submit"
                  value={`${isI18NisEnglish ? 'Save change' : 'Zapisz zmianę' }`}
                  onClick={changeAvatar}
                />
                <div className="absolute top-0">
                  {touched.username && errors.username ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-96 mt-2 grid-cols-1" role="alert">
                      <p className="font-bold"><FormattedMessage id='username'/> </p>
                      <p><FormattedMessage id={ `${errors.username}` }/></p>
                    </div>
                  ): null}
                  {touched.email && errors.email ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-96 mt-2 grid-cols-1" role="alert">
                      <p className="font-bold"><FormattedMessage id='email'/></p>
                      <p><FormattedMessage id={`${errors.email}`}/></p>
                    </div>
                  ): null}
                  {touched.password && errors.password ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-96 mt-2 grid-cols-1" role="alert">
                      <p className="font-bold"><FormattedMessage id='password'/></p>
                      <p><FormattedMessage id={ `${errors.password}` }/></p>
                    </div>
                  ): null}
                  {touched.repeatPassword && errors.repeatPassword ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-96 mt-2 grid-cols-1" role="alert">
                      <p className="font-bold"><FormattedMessage id='repeatPassword'/></p>
                      <p><FormattedMessage id={ `${errors.repeatPassword}` }/></p>
                    </div>
                  ): null}
                  {isValidation ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-full mt-2 grid-cols-1" role="alert">
                      <p className="font-bold"><FormattedMessage id='dataBase'/></p>
                      <p><FormattedMessage id={ `${validationText}` }/></p>
                    </div>
                  ): null}
                </div>
              </div>
            </div>
          }
          <SidemenuDashboard />
        </div>
      : 
        <CheckPassword setIsPasswordTrue={setIsPasswordTrue} />
      }
    </>
  )
}

export default ChangeUserData