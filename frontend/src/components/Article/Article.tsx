import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom'
import axios from 'axios';

import API_URL from '../../API_URL';
import { authorization, user, jwt } from '../../models/const-variables';
import { Iarticle, IarticleBody, Iliked, Ifollowed, Iuser } from '../../models/models';
import Liking from './Liking';
import Following from './Following';

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
  const[author, setAuthor] = useState<Iuser>({id: '', username: '', email: '', avatar: '' });

  useEffect(() => {
    const fetchAuthorAvatar = async () => {
      await axios.get(`${API_URL}/users/${article.author_id}`)
      .then(res => setAuthor(res.data))
    }
    fetchAuthorAvatar()
  }, [])

  return(
    <div>
      <Link to={`/articles/${article.id}`} key={article.id}>
        <div className='flex flex-row justify-between p-5 mb-4'>
          <div className='flex flex-col justify-between w-full'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row items-center'>
                <img
                  className='w-8 h-8 rounded-full mr-2'
                  src={author.avatar}
                  alt=""
                />
                <div className='flex flex-col text-gray-300'>
                  <span className='font-semibold'>{ article.author_name }</span>
                  <span className='text-xs text-gray-400'>04.12.2021</span>
                </div>
              </div>
              <div>
                { jwt && article.author_id !== user.id ?
                  <div>
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
                  <div>
                    <Link to='/dashboard' onClick={() => toggleDeleteArticleLayer(article.id)} className=' text-red-600'>
                      delete
                    </Link>
                    <button className= ' text-blue-600'>
                      edit
                    </button>
                  </div>
                : null}
              </div>
            </div>
            <div className='text-2xl font-bold'>
              <textarea className='w-full bg-transparent font-bold resize-none' disabled>
                { article.title }
              </textarea>
            </div>
            <span className='text-gray-400'>{ article.body[0].body.substr(0,50) + '...' }</span>
          </div>
          <img
            className='w-56 ml-8'
            src="https://archive.org/download/no-photo-available/no-photo-available.png"
            alt=""
          />
        </div>
      </Link>
    </div>
  )
}

export default Article;