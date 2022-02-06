import React from 'react'
import { Link } from "react-router-dom";

const BackToHome: React.FC = () =>{
  return(
    <Link to='/' className='mb-8 flex flex-col justify-center items-center text-3xl mt-12'>
      GOLDEN ARTS
    </Link> 
  )
}

export default BackToHome;