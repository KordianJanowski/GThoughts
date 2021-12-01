import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom'
import axios from 'axios';

import API_URL from '../API_URL';
import { authorization, user, jwt } from '../models/const-variables';
import { Iarticle, IarticleBody, Iliked, Iuser } from '../models/models';

type Props = {
  article: Iarticle;
  route: string;
  toggleDeleteArticleLayer: (id: string) => void;
  likeds: Iliked[];
}

const Article: React.FC<Props> = ({ article, route, toggleDeleteArticleLayer, likeds }) =>{
  const[isLiked, setIsLiked] = useState<boolean>(false);
  const[likedId, setLikedId] = useState<string | undefined>('');
  const[author, setAuthor] = useState<Iuser>({id: '', username: '', email: '', avatar: '' });

  useEffect(() => {
    const fetchAuthorAvatar = async () => {
      await axios.get(`${API_URL}/users/${article.author_id}`)
      .then(res => {
        setAuthor(res.data)
      })
    }
    fetchAuthorAvatar()

    if(jwt){
      likeds.forEach((liked: Iliked) => {
        if(liked.article_id === article.id){
          setIsLiked(true);
          setLikedId(liked.id);
        }
      })
    }

  }, [])

  const like = async () =>{
    const data: Iliked = {
      article_id: article.id,
      user_id: user.id
    }

    setIsLiked(true);
    await axios.post(`${API_URL}/likeds`, data, authorization)
    .then(res => setLikedId(res.data.id))
    .catch(err => console.log(err));
  }

  const unLike = async () =>{
    setIsLiked(false)
    await axios.delete(`${API_URL}/likeds/${likedId}`, authorization)
    .catch(err => console.log(err))
  }

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
                    { !isLiked ?
                      <Link to={route}>
                        <svg onClick={like} className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </Link>
                      :
                      <Link to={route}>
                        <svg onClick={unLike} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    }
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