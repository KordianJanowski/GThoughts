import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Route, useHistory } from 'react-router-dom'

import { Iarticle, IarticleBody, Iliked } from '../models/models';
import API_URL from '../API_URL';

import ArticlesSorting from '../components/ArticlesSorting';
import ArticleSearching from '../components/ArticleSearching';
import Article from '../components/Article';

import { user, jwt } from '../models/const-variables';
const Saved: React.FC = () =>{
  const history: any = useHistory();

  const [articles, setArticles] = useState<Iarticle[]>([])
  const [likeds, setLikeds] = useState<Iliked[]>([])

  useEffect(() => {
    if(!jwt) return history.push('/login')

    const fetchArticlesData = async () =>{
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(async res => {
        setLikeds(res.data);
        console.log(res)
        await res.data.forEach(async (liked: Iliked) =>{
          await axios.get(`${API_URL}/articles/${liked.article_id}`)
          .then(async articleRes => setArticles((prevArticles: Iarticle[]) => [...prevArticles, articleRes.data]))
          .catch(err => console.log(err))
        })
      })
      .catch(err => console.log(err))
    }
    fetchArticlesData();
  }, [])

  const articlesMap = articles.map((article: Iarticle) => {
    return (
      <Article
        article={article}
        route='/saved'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
      />
    )
  })

  return(
    <div>
      {articlesMap}
    </div>
  )
}

export default Saved;