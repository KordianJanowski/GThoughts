import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../../API_URL'
import { user, jwt, authorization_user_id } from '../../models/const-variables'
import { Link } from 'react-router-dom'
import { Iuser, Iarticle, Iliked, Ifollowed } from '../../models/models';
import SidemenuArticleLoading from './SidemenuArticleLoading';
import Liking from '../Article/Liking'
import Following from '../Article/Following'
import { FormattedMessage } from 'react-intl';

type Props = {
  article: Iarticle;
  toggleReportLayer: () => void 
}

const SidemenuArticle: React.FC<Props> = ({ article, toggleReportLayer }) =>{
  const[isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const[isSideMenuAnimateUsed, setIsSideMenuAnimateUsed] = useState<boolean | null>(null);
  const[author, setAuthor] = useState<Iuser>({id: '', username: '', email: '', avatar: '', createdAt: '' });
  const[isAuthorLoaded, setIsAuthorLoaded] = useState<boolean>(false);
  const[likeds, setLikeds] = useState<Iliked[]>([]);
  const[followeds, setFolloweds] = useState<Ifollowed[]>([]);
  
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

  const fetchFolloweds= async () =>{
    if(jwt) {
      await axios.get(`${API_URL}/followeds`, authorization_user_id)
      .then(res => setFolloweds(res.data))
      .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    const fetchArticlesData = async () =>{
      if(jwt){
        await axios.get(`${API_URL}/likeds`, authorization_user_id)
        .then(res => setLikeds(res.data))
        .catch(err => console.log(err))
      }
    }
    fetchArticlesData();
    fetchFolloweds()

  }, [])

  return(
    <>
      { isAuthorLoaded ?
        <>
          <nav className='sidemenu-wrapper'>
            <div className='sidemenu-main'>
              <img
                className='w-40 h-40 rounded-full'
                src={author.avatar}
                alt=""
              />
              <p className='text-xl font-bold mt-2'>
                {author.username}
              </p>
              { jwt && article.author_id !== user.id ?
                <div className='w-full hidden xl:flex flex-col items-center mt-5'>
                  <Following
                    route={`/articles/${article.id}`}
                    article={article}
                    followeds={followeds}
                    fetchFolloweds={fetchFolloweds}
                  />
                  <Liking
                    route={`/articles/${article.id}`}
                    article={article}
                    likeds={likeds}
                  />
                  <div
                    onClick={toggleReportLayer}
                    className='flex justify-center items-center bg-red-900 py-2 px-6 text-lg button-animation rounded-full cursor-pointer w-full mt-2'
                  >
                    <p><FormattedMessage id='report'/></p>
                  </div>
                </div>
              : null}
              <hr className='sidemenu-hr' />
              <div className='sidemenu-hash-box'>
                <h2 className='text-lg font-semibold'><FormattedMessage id='articleHashtags'/></h2>
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
                  
                  <div className='flex flex-col items-center'>
                    <img
                      className='w-40 h-40 rounded-full'
                      src={author.avatar}
                      alt=""
                    />
                    <p className='text-xl font-bold mt-2'>
                      {author.username}
                    </p>
                    { jwt && article.author_id !== user.id ?
                      <div className='w-full md:w-1/2 flex xl:hidden flex-col items-center mt-5'>
                        <Following
                          route={`/articles/${article.id}`}
                          article={article}
                          followeds={followeds}
                          fetchFolloweds={fetchFolloweds}
                        />
                        <Liking
                          route={`/articles/${article.id}`}
                          article={article}
                          likeds={likeds}
                        />
                        <div
                          onClick={toggleReportLayer}
                          className='flex justify-center items-center bg-red-900 py-2 px-6 text-lg button-animation rounded-full cursor-pointer w-full mt-2'
                        >
                          <p><FormattedMessage id='report'/></p>
                        </div>
                      </div>
                    : null}
                  </div>
                  <hr className='sidemenu-hr' />
                  <div className='sidemenu-hash-box mt-4'>
                    <h2 className='text-lg font-semibold'><FormattedMessage id='recentHashtags'/></h2>
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