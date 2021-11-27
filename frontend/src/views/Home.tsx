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
        article={article}
        route='/'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
      />
    )
  })

  return(
    <>
      <header className='w-full h-96 my-10 bg-gray-800 text-white flex items-center justify-center'>
        <h1 className='text-3xl font-thin grid grid-cols-1 gap-2'>
          <span>write.</span>
          <span>read.</span>
          <span>learn.</span>
        </h1>
      </header>
      <div className='flex flex-col items-center'>
        <div className='flex flex-row'>
          <ArticleSearching articlesCopy={articlesCopy} setArticles={setArticles} />
          <ArticlesSorting articles={articles} setArticles={setArticles} />
        </div>
        <div>
          {
            articles.length !== 0 ?
              articlesMap
            :
              <p>Nie znaleziono żadnych artykułów</p>
          }
        </div>
      </div>
    </>
  )
}

export default Home;