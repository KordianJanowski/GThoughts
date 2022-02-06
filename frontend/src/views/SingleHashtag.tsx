import React, { useState, useEffect } from 'react'
import { useParams, withRouter } from 'react-router-dom';
import API_URL from '../API_URL'
import axios from 'axios'
import { Iarticle, Iliked, Ifollowed } from '../models/models';
import { jwt, authorization_user_id } from '../models/const-variables';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenus/Sidemenu';
import Article from '../components/Article/Article';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination'

interface Props {
  hashtag:string;
  page: string;
}

const Home: React.FC = () => {
  const hashtag:string = useParams<Props>().hashtag;
  const page:string = useParams<Props>().page;
  const history: any = useHistory();
  const [articles, setArticles] = useState<Iarticle[]>([])
  const [articlesCopy, setArticlesCopy] = useState<Iarticle[]>([])
  const [articleResponse, setArticleResponse] = useState<boolean>(false);
  const [numberOfArticles, setNumberOfArticles] = useState<number>();
  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])
  const [hashtagExists, setHashtagExists] = useState<boolean>(false);

  const fetchArticles = async () => {
    setArticleResponse(false);

    await axios.get(`${API_URL}/articles`, { headers: { hash_name: hashtag, page: page ? page : '1' } })
    .then(res => {
      setArticles(res.data.articles);
      setArticlesCopy(res.data.articles);
      setArticleResponse(true);
      setNumberOfArticles(res.data.numberOfArticles);
    })
    .catch( err => console.log(err))
  }

  const fetchFolloweds= async () => {
    await axios.get(`${API_URL}/followeds`, authorization_user_id)
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  const fetchLikeds = async () => {
    await axios.get(`${API_URL}/likeds`, authorization_user_id)
    .then(res => setLikeds(res.data))
    .catch(err => console.log(err))
  }

  const checkIfHashtagExists = async () => {
    await axios.get(`${API_URL}/hashtags`, { headers: { data_type: 'array' } })
    .then(res => {
      const allHashtags:string[] = res.data

      if(allHashtags.includes(hashtag)) setHashtagExists(true)
      else history.push('/')
    })
  }

  useEffect(() => {
    if(hashtagExists) {
      if(jwt){
        fetchLikeds();
        fetchFolloweds();
      }
      fetchArticles();
    }
    checkIfHashtagExists();
    /* eslint-disable */
  }, [hashtag, hashtagExists])

  const articlesMap = articles.map((article: Iarticle) => {
    return (
      <Article
        key={article.id}
        article={article}
        route='/'
        toggleDeleteArticleLayer={() =>{}}
        likeds={likeds}
        followeds={followeds}
        fetchFolloweds={fetchFolloweds}
      />
    )
  })

  return(
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <div className='main-header'>
          <h2 className='main-header-text'>Hashtag: <span className='text-red-400 font-bold'>{hashtag}</span></h2>
        </div>
        <div className='main-content'>
          { articleResponse ?
            <div>
              {
                articles.length !== 0 ?
                  articlesMap
                :
                  <p><FormattedMessage id='noArticlesFound'/></p>
              }
            </div>
          :
            <Loading />
          }
        </div>
        <Pagination
          page={parseInt(page) ? parseInt(page) : 1}
          numberOfArticles={numberOfArticles!}
          fetchArticles={fetchArticles}
          defaultRoute={`/hashtags/${hashtag}/`}
        />
      </div>
      <Sidemenu articles={articlesCopy} setArticles={setArticles} />
    </div>
  )
}

export default withRouter(Home);