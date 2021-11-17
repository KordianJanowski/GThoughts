import React, { useState } from 'react'
import { Iarticle } from '../models/models';

interface IProps {
  articlesCopy: Iarticle[]
  setArticles: React.Dispatch<React.SetStateAction<Iarticle[]>>
}

const ArticleSearching: React.FC<IProps> = ({ articlesCopy, setArticles }) => {
  const [searchingValue, setSearchingValue] = useState<string>('')

  const searchArticles = ():void => {
    const filteredArticles = articlesCopy.filter((article) => {
      let keySearchingWords = article.title
      article.body.forEach(section => {
        keySearchingWords += ` ${section.subtitle} ${section.body}`
      });
      let inputItem = searchingValue.toLowerCase().split(' ')
      return inputItem.every(searchingWord => keySearchingWords.toLowerCase().includes(searchingWord));
    })
    setArticles(filteredArticles)
  }

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setSearchingValue(e.target.value)
  }

  const checkInputKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if(e.code === "Enter") {
      searchArticles()
    }
  }

  return (
    <input 
      onChange={searchInputChange}
      onKeyDown={checkInputKey}
      value={searchingValue}
      className='my-2 bg-gray-100 p-2 text-2xl' 
      type="text" 
      placeholder="Wyszukaj artykuł" 
    />
  )
}

export default ArticleSearching