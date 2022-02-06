import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { jwt, user, links } from '../models/const-variables';
import { Ilink } from '../models/models';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../i18n';

const Navbar: React.FC = () =>{
  const history: any = useHistory()

  const setLanguage = (language: string) =>{
    localStorage.setItem('i18n', language)
    history.go(0)
  }

  const linksMap = links.map((link:Ilink) => {
    return (
      <div key={link.url}>
        { jwt || !link.jwt ?
          <Link to={`/${link.url}`} className='flex flex-row items-center justify-center xl:justify-start button-animation mb-4'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
            </svg>
            <span className='hidden xl:block ml-2 font-light'><FormattedMessage id={link.name}/></span>
          </Link>
        : null}
      </div>
    )
  })

  return(
    <nav className='w-2/12 flex justify-center xl:justify-end'>
      <div className='h-screen w-2/12 2xl:w-60 fixed flex flex-col items-center justify-between py-5'>
        <div className='w-full flex flex-col items-center'>
          <div className='w-full flex justify-center xl:justify-start xl:-ml-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 xl:h-20 xl:w-20 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
            </svg>
          </div>
          <div className='w-full flex flex-col justify-center xl:justify-start items-center xl:items-start text-xl mt-2 mb-6 xl:mb-8'>
            { linksMap }
            <div className='flex flex-col items-center xl:flex-row'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 hidden xl:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-6 xl:ml-4 button-animation cursor-pointer' onClick={() => setLanguage(LOCALES.POLISH)} viewBox="0 0 640 480">
                <g fillRule="evenodd">
                  <path fill="#fff" d="M640 480H0V0h640z"/>
                  <path fill="#dc143c" d="M640 480H0V240h640z"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-6 mt-2 xl:mt-0 xl:ml-4 button-animation cursor-pointer' onClick={() => setLanguage(LOCALES.ENGLISH)} viewBox="0 0 640 480">
                <path fill="#012169" d="M0 0h640v480H0z"/>
                <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
                <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
                <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
                <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
              </svg>
            </div>
          </div>
          <Link to="/create-article" className='w-8 xl:w-full h-12 flex flex-row justify-center items-center bg-red-500 text-lg py-2 xl:py-4 px-6 xl:px-8 rounded-3xl button-animation'>
            <span className='hidden xl:block'><FormattedMessage id='addArticle'/></span>
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
            className='w-10 xl:w-full h-12 flex flex-row justify-start items-center hover:bg-second text-lg py-2 xl:py-4 rounded-3xl button-animation'
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
            className='w-12 xl:w-full h-12 flex flex-row justify-center items-center bg-second text-lg xl:py-4 xl:px-8 rounded-3xl button-animation border border-gray-600'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="button-animation w-6 h-6 block xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className='hidden xl:block'><FormattedMessage id='loginButton'/></span>
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar;