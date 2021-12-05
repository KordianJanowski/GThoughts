import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';

import AddComment from '../components/Article/Comments/AddComment';
import AddFeedback from '../components/Article/Feedbacks/AddFeedback';

import API_URL from '../API_URL';
import { Iuser, IarticleBody ,Iarticle } from '../models/models'
import {user, jwt} from '../models/const-variables'

interface Props {
  id: string;
}

const Article:React.FC = () =>{
  const id: string = useParams<Props>().id;

  const[article, setArticle] = useState<Iarticle>();
  const[isArticleExist, setIsArticleExist] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () =>{
      await axios.get(`${API_URL}/articles/${id}`)
      .then(res => {
        setArticle(res.data);
        setIsArticleExist(true);
      })
      .catch(err => console.log(err))
    }
    fetchArticle()
  }, [])

  const articleBodies = article?.body.map((body: IarticleBody) =>{
    return(
      <div>
        <h2>{ body.subtitle }</h2>
        <p>{ body.body }</p>
        <img src={body.image} alt="" />
      </div>
    )
  })

  return(
    <div>
      { id }
      { isArticleExist ?
      <div>
        <h1>
          { article?.title }
        </h1>
        <div>
        { articleBodies }
        </div>

        <div>{article?.author_name}</div>
      </div> :
      <div>article not exist</div> }

      <div >
        <h1 className="text-4xl">
          COMMENTS
        </h1>
        <AddComment id={id} />
      </div>
      <div >
        <h1 className="text-4xl">
          FEEDBACK
        </h1>
        <AddFeedback id={id} />
      </div>

    </div>
  )
}

export default Article;