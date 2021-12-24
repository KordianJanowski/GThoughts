import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import API_URL from '../../API_URL';
import { user, jwt } from '../../models/const-variables';
import { Iarticle, Iliked, Ifollowed, Iuser } from '../../models/models';
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
        <div className='flex flex-col md:flex-row items-start justify-start lg:justify-between px-2 mb-4 py-2'>
          <div className='flex flex-col items-start justify-start w-full'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row items-center'>
                <img
                  className='w-8 h-8 rounded-full mr-2'
                  src={author.avatar}
                  alt=""
                />
                <div className='flex flex-col text-gray-300'>
                  <span className='font-semibold'>{ article.author_name }</span>
                  <span className='text-xs text-gray-400'>{ article.createdAt.substr(0,10) }</span>
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
                    <Link to='/dashboard' onClick={() => toggleDeleteArticleLayer(article.id)} className=' text-red-500'>
                      delete
                    </Link>
                    <button className= ' text-blue-500'>
                      edit
                    </button>
                  </div>
                : null}
              </div>
            </div>
            <div className='w-full bg-transparent font-bold h-auto text-xl md:text-2xl my-2'>
              {article.title}
            </div>
            <div>
              {article.body.blocks[0]}
            </div>
          </div>

          {article.main_image ?
            <img
              className='max-w-full md:w-52 lg:w-80 lg:ml-8 border-2 border-gray-600 lg:block mt-2 lg:mt-0'
              src={article.main_image}
              alt=""
            />
          :
            <img
              className='max-w-full lg:max-w-min md:w-52 lg:w-72 lg:ml-8 border-2 border-gray-600 mt-2 lg:mt-0'
              src="https://archive.org/download/no-photo-available/no-photo-available.png"
              alt=""
            />
          }
        </div>
      </Link>
    </div>
  )
}

export default Article;