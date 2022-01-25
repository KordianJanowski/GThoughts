import React from 'react'
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom";

const GoToForgotPassword: React.FC = () =>{
  return(
    <Link to='/forgot-password' className='mt-4 underline'>
      <FormattedMessage id='forgotPassword'/>
    </Link>
  )
}

export default GoToForgotPassword;