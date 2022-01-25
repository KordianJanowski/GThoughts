import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { user } from '../../models/const-variables';
import { FormattedMessage } from 'react-intl';

const SidemenuDashboard: React.FC = () =>{
  const cookies: Cookies = new Cookies();
  const history: any = useHistory();

  const[isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const[isSideMenuAnimateUsed, setIsSideMenuAnimateUsed] = useState<boolean | null>(null);

  const toggleSidemenu = () =>{
    if(isSideMenuOpen === true){
      setIsSideMenuAnimateUsed(false);
      setTimeout(() =>{
        setIsSideMenuOpen(false);
      }, 500)
    } else{
      setIsSideMenuAnimateUsed(true);
      setIsSideMenuOpen(true);
    }
  }

  const logout = () =>{
    cookies.remove('jwt')
    cookies.remove('user')
    history.push('/')
    history.go(0)
  }

  return(
    <>
      <nav className='sidemenu-wrapper'>
        <div className='sidemenu-main'>
          <img
            className='w-40 h-40 rounded-full'
            src={user.avatar}
            alt=""
          />
          <p className='text-xl font-bold mt-2'>
            {user.username}
          </p>
          <hr className='sidemenu-hr' />
          <button onClick={logout} className='rounded-button w-full'>
            <FormattedMessage id='logout'/>
          </button>
          <Link to="/change-user-data" className='flex justify-center items-center bg-second border border-gray-600 rounded-full py-2 px-6 font-light text-lg button-animation w-full mt-2'>
            <FormattedMessage id='accountInformation'/>
          </Link>
        </div>
      </nav>
      <nav className='w-1/12 xl:w-60 block xl:hidden'>
        <div className='fixed w-full flex xl:justify-between text-white h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div className=' w-full md:ml-1 -mt-2'>
            <svg xmlns="http://www.w3.org/2000/svg"
              onClick={toggleSidemenu}
              className="h-10 w-10 text-red-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </nav>
      { isSideMenuOpen ?
        <nav className='block xl:hidden'>
          <div className={`h-screen w-screen fixed top-0 left-0  bg-main ${ isSideMenuAnimateUsed ? 'side-menu' : 'side-menu1' }`}>
            <div className='mt-20 px-4'>
              <div className=' w-full md:ml-1 -mt-2'>
                <svg xmlns="http://www.w3.org/2000/svg"
                  onClick={toggleSidemenu}
                  className="h-10 w-10 text-red-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </div>
              <div className='flex flex-col items-center'>
                <img
                  className='w-40 h-40 rounded-full'
                  src={user.avatar}
                  alt=""
                />
                <p className='text-xl font-bold mt-2 mb-5'>
                  {user.username}
                </p>
                <button onClick={logout} className='rounded-button w-full sm:w-1/2 lg:w-1/3'>
                  <FormattedMessage id='logout'/>
                </button>
                <Link to='/change-user-data' className='flex justify-center items-center bg-second border border-gray-600 rounded-full py-2 px-6 font-light text-lg button-animation w-full sm:w-1/2 lg:w-1/3 mt-2'>
                  <FormattedMessage id='accountInformation'/>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      : null}
    </>
  )
}

export default SidemenuDashboard;