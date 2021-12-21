import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle, Iliked, Ifollowed } from '../models/models';
import { user, jwt } from '../models/const-variables';
import ArticlesSorting from '../components/ArticlesSorting';
import ArticleSearching from '../components/ArticlesSearching';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenu';
import Article from '../components/Article/Article';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])

  const[likeds, setLikeds] = useState<Iliked[]>([])
  const[followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds= async () =>{
    if(jwt){
      await axios.get(`${API_URL}/followeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => setFolloweds(res.data))
      .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    const fetchArticlesData = async () =>{
      if(jwt){
        await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
        .then(res => {
          setLikeds([...res.data])
          console.log(res)
        })
        .catch(err => console.log(err))
      }

      fetchFolloweds()

      await axios.get(`${API_URL}/articles`)
      .then(res => {
        setArticles(res.data)
        setArticlesCopy(res.data)
      })
      .catch( err => console.log(err))
    }
    fetchArticlesData();
  }, [])

  // const articlesMap = articles.map((article: Iarticle) => {
  //   return (
  //     <Article
  //       key={article.id}
  //       article={article}
  //       route='/'
  //       toggleDeleteArticleLayer={() =>{}}
  //       likeds={likeds}
  //       followeds={followeds}
  //       fetchFolloweds={fetchFolloweds}
  //     />
  //   )
  // })

  return(
    <div className='relative w-full xl:w-auto flex flex-row justify-between px-28;'>
      <Navbar />
      <div className='w-9/12 xl:w-auto main border-l border-r border-gray-600'>
        <div className='main-header'>
          <h2 className='main-header-text'>Główna</h2>
        </div>
        <div className='main-content w-full'>
          {
            articles.length !== 0 ?
              // articlesMapd
              <div></div>
            :
              <p>Nie znaleziono żadnych artykułów</p>
          }
        </div>
      </div>
      <Sidemenu articles={articlesCopy} setArticles={setArticles} />
    </div>
  )
}

export default Home;