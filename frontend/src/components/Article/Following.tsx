import React, { useEffect, useState } from 'react'
import axios from 'axios'

import API_URL from '../../API_URL'
import { Iarticle, Ifollowed } from '../../models/models'
import { authorization, user } from '../../models/const-variables'
import { Link } from 'react-router-dom'

type Props = {
  route: string
  article: Iarticle,
  followeds: Ifollowed[],
  fetchFolloweds: () => void
}

const Following: React.FC<Props> = ({ route, article, followeds, fetchFolloweds }) =>{
  const[isFollowed, setIsFollowed] = useState<boolean>(false);
  const[followedId, setFollowedId] = useState<string | undefined>('');

  const checkFolloweds = () =>{
    const isExist: number = followeds.findIndex(followed => followed.author_id === article.author_id);

    if(isExist >= 0){
      setFollowedId(followeds[isExist].id);
      setIsFollowed(true);
    } else{
      setFollowedId('');
      setIsFollowed(false);
    }
  }

  useEffect(() =>{
    checkFolloweds()// eslint-disable-next-line
  }, [followeds])

  const follow = async () =>{
    const data: Ifollowed = {
      author_id: article.author_id,
      user_id: user.id
    }

    setIsFollowed(true);
    await axios.post(`${API_URL}/followeds`, data, authorization)
    .then(res =>{
      setFollowedId(res.data.id)
      fetchFolloweds()
    })
    .catch(err => console.log(err));
  }

  const unFollow = async () =>{
    setIsFollowed(false);
    setFollowedId('');
    await axios.delete(`${API_URL}/followeds/${followedId}`, authorization)
    .then(() => fetchFolloweds())
    .catch(err => console.log(err))
  }

  return(
    <Link
      to={route}
      onClick={isFollowed ? unFollow : follow}
      className={route.includes('/articles') ? 'rounded-button w-full' : 'like-follow-button'}
    >
      {
        isFollowed ?
          route.includes('/article') ?
          <p>Przestań obserwować</p>
          :
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <div className="like-follow-button-sub-comment">
              Przestań obserwować użytkownika
            </div>
          </>
        :
          route.includes('/article') ?
          <p>Obserwuj użytkownika</p>
          :
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <div className="like-follow-button-sub-comment">
              Obserwuj użytkownika
            </div>
          </>
      }
    </Link>
  )
}

export default Following;