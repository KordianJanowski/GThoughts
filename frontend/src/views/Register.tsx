import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";
import Resizer from 'react-image-file-resizer'
import API_URL from '../API_URL';
import axios from 'axios';
import { jwt} from '../models/const-variables'
import GoToHome from '../components/GoToHome';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../i18n';

interface RegisterInputsValue {
  username: string;
  email: string;
  password: string,
}

const Register:React.FC = () =>{
  const history: any = useHistory();
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  const[isValidation, setIsValidation] = useState<boolean>(false);
  const[validationText, setValidationText] = useState<string>('');

  const[image, setImage] = useState<any>('');
  // eslint-disable-next-line
  useEffect(() => { if(jwt) return history.push('/dashboard') }, []);

  const resizeFile = (file: Blob) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 100, 100, 'JPEG/PNG/JPG', 100, 0,
    (uri) => {
      resolve(uri);
    }, 'base64' );
  });


  const {handleSubmit, handleChange, values, handleBlur, touched, errors} = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      avatar: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, `${ isI18NisEnglish ? 'Username have to be shorter than 20 characters' : 'Nazwa użytkownika musi być krótsza niż 20 znaków' }`)
        .min(4, `${ isI18NisEnglish ? 'Username have to be longer than 4 characters' : 'Nazwa użytkownika musi być dłuższa niż 4 znaki' }`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`),
      email: Yup.string()
        .max(40, `${ isI18NisEnglish ? 'Email have to be shorter than 20 characters' : 'Email musi być krótszy niż 20 znaków' }`)
        .min(4, `${ isI18NisEnglish ? 'Email have to be longer than 4 characters' : 'Email musi być dłuższy niż 4 znaków' }`)
        .email(`${ isI18NisEnglish ? 'It have to be email' : 'To musi być email' }`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`),
      password: Yup.string()
        .max(30, `${ isI18NisEnglish ? 'Password have to be shorter than 30 characters' : 'Hasło musi być krótsze niż 30 znaków'}`)
        .min(4, `${ isI18NisEnglish ? 'Password have to be longer than 4 characters' : 'Hasło musi być dłuższe niż 4 znaków'}`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`),
      repeatPassword: Yup.string()
        .max(30, `${ isI18NisEnglish ? 'Repeat password have to be shorter than 30 characters' : 'Powtórzone Hasło musi być krótsze niż 30 znaków'}`)
        .min(4, `${ isI18NisEnglish ? 'Repeat password have to be longer than 4 characters' : 'Powtórzone hasło musi być dłuższe niż 4 znaków'}`)
        .oneOf([Yup.ref('password'), null], `${isI18NisEnglish ? 'Password have to match' : 'Hasło musi być zgodne z powtórzonym hasłem'}`)
        .required(`${ isI18NisEnglish ? 'Required' : 'Pole wymagane' }`)
    }),
    onSubmit: async ({username, email, password}: RegisterInputsValue) =>{
      let isPostedImages: boolean = false;
      let imageURL: string = ''

      if(image !== ''){
        const imageResized: any = await resizeFile(image)

        const data = new FormData()
        data.append('file', imageResized)
        data.append("api_key", '732376169492789');
        data.append("api_secret", 'A-dhHrnEZqJYnhAGqLAGcWSDI1M');
        data.append("cloud_name", 'digj3w8rk');
        data.append("upload_preset", "bb7forio");

        await axios.post('https://api.cloudinary.com/v1_1/digj3w8rk/image/upload', data)
        .then(async res => {
          imageURL = res.data.secure_url;
          isPostedImages = true;
        })
        .catch(err => console.log(err))
      } else{
        isPostedImages = true;
        imageURL = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg'
      }

      if(isPostedImages){
        const user = {
          username: username,
          email: email,
          password: password,
          avatar: imageURL,
          recent_hashtags: []
        }

        const registerResponse = await fetch(`${API_URL}/auth/local/register`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })

        const registerResponseJSON = await registerResponse.json();

        try{
          if(registerResponseJSON.message[0].messages[0].message === "Email already taken"){
            setTimeout(() =>{
              setIsValidation(false);
            }, 4000)
            setValidationText('usernameAlreadyTaken');
            return setIsValidation(true);
          }
          else{
            setTimeout(() =>{
              setIsValidation(false);
            }, 4000)
            setValidationText('emailAlreadyTaken');
            return setIsValidation(true);
          }
        } catch(err) {
          return history.push('/login')
        }
      }
    }
  })

  return(
  <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-b from-main to-second">
    <GoToHome />
    <div className="flex flex-col items-center bg-white w-80 md:w-96 h-auto rounded-lg">
      <h2 className="text-2xl font-normal mt-10 text-main">
        <FormattedMessage id='createAccount'/>
      </h2>
      <form className="p-10 w-full" onSubmit={handleSubmit}>
        <div className="default-input-box">
          <label htmlFor="">
            <FormattedMessage id='username'/>
          </label>
          <div className="default-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            className="icon-input"
            placeholder={`${isI18NisEnglish ? 'Username': 'Nazwa użytkownika'}`}
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="default-input-box">
          <label htmlFor="">
            <FormattedMessage id='email'/>
          </label>
          <div className="default-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            className="icon-input"
            placeholder='Email'
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
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
        <div className="default-input-box">
          <input
            type="file"
            className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100'
            accept="image/png, image/jpeg"
            onChange={(e: any) => setImage(e.currentTarget.files[0])}
          />
          {image ?
            <img src={URL.createObjectURL(image)} className="w-20 mt-2" alt="" />
          : null}
        </div>
        <input
          className="default-input-submit"
          type="submit"
          value={`${isI18NisEnglish ? 'Sign in' : 'Zarejestruj  się'}`}
        />
      </form>
    </div>
    <div className="max-h-20 overflow-hidden">
      {touched.username && errors.username ? (
        <div className="login-register-alert" role="alert">
          <p className="font-bold"><FormattedMessage id='username'/> </p>
          <p><FormattedMessage id={ `${errors.username}` }/></p>
        </div>
      ): null}
      {touched.email && errors.email ? (
        <div className="login-register-alert" role="alert">
          <p className="font-bold"><FormattedMessage id='email'/></p>
          <p><FormattedMessage id={`${errors.email}`}/></p>
        </div>
      ): null}
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
        <div className="login-register-alert" role="alert">
          <p className="font-bold"><FormattedMessage id='dataBase'/></p>
          <p><FormattedMessage id={ `${validationText}` }/></p>
        </div>
      ): null}
      <div className='p-3 w-80 md:w-96 mt-2 h-96'> </div>
    </div>
  </div>
  )
}

export default Register