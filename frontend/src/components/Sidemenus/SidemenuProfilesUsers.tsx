import React, { useState } from 'react'
import { Iuser } from '../../models/models';
import SidemenuProfilesUsersLoading from './SidemenuProfilesUsersLoading';
import { FormattedMessage } from 'react-intl';

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
        <nav className='sidemenu-wrapper'>
          <div className='sidemenu-main'>
            <img
              className='w-40 h-40 rounded-full'
              src={user.avatar}
              alt=""
            />
            <p className='text-xl font-bold mt-2 mb-5'>
              {user.username}
            </p>
            <button className='rounded-button w-full'>
              <FormattedMessage id='follow'/>
            </button>
            <hr className='sidemenu-hr' />
            <div className='sidemenu-hash-box'>
              {/* <h2 className='font-bold'><FormattedMessage id='description'/></h2> */}
              <h2 className='font-bold'><FormattedMessage id='dataJoined'/></h2>
              <p className='font-light'> { user.createdAt.substring(0,10) }</p>
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
                    <button className='rounded-button w-full'>
                      <FormattedMessage id='follow'/>
                    </button>
                    <hr className='sidemenu-hr' />
                    <div className='mt-5 w-full lg:w-1/2 border-2 border-gray-600 rounded-xl p-3 bg-second'>
                      {/* <h2 className='font-bold'>Opis</h2>
                      <p className='font-light'>Opissss :O</p> */}

                      <h2 className='font-bold'><FormattedMessage id='dataJoined'/></h2>
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