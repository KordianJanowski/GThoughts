import React, { useEffect, useState } from 'react'
import axios from 'axios'

import API_URL from '../../API_URL'
import { Iarticle, Iliked } from '../../models/models'
import { authorization, user } from '../../models/const-variables'
import { Link } from 'react-router-dom'

type Props = {
  route: string
  article: Iarticle
  likeds: Iliked[]
}

const Liking: React.FC<Props> = ({ route, article, likeds }) =>{
  const[isLiked, setIsLiked] = useState<boolean>(false);
  const[likedId, setLikedId] = useState<string | undefined>('');

  useEffect(() =>{
    likeds.forEach((liked: Iliked) => {
      if(liked.article_id === article.id){
        setIsLiked(true);
        setLikedId(liked.id);
      }
    })// eslint-disable-next-line
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
    <Link
      to={route}
      onClick={isLiked ? unLike : like}
      className={route.includes('/articles') ? 'rounded-button w-full mt-2' : 'like-follow-button'}
    >
      {
        isLiked ?
          route.includes('/article') ?
          <p>Przestań lubić</p>
          :
          <>
            <svg className="h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="like-follow-button-sub-comment">
              Przestań lubić artykuł
            </div>
          </>
        :
          route.includes('/article') ?
          <p>Polub artykuł</p>
          :
          <>
            <svg className="h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div className="like-follow-button-sub-comment">
              Polub artykuł
            </div>
          </>
      }
    </Link>
  )
}

export default Liking;