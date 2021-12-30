import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../../API_URL'
import { Link } from 'react-router-dom'
import { Iuser, Iarticle } from '../../models/models';
import SidemenuArticleLoading from './SidemenuArticleLoading';


type Props = {
  article: Iarticle;
}

const SidemenuArticle: React.FC<Props> = ({ article }) =>{
  const[isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const[isSideMenuAnimateUsed, setIsSideMenuAnimateUsed] = useState<boolean | null>(null);
  const[author, setAuthor] = useState<Iuser>({id: '', username: '', email: '', avatar: '', createdAt: '' });
  const[isAuthorLoaded, setIsAuthorLoaded] = useState<boolean>(false);

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

  useEffect(() => {
    if(article) {
      const fetchAuthor = async () => {
        await axios.get(`${API_URL}/users/${article.author_id}`)
        .then(res => {
          setAuthor(res.data);
          setIsAuthorLoaded(true);
        })
      }
      fetchAuthor()
    }
  }, [article])

  return(
    <>
    { isAuthorLoaded ?
      <>
        <nav className='xl:w-80 hidden xl:block'>
          <div className='fixed w-60 flex flex-col text-white h-screen mt-20 2xl:ml-8 xl:p-2'>
            <div className='flex flex-col mb-5'>
              <div className='flex flex-col items-center'>
                <img
                  className='w-40 h-40 rounded-full'
                  src={author.avatar}
                  alt=""
                />
                <p className='text-xl font-bold mt-2'>
                  {author.username}
                </p>
                <button className='flex justify-center items-center bg-red-500 py-2 px-6 text-base button-animation w-full mt-5'>
                  Obserwuj
                </button>
              </div>
            </div>
            <hr className='my-4 border-gray-700' />
            <div className='mt-5 border border-gray-600 rounded-xl p-3 bg-second'>
              <h2 className='text-lg font-semibold'>Hashtagi artykułu</h2>
              <ul className='m-1 text-red-400'>
                {
                  article ?
                    article.hashtags.map(hash => {
                      return(
                        <li key={hash}>
                          <Link className='hover:underline' to={`/hashtags/${hash}`}>#{hash}</Link>
                        </li>
                      )
                    })
                  :
                    null
                }
              </ul>
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
                <div className='mt-4'>
                  <div className='mt-5 border border-gray-600 rounded-xl p-3 bg-second'>
                    <h2 className='text-lg font-semibold'>Ostatnie hashtagi</h2>
                    <ul className='m-1 text-red-400'>
                      {
                        article ?
                          article.hashtags.map(hash => {
                            return(
                              <li key={hash}>
                                <Link className='hover:underline' to={`/hashtags/${hash}`}>#{hash}</Link>
                              </li>
                            )
                          })
                        :
                          null
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        : null}
      </>
    :
      <SidemenuArticleLoading />
    }
    </>
  )
}

export default SidemenuArticle;