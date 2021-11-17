import React, { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

interface ILinks {
  name: string,
  url: string
}

interface Iuser{
  id: string;
  username: string;
  email: string;
  avatar: string;
}

const Navbar: React.FC = () =>{
  const cookies: Cookies = new Cookies();
  const user: Iuser = cookies.get('user');
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useLayoutEffect(() => {
    if(cookies.get('jwt')){
      setIsLogged(true)
    }// eslint-disable-next-line
  }, []);

  const [links, setLinks] = useState<ILinks[]>([
    { name: "Create article", url: 'create-article' },
    { name: "Saved", url: 'saved' }
  ])

  const linksEl = links.map(link => {
    return <Link key={link.name} to={`/${link.url}`} className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700">{link.name}</Link>
  })

  return(
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700 -mt-1">
              <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">goldenArts</Link>
            </div>
            <div className="flex md:hidden">
              <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 md:flex md:items-center md:justify-between">
            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
              {
                isLogged ?
                  <div>{linksEl}</div>
                :
                  ''
              }
            </div>
            {
              isLogged ?
                <div className="flex items-center mt-4 md:mt-0">
                  <button className="hidden mx-4 text-gray-600 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <Link to="/dashboard" type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                      <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                        <img src={user.avatar} className="object-cover w-full h-full" alt="avatar" />
                      </div>

                      <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">{ user.username }</h3>
                  </Link>
                </div>
              :
                <Link to="/login" className="flex items-center mt-4 md:mt-0">
                  Zaloguj
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;