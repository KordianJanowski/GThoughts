import React from 'react'
import { Link } from 'react-router-dom'
import { jwt, user, links } from '../models/const-variables';
import { Ilink } from '../models/models';

const Navbar: React.FC = () =>{
  const linksMap = links.map((link:Ilink) => {
    return (
      <>
        { jwt || !link.jwt ?
          <Link key={link.url} to={`/${link.url}`} className='flex flex-row items-center justify-center xl:justify-start button-animation'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
            </svg>
            <span className='ml-2 font-light hidden xl:block'>{link.name}</span>
          </Link>
        : null}
      </>
    )
  })

  return(
    <nav className='w-2/12 xl:w-1/4 mr-2 flex justify-center'>
      <div className='fixed flex flex-col items-center justify-between text-white h-screen mt-16'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 xl:h-24 xl:w-24 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
          <div className='grid grid-rows-1 gap-4 text-2xl mt-4 mb-14'>
            { linksMap }
          </div>
          <Link to="/create-article" className='button-animation bg-red-500 py-2 px-6 w-8 xl:w-auto xl:px-8 xl:py-4 rounded-full text-xl flex flex-row justify-center items-center'>
            <span className='hidden xl:block'>Dodaj artykuł</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 block xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </Link>
        </div>
        { jwt ?
          <Link
            to="/dashboard"
            className='button-animation mb-20 rounded-full xl:px-5 xl:py-3 xl:bg-second'
          >
            <img
              className='w-10 h-10 rounded-full xl:mr-3 inline'
              src={user?.avatar}
              alt=""
            />
            <span className={`hidden xl:inline ${user?.username.length > 15 ? 'text-xs' : 'text-base'}`}>{ user?.username }</span>
          </Link>
        :
          <Link
            to="/login"
            className='button-animation mb-20 bg-second text-white text-center p-2 sm:p-3 xl:p-4 xl:px-12 xl:text-lg rounded-full border-2 border-gray-600'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="button-animation w-6 sm:w-8 block xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className='hidden xl:block'>Zaloguj się</span>
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar;