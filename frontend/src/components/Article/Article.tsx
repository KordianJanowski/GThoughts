import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import API_URL from '../../API_URL';
import { user, jwt } from '../../models/const-variables';
import { Iarticle, Iliked, Ifollowed, Iuser } from '../../models/models';
import Liking from './Liking';
import Following from './Following';
import userLoadingAvatar from '../../images/user.png'

type Props = {
  article: Iarticle;
  route: string;
  toggleDeleteArticleLayer: (id: string) => void;
  likeds: Iliked[];
  followeds: Ifollowed[];
  fetchFolloweds: () => void
}

const Article: React.FC<Props> = ({
  article,
  route,
  toggleDeleteArticleLayer,
  likeds,
  followeds,
  fetchFolloweds,
}) =>{
  const[author, setAuthor] = useState<Iuser>({id: '', username: '', email: '', avatar: '', createdAt: '' });

  useEffect(() => {
    const fetchAuthorAvatar = async () => {
      await axios.get(`${API_URL}/users/${article.author_id}`)
      .then(res => setAuthor(res.data))
    }
    fetchAuthorAvatar()// eslint-disable-next-line
  }, [])

  return(
    <div>
      <Link to={`/articles/${article.id}`} key={article.id}>
        <div className='flex flex-col lg:flex-row items-start justify-start lg:justify-between px-2 mb-4 py-2'>
          <div className='flex flex-col items-start justify-start w-full'>
            <div className='flex flex-col md:flex-row justify-between'>
              <div className='flex md:flex-row items-center'>
                <Link to={`/profiles-users/${article.author_id}`}>
                  <img
                    className='w-8 h-8 rounded-full hover:opacity-70 mr-2'
                    src={author.avatar ? author.avatar : userLoadingAvatar}
                    alt=""
                  />
                </Link>
                <div className='flex flex-col text-gray-300'>
                  <Link to={`/profiles-users/${article.author_id}`} className='font-semibold hover:opacity-70'>{ author.username }</Link>
                  <span className='text-xs text-gray-400 -mt-1'>{ article.createdAt?.substr(0,10) }</span>
                </div>
              </div>
              { jwt && article.author_id !== user.id ?
                <div className='flex flex-row'>
                  <Liking
                    route={route}
                    article={article}
                    likeds={likeds}
                  />
                  <Following
                    route={route}
                    article={article}
                    followeds={followeds}
                    fetchFolloweds={fetchFolloweds}
                  />
                </div>
              : null}
              { route === '/dashboard' ?
                <div className='md:ml-4 mt-2 flex flex-row'>
                  <Link to='/dashboard' className='' onClick={() => toggleDeleteArticleLayer(article?.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="trash-edit-button hover:border-red-500 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Link>
                  <Link to={`/edit-article/${article.id}`} className='ml-2'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="trash-edit-button hover:border-blue-500 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                </div>
              : null}
            </div>
            <span className='w-full md:w-3/4 lg:w-full bg-transparent font-bold h-auto text-xl md:text-2xl my-2'>{article.title}</span>
            <span className='w-full md:w-3/4 lg:w-full'>{ article.body!.blocks[0].substring(0,65) + (article.body!.blocks[0].length > 65 ? '...' : '') }</span>
          </div>
          {
            article.main_image ?
            <div
              className="article-image"
              style={{
                backgroundImage: `url("${article.main_image}")`
              }}
            ></div>
            :
            <div
              className="article-image"
              style={{
                backgroundImage: `url("https://archive.org/download/no-photo-available/no-photo-available.png")`
              }}
            ></div>
          }
        </div>
      </Link>
    </div>
  )
}

export default Article;