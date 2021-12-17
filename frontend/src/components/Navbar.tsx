import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { Iuser, Ilink } from '../models/models';

const Navbar: React.FC = () =>{
  const cookies: Cookies = new Cookies();
  const user: Iuser = cookies.get('user');
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useLayoutEffect(() => {
    if(cookies.get('jwt')){
      setIsLogged(true)
    }// eslint-disable-next-line
  }, []);

  const links:Ilink[] = [
    { name: "Strona główna", url: '', icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    { name: "Zapisane", url: 'saved', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' }
  ]

  const linksMap = links.map((link:Ilink) => {
    return (
      <Link key={link.name} to={`/${link.url}`} className='flex flex-row items-center justify-start'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 2xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
        </svg>
        <span className='ml-2 hidden 2xl:block'>{link.name}</span>
      </Link>
    ) 
  })

  return(
    <nav className='w-56'>
      <div className='fixed flex flex-col justify-between text-white h-screen py-10'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
          </svg>
          <div className='grid grid-rows-1 gap-4 text-2xl mt-4 mb-14'>
            { linksMap }
          </div>
          <Link to="/create-article" className='bg-blue-500 px-8 py-4 rounded-full text-xl flex flex-row justify-center items-center'>
            <span className='hidden 2xl:block'>Nowy artykuł</span>
            <span className='block 2xl:hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </Link>
        </div>
        {
          isLogged ?
            <Link to="/dashboard" className='flex flex-row items-center'>
              <img 
                className='w-8 h-8 rounded-full mr-4'
                src={user?.avatar} 
                alt="" 
              />
              <span>{ user?.username }</span>
            </Link>
          :
            <Link to="/login">Zaloguj</Link>

        }
      </div>
    </nav>
  )
}

export default Navbar;