import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import API_URL from '../API_URL';
import Article from '../components/Article/Article';
import { authorization_user_id, jwt, user } from '../models/const-variables';
import { Iarticle, Iuser, Iliked, Ifollowed } from '../models/models';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import SidemenuProfilesUsers from '../components/Sidemenus/SidemenuProfilesUsers';
import SidemenuProfilesUsersLoading from '../components/Sidemenus/SidemenuProfilesUsersLoading';
import Pagination from '../components/Pagination'

interface Props {
  id: string;
  page: string;
}

const ProfilesUsers: React.FC = () =>{
  const history: any = useHistory();
  const id: string = useParams<Props>().id;
  const page:string = useParams<Props>().page;
  const [profileUser, setProfileUser] = useState<Iuser>({id: '', username: '', email: '', avatar: '', createdAt: ''});
  const [articles, setArticles] = useState<Iarticle[]>([]);
  const [articlesResponse, setArticlesResponse] = useState<boolean>(false);
  const [numberOfArticles, setNumberOfArticles] = useState<number>();
  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchArticles = async () => {
    await axios.get(`${API_URL}/authors-articles/${id}`, { headers: { page: page ? page : '1' }})
    .then(res => {
      setArticles(res.data.articles);
      setArticlesResponse(true);
      setNumberOfArticles(res.data.numberOfArticles);
    })
  }

  const fetchFolloweds = async () => {
    await axios.get(`${API_URL}/followeds`, authorization_user_id)
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  const fetchLikeds = async () => {
    await axios.get(`${API_URL}/likeds`, authorization_user_id)
    .then(res => setLikeds(res.data))
    .catch(err => console.log(err))
  }

  const fetchUserData = async () => {
    await axios.get(`${API_URL}/users/${id}`)
    .then(res => setProfileUser(res.data))
  }

  useEffect(() => {
    if(user && user.id === id) history.push('/dashboard')

    if(jwt){
      fetchFolloweds();
      fetchLikeds();
    }
    fetchUserData();// eslint-disable-next-line
    fetchArticles();
    /* eslint-disable */
  }, [])

  const articlesMap = articles.map((article: Iarticle) =>{
    return (
      <Article
        article={article}
        route={`/profiles-users/${id}`}
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
          <h2 className='main-header-text'><FormattedMessage id='profileUser'/> <span className='text-red-400 font-bold'>{profileUser.username}</span></h2>
        </div>
        <div className='main-content'>
          { articlesResponse ?
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
          defaultRoute={`/profiles-users/${id}/`}
        />
      </div>
      { profileUser.username.length > 0 ?
        <SidemenuProfilesUsers user={profileUser!} />
      :
        <SidemenuProfilesUsersLoading />
      }
    </div>
  )
}

export default ProfilesUsers;