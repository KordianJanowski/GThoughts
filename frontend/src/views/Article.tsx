import React, { useEffect, useState } from 'react';
import axios from 'axios'
import API_URL from '../API_URL';
import { useParams } from 'react-router-dom';
import { Iarticle } from '../models/models'
import { jwt, authorization, user } from '../models/const-variables'
import Navbar from '../components/Navbar';
import SidemenuArticle from '../components/Sidemenus/SidemenuArticle';
import Comments from '../components/Article/Comments/Comments';
import Feedbacks from '../components/Article/Feedbacks/Feedbacks';
import { LOCALES } from '../i18n';

interface Props {
  id: string;
}

const Article:React.FC = () =>{
  const id: string = useParams<Props>().id;
  const [article, setArticle] = useState<Iarticle>();
  const [isArticleExist, setIsArticleExist] = useState<boolean>(false);
  const [commentsActive, setCommentsActive] = useState<boolean>(true);
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  useEffect(() => {
    const fetchArticle = async () =>{
      await axios.get(`${API_URL}/articles/${id}`)
      .then(res => {
        setArticle(res.data);
        setIsArticleExist(true);
      })
      .catch(err => console.log(err))
    }
    fetchArticle()// eslint-disable-next-line
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
            if(userRecentHashtags.length > 3) {
              userRecentHashtags.pop()
            }
          } else {
            const index = userRecentHashtags.findIndex(el => el === hashtag)
            userRecentHashtags.splice(index, 1)
            userRecentHashtags.unshift(hashtag)
          }
        })

        await axios.put(`${API_URL}/users/me`, {recent_hashtags: userRecentHashtags}, authorization)
        .catch(err => console.log(err))
      }

      if(jwt) fetchUserRecentHashtags()
    }// eslint-disable-next-line
  }, [isArticleExist])

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='mt-10 flex flex-col xl:flex-row items-center justify-between'>
          <h2 className='main-header-text font-bold'>{ article?.title }</h2>
          <img
            className='w-full md:w-4/5 xl:w-3/5 xl:ml-2 xl:mt-0'
            src={article?.main_image}
            alt=''
          />
        </div>
        <div
          className='main-content text-xl xl:text-2xl pt-8 mt-5 xl:mt-7 mb-8'
          dangerouslySetInnerHTML={{__html: article?.body.html!}}>
        </div>
        <div className='main-content pb-7'>
          <hr className='border-t border-gray-800' />
          <select
            onChange={() => setCommentsActive(!commentsActive)}
            className='bg-second text-2xl my-5 -ml-1 focus:outline-none w-40'
          >
            <option value="comments">{isI18NisEnglish ? 'Comments' : 'Komentarze'}</option>
            <option value="feedbacks">{isI18NisEnglish ? 'Feedbacks' : 'Feedbacki'}</option>
          </select>
          {
            commentsActive ?
              <Comments articleId={id} />
            :
              <Feedbacks articleId={id} />
          }
        </div>
      </div>
      <SidemenuArticle article={article!} />
    </div>
  )
}

export default Article;