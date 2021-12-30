import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firstImage from '../images/1.png'
import secondImage from '../images/2.png'
import thirdImage from '../images/3.png'


const NotFound: React.FC = () =>{
  const images: string[] = [firstImage, secondImage, thirdImage];
  const[image, setImage] = useState<string>('');

  useEffect(() => {
    setImage(images[Math.floor(Math.random()*3)]);// eslint-disable-next-line
  }, [])


  return(
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-2xl mt-10 text-center p-8'>Nie znaleziono takiej strony, wróć na <Link to="/" className='font-bold'>stronę główną</Link></h1>
      <img className='w-5/6 sm:w-4/6 lg:w-1/2 xl:w-4/12' src={image} alt="" />
      <a className=' text-xs font-light mt-16' href="https://storyset.com/web">Web illustrations by Storyset</a>
    </div>
  )
}

export default NotFound;