import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import API_URL from '../API_URL';
import Article from '../components/Article/Article';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import SidemenuProfilesUsers from '../components/Sidemenus/SidemenuProfilesUsers';
import SidemenuProfilesUsersLoading from '../components/Sidemenus/SidemenuProfilesUsersLoading';
import { authorization_user_id, jwt } from '../models/const-variables';
import { Iarticle, Iuser, Iliked, Ifollowed } from '../models/models';


interface Props {
  id: string;
}

const ProfilesUsers: React.FC = () =>{
  const id: string = useParams<Props>().id;
  const [profileUser, setProfileUser] = useState<Iuser>({id: '', username: '', email: '', avatar: '', createdAt: ''});
  const [articles, setArticles] = useState<Iarticle[]>([]);
  const [articlesResponse, setArticlesResponse] = useState<boolean>(false);


  const [likeds, setLikeds] = useState<Iliked[]>([])
  const [followeds, setFolloweds] = useState<Ifollowed[]>([])

  const fetchFolloweds = async () =>{
    await axios.get(`${API_URL}/followeds`, authorization_user_id)
    .then(res => setFolloweds(res.data))
    .catch(err => console.log(err))
  }

  const fetchLikeds = async () =>{
    await axios.get(`${API_URL}/likeds`, authorization_user_id)
    .then(res => setLikeds(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchUserData = async () =>{
      if(jwt){
        fetchFolloweds();
        fetchLikeds();
      }

      await axios.get(`${API_URL}/users/${id}`)
      .then(res => setProfileUser(res.data))

      await axios.get(`${API_URL}/authors-articles/${id}`)
      .then(res => {
        setArticles(res.data)
        setArticlesResponse(true);
      })
    }
    fetchUserData();// eslint-disable-next-line
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