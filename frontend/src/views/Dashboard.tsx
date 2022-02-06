import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import API_URL from '../API_URL';
import { Iarticle } from '../models/models';
import { jwt, authorization } from '../models/const-variables';
import { FormattedMessage } from 'react-intl';
import { user } from './../models/const-variables';
import SidemenuDashboard from '../components/Sidemenus/SidemenuDashboard';
import Article from '../components/Article/Article';
import ApproveLayer from '../components/ApproveLayer';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination'

interface Props {
  page: string;
}

const Dashboard:React.FC = () =>{
  let page:string = useParams<Props>().page;
  const history: any = useHistory();
  const [articles, setArticles] = useState<Iarticle[]>([]);
  const [numberOfArticles, setNumberOfArticles] = useState<number>();
  const [selectedArticleID, setSelectedArticleID] = useState<string>('');
  const [isDeleteLayerShow, setIsDeleteLayerShow] = useState<boolean>(false);
  const [articleResponse, setArticleResponse] = useState<boolean>(false);

  const fetchArticles = async () =>{
    setArticleResponse(false);

    await axios.get(`${API_URL}/authors-articles/${user.id}`, { headers: { page: page ? page : '1' }})
    .then(res =>{
      setArticles(res.data.articles);
      setArticleResponse(true);
      setNumberOfArticles(res.data.numberOfArticles)
    })
  }

  const toggleDeleteArticleLayer = (id:string) =>{
    setSelectedArticleID(id)
    setIsDeleteLayerShow(!isDeleteLayerShow);
  }

  const deleteArticle = async () =>{
    await axios.delete(`${API_URL}/articles/${selectedArticleID}`, authorization)
    .then(() => {
      const index = articles.findIndex((article: Iarticle) => article.id === selectedArticleID);
      const newArticles: Iarticle[] = articles;
      newArticles.splice(index,1)

      setArticles(newArticles)
      toggleDeleteArticleLayer('')
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(!jwt) return history.push('/login');

    fetchArticles()// eslint-disable-next-line
  }, [])

  const articlesMap = articles.map((article: Iarticle) =>{
    return (
      <Article
        article={article}
        route='/dashboard'
        toggleDeleteArticleLayer={toggleDeleteArticleLayer}
        likeds={[]}
        followeds={[]}
        fetchFolloweds={() => {}}
        key={article.id}
      />
    )
  })

  return(
    <>
      {
        jwt ?
          isDeleteLayerShow ?
            <ApproveLayer
              id={selectedArticleID}
              toggleLayer={toggleDeleteArticleLayer}
              approve={deleteArticle}
            />
            :
            <div className='wrapper'>
              <Navbar />
              <div className='main'>
                <div className='main-header'>
                  <h2 className='main-header-text'><FormattedMessage id='panel'/></h2>
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
                  defaultRoute={`/dashboard/`}
                />
              </div>
              <SidemenuDashboard />
            </div>
        :
          null
      }
    </>
  )
}

export default Dashboard