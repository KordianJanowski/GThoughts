import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { jwt, user } from '../models/const-variables';
import { Ilink } from '../models/models';

const Navbar: React.FC = () =>{
  const cookies: Cookies = new Cookies();

  const links:Ilink[] = [
    { name: "Strona główna", url: '', icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    { name: "Polubione", url: 'saved', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { name: "Obserwowani", url: 'followeds', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { name: 'Ustawienia', url: 'settings', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' }
  ]

  const linksMap = links.map((link:Ilink) => {
    return (
      <Link key={link.name} to={`/${link.url}`} className='flex flex-row items-center justify-center xl:justify-start button-animation'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
        </svg>
        <span className='ml-2 hidden xl:block'>{link.name}</span>
      </Link>
    )
  })

  return(
    <nav className='w-2/12 xl:w-80 flex justify-center'>
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
          <Link to="/dashboard" className='mb-20 rounded-3xl xl:px-3 xl:py-3 xl:bg-second button-animation'>
            <img
              className='w-10 h-10 rounded-full xl:mr-4 inline'
              src={user?.avatar}
              alt=""
            />
            <span className='hidden xl:inline text-sm'>{ user?.username }</span>
          </Link>
        :
          <Link
            to="/login"
            className='button-animation bg-second text-white text-center p-4 font-medium text-lg rounded-full border-2 border-gray-600'
          >
            Zaloguj
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar;