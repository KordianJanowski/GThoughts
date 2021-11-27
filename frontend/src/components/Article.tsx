import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom'
import axios from 'axios';

import API_URL from '../API_URL';
import { authorization, user, jwt } from '../models/const-variables';
import { Iarticle, IarticleBody, Iliked } from '../models/models';

type Props = {
  article: Iarticle;
  route: string;
  toggleDeleteArticleLayer: (id: string) => void;
  likeds: Iliked[];
}

const Article: React.FC<Props> = ({ article, route, toggleDeleteArticleLayer, likeds }) =>{
  const[isLiked, setIsLiked] = useState<boolean>(false);
  const[likedId, setLikedId] = useState<string | undefined>('');

  useEffect(() => {
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
    <Link to={`/articles/${article.id}`} key={article.id}>
      <div className='my-1 bg-gray-100 border-2'>
        <h1 className='text-4xl'>
          {article.title}
        </h1>
        { article.body.map((body: IarticleBody) =>{
          return (
            <div key={body.id}>
              <h1 className='text-2xl'>
                {body.subtitle}
              </h1>
              <p>
                {body.body}
              </p>
            </div>
          )
        }) }
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
    </Link>
  )
}

export default Article;