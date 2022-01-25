import React from 'react'
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";

const BackToHome: React.FC = () =>{
  return(
    <Link to='/' className='mb-8 flex flex-col justify-center items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 xl:h-20 xl:w-20 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
      <span className='-mb-2'><FormattedMessage id='goToHome'/></span> 
    </Link> 
  )
}

export default BackToHome;