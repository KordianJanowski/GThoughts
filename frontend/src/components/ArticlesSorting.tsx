import React, { useState } from 'react'
import { Iarticle } from '../models/models';

interface IProps {
  articles: Iarticle[]
  setArticles: React.Dispatch<React.SetStateAction<Iarticle[]>>
}

const ArticlesSorting: React.FC<IProps> = ({ articles, setArticles }) => {
  const [sortingValue, setSortingValue] = useState<string>('')

  const sortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingValue(e.target.value)

    switch(e.target.value) {
      case 'date-newest':
        setArticles([...articles.sort((art1, art2) => +new Date(art2.createdAt) - +new Date(art1.createdAt))])
        break;
      case 'date-oldest': 
        setArticles([...articles.sort((art1, art2) => +new Date(art1.createdAt) - +new Date(art2.createdAt))])
        break;
      }
  }

  return (
    <select
      value={sortingValue}
      onChange={sortingChange}
      className='ml-2 my-2 bg-gray-100 p-2 text-lg'
    >
      <option value="" disabled hidden selected>Sortowanie</option>
      <option value="date-newest">Data: od najnowszego</option>
      <option value="date-oldest">Data: od najstarszego</option>
    </select>
  )
}

export default ArticlesSorting