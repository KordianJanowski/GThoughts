import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle, IarticleBody } from '../models/models';
import { Link } from 'react-router-dom'
import ArticlesSorting from '../components/ArticlesSorting';
import ArticleSearching from '../components/ArticleSearching';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/articles`)
    .then(res => {
      setArticles(res.data)
      setArticlesCopy(res.data)
    })
    .catch( err => console.log(err))
  }, [])
  
  const articlesMap = articles.map((article: Iarticle) => {
    return (
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
        </div>
      </Link>
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