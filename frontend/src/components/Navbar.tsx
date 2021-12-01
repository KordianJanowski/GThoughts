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

  const [links, setLinks] = useState<Ilink[]>([
    { name: "Strona główna", url: '' },
    { name: "Zapisane", url: 'saved' }
  ])

  const linksMap = links.map((link:Ilink) => {
    return <Link key={link.name} to={`/${link.url}`}>{link.name}</Link>
  })

  return(
    <nav className='fixed top-0 left-1/2 transform -translate-x-96 -ml-14 flex flex-col justify-between text-white h-screen py-10'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        </svg>
        <div className='grid grid-rows-1 gap-4 text-2xl mt-4 mb-16'>
          { linksMap }
        </div>
        <Link to="/create-article" className='bg-blue-500 py-4 px-12 rounded-full text-xl'>Nowy artykuł</Link>
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
      
    </nav>
  )
}

export default Navbar;