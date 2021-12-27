import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL';
import axios from 'axios'
import { Iarticle, Ifollowed, Iliked } from '../models/models';
import { user, jwt } from '../models/const-variables';
import { useHistory } from 'react-router-dom'
import Article from '../components/Article/Article';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenu';

const Saved: React.FC = () =>{
  const history: any = useHistory();

  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])

  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds = async () =>{
    await axios.get(`${API_URL}/followeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(!jwt) return history.push('/login')

    const fetchArticlesData = async () =>{
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => setLikeds(res.data))
      .catch(err => console.log(err))

      fetchFolloweds()

      await axios.get(`${API_URL}/followeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(async res => {
        let followedsArticlesIds: string[][] = [];
        let isForEachEnded: boolean = false;

        await res.data.forEach(async (followed: Ifollowed) =>{
          await axios.get(`${API_URL}/users/${followed.author_id}`)
          .then(responseUser =>{
            followedsArticlesIds.push(responseUser.data.articles_ids);
            if(followedsArticlesIds.length === res.data.length) isForEachEnded = true
          })
          .catch(err => console.log(err))

          if(isForEachEnded){
            followedsArticlesIds.forEach((followedArticlesIds: string[]) =>{
              if(followedArticlesIds.length === 0) return
              followedArticlesIds.forEach(async (article_id: string) =>{
                await axios.get(`${API_URL}/articles/${article_id}`)
                .then(res => {
                  setArticles(prev => [...prev, res.data]);
                  setArticlesCopy(prev => [...prev, res.data]);
                })
                .catch(err => console.log(err))
              })
            })
          }
        })
      })
      .catch(err => console.log(err))
    }
    fetchArticlesData();// eslint-disable-next-line
  }, [])

  const articlesMap = articles.map((article: Iarticle) => {
    return (
      <Article
        article={article}
        route='/followeds'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
        followeds={followeds}
        fetchFolloweds={fetchFolloweds}
        key={article.id}
      />
    )
  })

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='main-header'>
          <h2 className='main-header-text'>Zapisane</h2>
        </div>
        <div className='main-content'>
          {
            articles.length !== 0 ?
              articlesMap
            :
              <p>Nie znaleziono żadnych artykułów</p>
          }
        </div>
      </div>
      <Sidemenu articles={articlesCopy} setArticles={setArticles} />
    </div>
  )
}

export default Saved;
