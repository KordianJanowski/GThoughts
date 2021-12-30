import React, { useState } from 'react'
import { user } from '../../models/const-variables';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

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
      <nav className='xl:w-80 hidden xl:block '>
        <div className='fixed w-60 flex flex-col text-white h-screen mt-20 2xl:ml-8 xl:p-2 '>
          <div className='flex flex-col mb-5'>
            <div className='flex flex-col items-center'>
              <img
                className='w-40 h-40 rounded-full'
                src={user.avatar}
                alt=""
              />
              <p className='text-xl font-bold mt-2'>
                {user.username}
              </p>
              <hr className='my-4 mt-6 border-t border-gray-700 w-full' />

              <button onClick={logout} className='flex justify-center items-center bg-red-500 border border-red-500 rounded-full py-2 px-6 text-lg font-light button-animation w-full mt-4'>
                Wyloguj się
              </button>
              <button className='flex justify-center items-center bg-second border border-gray-600 rounded-full py-2 px-6 font-light text-lg button-animation w-full mt-5'>
                Informacje o koncie
              </button>
            </div>
          </div>
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
                <p className='text-xl font-bold mt-2'>
                  {user.username}
                </p>
                <button onClick={logout} className='flex justify-center items-center bg-red-500 border border-red-500 rounded-full py-2 px-6 text-lg font-light button-animation w-full md:w-1/2 lg:w-1/3 mt-5'>
                  Wyloguj się
                </button>
                <button className='flex justify-center items-center bg-second border border-gray-600 rounded-full py-2 px-6 font-light text-lg button-animation w-full md:w-1/2 lg:w-1/3 mt-5'>
                  Informacje o koncie
                </button>
              </div>
            </div>
          </div>
        </nav>
      : null}
    </>
  )
}

export default SidemenuDashboard;