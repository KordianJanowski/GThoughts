import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../../API_URL'
import { Link } from 'react-router-dom'
import { Ihashtag, Iarticle } from '../../models/models';
import ArticleSearching from '.././ArticlesSearching';
import ArticlesSorting from '../../components/ArticlesSorting';
import { authorization, jwt } from '../../models/const-variables';
import SidemenuLoading from './SidemenuLoading';
import { FormattedMessage } from 'react-intl';

type Props = {
  articles: Iarticle[];
  setArticles: React.Dispatch<React.SetStateAction<Iarticle[]>>
}

const Sidemenu: React.FC<Props> = ({ articles, setArticles }) =>{
  const [popularHashtags, setPopularHashtags] = useState<Ihashtag[]>([{name: '', counter: 0}]);
  const [recentHashtags, setRecentHashtags] = useState<string[]>([]);
  const[isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const[isSideMenuAnimateUsed, setIsSideMenuAnimateUsed] = useState<boolean | null>(null);
  const[hashtagResponse, setHashtagResponse] = useState<boolean>(false);

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
    const fetchPopularHashtags = async () => {
      await axios.get(`${API_URL}/hashtags`).then(res => {
        const hashtagsCopy:Ihashtag[] = res.data
        setPopularHashtags(hashtagsCopy.sort((a, b) => b.counter - a.counter ))
        if(!jwt){
          setHashtagResponse(true);
        }
      })
    }
    const fetchRecentHashtags = async () => {
      if(jwt){
        await axios.get(`${API_URL}/users/me`, authorization).then(res => {
          setRecentHashtags(res.data.recent_hashtags);
          setHashtagResponse(true);
        })
      }
    }

    fetchPopularHashtags()
    fetchRecentHashtags()// eslint-disable-next-line
  }, []);

  // mapping only 3 first elements of popular hashtags array
  const popularHashtagsMap = popularHashtags.slice(0, 3).map(hash => {
    return(
      <li key={hash.name}>
        <Link className='hover:underline' to={`/hashtags/${hash.name}`}>#{hash.name}</Link>
      </li>
    )
  })

  // mapping only 3 first elements of recent hashtags array
  const recentHashtagsMap = recentHashtags.slice(0, 3).map(hash => {
    return(
      <li key={hash}>
        <Link className='hover:underline' to={`/hashtags/${hash}`}>#{hash}</Link>
      </li>
    )
  })

  return(
    <>
      { !hashtagResponse ?
        <SidemenuLoading />
      :
        <>
          <nav className='sidemenu-wrapper'>
            <div className='sidemenu-main md:items-start'>
              <ArticleSearching articles={articles} setArticles={setArticles} toggleSidemenu={toggleSidemenu}/>
              <ArticlesSorting articles={articles} setArticles={setArticles} />
              <div className='sidemenu-hash-box mt-5'>
                <h2 className='text-lg font-semibold'><FormattedMessage id='popularHashtags'/></h2>
                <ul className='m-1 text-red-400'>
                  {
                    popularHashtags.length > 0 ?
                      popularHashtagsMap
                    :
                      <span className='text-gray-500'><FormattedMessage id='noHashtags'/></span>
                  }
                </ul>
              </div>
              <div className='sidemenu-hash-box mt-5'>
                <h2 className='text-lg font-semibold'><FormattedMessage id='recentHashtags'/></h2>
                <ul className='m-1 text-red-400'>
                  { jwt ?
                    <>
                      {
                        recentHashtags.length > 0 ?
                          recentHashtagsMap
                        :
                          <span className='text-gray-500'><FormattedMessage id='noHashtags'/></span>
                      }
                    </>
                  :
                    <div className='text-gray-500 w-40'>
                      <Link to='login' className='font-bold hover:text-red-400 transform duration-50'>
                        <FormattedMessage id='loginButton'/>
                      </Link>
                      <FormattedMessage id='toSeeRecentHashtags'/>
                    </div>
                  }
                </ul>
              </div>
            </div>
          </nav>
          {/* -------------------------------------------------- mobile */}
          <nav className='w-1/12 block xl:hidden'>
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
                    <ArticleSearching articles={articles} setArticles={setArticles} toggleSidemenu={toggleSidemenu} />
                    <ArticlesSorting articles={articles} setArticles={setArticles} />
                    <div className='w-full bg-second border border-gray-600 rounded-xl mt-5 p-3'>
                      <h2 className='text-lg font-semibold'><FormattedMessage id='popularHashtags'/></h2>
                      <ul className='m-1 text-red-400'>
                        {
                          popularHashtags.length > 0 ?
                            popularHashtagsMap
                          :
                            <span className='text-gray-500'><FormattedMessage id='noHashtags'/></span>
                        }
                      </ul>
                    </div>
                    <div className='w-full bg-second border border-gray-600 rounded-xl mt-5 p-3'>
                      <h2 className='text-lg font-semibold'><FormattedMessage id='recentHashtags'/></h2>
                      <ul className='m-1 text-red-400'>
                        { jwt ?
                          <>
                            {
                              recentHashtags.length > 0 ?
                                recentHashtagsMap
                              :
                                <span className='text-gray-500'><FormattedMessage id='noHashtags'/></span>
                            }
                          </>
                        :
                          <div className='text-gray-500 w-40'>
                            <Link to='login' className='font-bold hover:text-red-400 transform duration-50'>
                              <FormattedMessage id='loginButton'/>
                            </Link>
                            <FormattedMessage id='toSeeRecentHashtags'/>
                          </div>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          : null}
        </>
      }
    </>
  )
}

export default Sidemenu;