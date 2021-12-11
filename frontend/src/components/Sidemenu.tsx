import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../API_URL'
import { Ihashtag } from '../models/models';
import Cookies from 'universal-cookie';
import { Iuser, Iarticle } from '../models/models';
import ArticleSearching from './ArticlesSearching';
import ArticlesSorting from '../components/ArticlesSorting';

type Props = {
  articles: Iarticle[];
  setArticles: React.Dispatch<React.SetStateAction<Iarticle[]>>
}

const Sidemenu: React.FC<Props> = ({ articles, setArticles }) =>{
  const cookies: Cookies = new Cookies();
  const user: Iuser = cookies.get('user');
  const [hashtags, setHashtags] = useState<Ihashtag[]>([{name: '', counter: 0}])

  useEffect(() => {
    const fetchHashtags = async() => {
      axios.get(`${API_URL}/hashtags`).then(res => {
        const hashtagsCopy:Ihashtag[] = res.data
        setHashtags(hashtagsCopy.sort((a, b) => b.counter - a.counter ))
      })
    }  
    fetchHashtags()

  }, []);

  // mapping only 3 first elements of array
  const hashtagsMap = hashtags.slice(0, 3).map(hash => {
    return(
      <li>#{hash.name}</li>
    )
  })

  return(
    <nav className='w-60'>
      <div className='fixed flex flex-col justify-between text-white h-screen pt-16 py-10'>
        <div>
          <ArticleSearching articles={articles} setArticles={setArticles} />
          <ArticlesSorting articles={articles} setArticles={setArticles} />
          <div className='mt-5'>
            <h2 className='text-2xl font-semibold'>Ostatnie hashtagi</h2>
            <ul className='m-1 text-blue-400'>
              <li>#Elektronika</li>
              <li>#Szymool</li>
              <li>#DealIt</li>
            </ul>
          </div>
          <div className='mt-2'>
            <h2 className='text-2xl font-semibold'>Popularne hashtagi</h2>
            <ul className='m-1 text-blue-400'>
              {
                hashtags.length > 0 ?
                  hashtagsMap
                :
                  <span className='text-gray-500'>Brak hashtagów do wyświetlenia</span>
              }
            </ul>
          </div>
        </div>
        <div>
          Ustawienia
        </div>
      </div>
    </nav>
  )
}

export default Sidemenu;