import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../../API_URL'
import { Link } from 'react-router-dom'
import { Iuser } from '../../models/models';
import SidemenuProfilesUsersLoading from './SidemenuProfilesUsersLoading';

type Props = {
  user: Iuser;
}

const SidemenuProfilesUsers: React.FC<Props> = ({ user }) =>{
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

  return(
    <>
    { user ?
      <>
        <nav className='xl:w-1/4 hidden xl:block'>
          <div className='fixed w-64 flex flex-col text-white h-screen mt-20 2xl:ml-8 xl:p-2'>
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
                <button className='flex justify-center items-center bg-red-500 py-2 px-6 text-base button-animation w-full mt-5'>
                  Obserwuj
                </button>
                <hr className='mt-6 border-t w-full border-gray-700 ' />
                <div className='mt-6 w-full border rounded-xl border-gray-600  p-3 bg-second'>
                  <h2 className='font-bold'>Opis</h2>
                  <p className='font-light'>Opissss :O</p>

                  <h2 className='font-bold mt-2'>Data dołączenia</h2>
                  <p className='font-light'> { user.createdAt.substring(0,10) }</p>
                </div>
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
                  <div className='flex flex-col items-center'>
                    <img
                      className='w-40 h-40 rounded-full'
                      src={user.avatar}
                      alt=""
                    />
                    <p className='text-xl font-bold mt-2'>
                      {user.username}
                    </p>
                    <button className='flex justify-center items-center bg-red-500 py-2 px-6 text-base button-animation w-1/3 mt-5'>
                      Obserwuj
                    </button>
                    <hr className='my-4 border w-full border-gray-700 ' />
                    <div className='mt-5 w-full lg:w-1/2 border-2 border-gray-600 rounded-xl p-3 bg-second'>
                      <h2 className='font-bold'>Opis</h2>
                      <p className='font-light'>Opissss :O</p>

                      <h2 className='font-bold mt-2'>Data dołączenia</h2>
                      <p className='font-light'> { user.createdAt.substring(0,10) }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        : null}
      </>
    :
      <SidemenuProfilesUsersLoading />
    }

    </>
  )
}

export default SidemenuProfilesUsers;