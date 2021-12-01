import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle, IarticleBody, Iliked } from '../models/models';
import ArticlesSorting from '../components/ArticlesSorting';
import ArticleSearching from '../components/ArticleSearching';
import Article from '../components/Article';
import { user, jwt } from '../models/const-variables';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])

  const [likeds, setLikeds] = useState<Iliked[]>([])

  useEffect(() => {
    const fetchArticlesData = async () =>{
      if(jwt){
        await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
        .then(res => setLikeds(res.data))
        .catch(err => console.log(err))
      }
      await axios.get(`${API_URL}/articles`)
      .then(res => {
        setArticles(res.data)
        setArticlesCopy(res.data)
      })
      .catch( err => console.log(err))
    }
    fetchArticlesData();
  }, [])

  const articlesMap = articles.map((article: Iarticle) => {
    return (
      <Article
        key={article.id}
        article={article}
        route='/'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
      />
    )
  })

  return(
    <div className='absolute top-0 left-1/2 min-h-full flex flex-col items-center px-10 bg-second transform -translate-x-1/4'>
      <div className='w-full border-b border-blue-500 mb-3'>
        <h2 className='my-5 text-3xl'>Główna</h2>
      </div>
      <div className='flex flex-col-reverse'>
        {
          articles.length !== 0 ?
            articlesMap
          :
            <p>Nie znaleziono żadnych artykułów</p>
        }
      </div>
      <div className='flex flex-row'>
        <ArticleSearching articlesCopy={articlesCopy} setArticles={setArticles} />
        <ArticlesSorting articles={articles} setArticles={setArticles} />
      </div>
    </div>
  )
}

export default Home;