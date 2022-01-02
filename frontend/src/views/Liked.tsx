import React, { useState, useEffect } from 'react'
import API_URL from '../API_URL';
import axios from 'axios'
import { Iarticle, Ifollowed, Iliked } from '../models/models';
import { user, jwt } from '../models/const-variables';
import { useHistory } from 'react-router-dom'
import Article from '../components/Article/Article';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenus/Sidemenu';
import Loading from '../components/Loading';

const Saved: React.FC = () =>{
  const history: any = useHistory();

  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])

  const[articleResponse, setArticleResponse] = useState<boolean>(false);

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
      fetchFolloweds()

      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(async res => {
        setLikeds(res.data);
        if(res.data.length === 0){
          setArticleResponse(true)
        }

        let responseCounter: number = 0;

        await res.data.forEach(async (liked: Iliked) =>{
          await axios.get(`${API_URL}/articles/${liked.article_id}`)
          .then(async articleRes => {
            setArticles(prevArticles => [...prevArticles, articleRes.data]);
            setArticlesCopy(prevArticles => [...prevArticles, articleRes.data]);
            responseCounter++;
            if(responseCounter === res.data.length){
              setArticleResponse(true)
            }
          })
          .catch(err => console.log(err))
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
        route='/liked'
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
          <h2 className='main-header-text'>Polubione</h2>
        </div>
        <div className='main-content'>
          { articleResponse ?
            <div>
              {
                articles.length !== 0 ?
                  articlesMap
                :
                  <p>Nie masz żadnych zapisanych artykułów</p>
              }
            </div>
          :
            <Loading />
          }
        </div>
      </div>
      <Sidemenu articles={articlesCopy} setArticles={setArticles} />
    </div>
  )
}

export default Saved;
