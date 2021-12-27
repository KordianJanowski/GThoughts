import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";
import Resizer from 'react-image-file-resizer'

import API_URL from '../API_URL';
import axios from 'axios';

import { jwt} from '../models/const-variables'

interface RegisterInputsValue {
  username: string;
  email: string;
  password: string,
}

const Register:React.FC = () =>{
  const history: any = useHistory();

  const[isValidation, setIsValidation] = useState<boolean>(false);
  const[validationText, setValidationText] = useState<string>('');

  const[image, setImage] = useState<any>('');
  // eslint-disable-next-line
  useEffect(() => { if(jwt) return history.push('/dashboard') }, []);

  const resizeFile = (file: Blob) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG/PNG/JPG', 100, 0,
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
        .max(20, 'username must be shorted than 20')
        .min(4, 'username must be longer than 6 characters')
        .required('Required'),
      email: Yup.string()
        .max(20, 'email must be shortet than 20 char')
        .min(4, 'email must be longer than 6 characters')
        .email('It must be email')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Passwsord must be shortet than 20 char')
        .min(4, 'Password should be longer tan 6 characters')
        .required('Required'),
      repeatPassword: Yup.string()
        .max(20, 'Password must be shortet than 20 char')
        .min(4, 'Password should be longer tan 6 characters')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: async ({username, email, password}: RegisterInputsValue) =>{
      const register = async () =>{
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

          await axios.post(
            `	https://api.cloudinary.com/v1_1/digj3w8rk/image/upload`,
            data
          )
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
            articles_ids: [],
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
              setIsValidation(true);
              return setValidationText('Username already taken')
            }
            else{
              setTimeout(() =>{
                setIsValidation(false);
              }, 4000)
              setIsValidation(true);
              return setValidationText('Email already taken')
            }
          } catch(err) {
            return history.push('/login')
          }
        }
      }
      register()
    }
  })

  return(
  <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-b from-main to-second">
    <div className="flex flex-col items-center bg-white w-96 md:w-108 h-auto rounded-lg">
      <h2 className="text-2xl font-normal mt-10 text-main">Create account</h2>
      <form className="p-10 w-full" onSubmit={handleSubmit}>
        <div className="login-register-input-box">
          <label htmlFor="">Username</label>
          <div className="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            className="login-register-input"
            placeholder="username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="login-register-input-box">
          <label htmlFor="">E-mail</label>
          <div className="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            className="login-register-input"
            placeholder="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="login-register-input-box">
          <label htmlFor="">Password</label>
          <div className="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            className="login-register-input"
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="login-register-input-box">
          <label htmlFor="">Repeat password</label>
          <div className="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            className="login-register-input"
            placeholder="Repeat password"
            type="password"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="login-register-input-box">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e: any) => setImage(e.currentTarget.files[0])}
          />
          {image ?
            <img src={URL.createObjectURL(image)} className="w-20 mt-2" alt="" />
          : null}
        </div>
        <input
          className="cursor-pointer w-full h-11 flex justify-center items-center bg-gradient-to-r from-main to-second text-white text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
          type="submit"
          value="Register"
        />
      </form>
    </div>
    <div className="grid grid-cols-2">
        {touched.username && errors.username ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-48 mt-2 grid-cols-1" role="alert">
            <p className="font-bold">Username</p>
            <p>{ errors.username }</p>
          </div>
        ): null}
        {touched.email && errors.email ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-48 mt-2 grid-cols-1" role="alert">
            <p className="font-bold">Email</p>
            <p>{ errors.email }</p>
          </div>
        ): null}
        {touched.password && errors.password ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-48 mt-2 grid-cols-1" role="alert">
            <p className="font-bold">Password</p>
            <p>{ errors.password }</p>
          </div>
        ): null}
        {touched.repeatPassword && errors.repeatPassword ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-48 mt-2 grid-cols-1" role="alert">
            <p className="font-bold">Repeat Password</p>
            <p>{ errors.repeatPassword }</p>
          </div>
        ): null}
        {isValidation ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-main text-orange-700 p-3 w-48 mt-2 grid-cols-1" role="alert">
            <p className="font-bold">Date base</p>
            <p>{ validationText }</p>
          </div>
        ): null}
      </div>
  </div>
  )
}

export default Register