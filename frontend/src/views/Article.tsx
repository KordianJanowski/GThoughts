import React, { useEffect, useState } from 'react';
import axios from 'axios'
import API_URL from '../API_URL';
import { useParams } from 'react-router-dom';
import { Iarticle } from '../models/models'
import { jwt, authorization, user } from '../models/const-variables'
import AddFeedback from '../components/Article/Feedbacks/AddFeedback';
import Navbar from '../components/Navbar';
import SidemenuArticle from '../components/Sidemenus/SidemenuArticle';
import Comments from '../components/Article/Comments/Comments';

interface Props {
  id: string;
}

const Article:React.FC = () =>{
  const id: string = useParams<Props>().id;
  const [article, setArticle] = useState<Iarticle>();
  const [isArticleExist, setIsArticleExist] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () =>{
      await axios.get(`${API_URL}/articles/${id}`)
      .then(res => {
        setArticle(res.data);
        setIsArticleExist(true);
      })
      .catch(err => console.log(err))
    }
    fetchArticle()
  }, [])

  useEffect(() => {
    if(isArticleExist) {
      let userRecentHashtags:string[] = []

      const fetchUserRecentHashtags = async () => {
        await axios.get(`${API_URL}/users/${user.id}`)
        .then(res => {
          userRecentHashtags = res.data.recent_hashtags
          updateUserRecentHashtags()
        })
        .catch(err => console.log(err))
      }

      const updateUserRecentHashtags = async () => {
        article?.hashtags.forEach((hashtag: string) => {
          if(!userRecentHashtags.includes(hashtag)) {
            userRecentHashtags.unshift(hashtag)
            if(userRecentHashtags.length > 50) {
              userRecentHashtags.pop()
            }
          } else {
            const index = userRecentHashtags.findIndex(el => el === hashtag)
            userRecentHashtags.splice(index, 1)
            userRecentHashtags.unshift(hashtag)
          }
        })

        await axios.put(`${API_URL}/users/${user.id}`, {recent_hashtags: userRecentHashtags}, authorization)
        .catch(err => console.log(err))
      }

      if(jwt) fetchUserRecentHashtags()
    }
  }, [isArticleExist])

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='mt-10 flex flex-col xl:flex-row items-center justify-between'>
          <h2 className='main-header-text font-bold'>{ article?.title }</h2>
          <img
            className='w-160 ml-2'
            src={article?.main_image}
            alt=''
          />
        </div>
        <div
          dangerouslySetInnerHTML={{__html: article?.body.html!}}
          className='main-content text-xl xl:text-2xl pt-8 mt-10 mb-8'>
        </div>
        <Comments id={id} />
      </div>
      <SidemenuArticle article={article!} />
    </div>
  )
}

export default Article;