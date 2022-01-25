import React, { useState } from 'react'
import { LOCALES } from '../i18n';
import { Iarticle } from '../models/models';

type Props = {
  articles: Iarticle[]
  setArticles: React.Dispatch<React.SetStateAction<Iarticle[]>>
  toggleSidemenu: () => void
}

const ArticlesSearching: React.FC<Props> = ({ articles, setArticles, toggleSidemenu}) => {
  const [searchingValue, setSearchingValue] = useState<string>('')
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  const searchArticles = ():void => {
    const filteredArticles = articles.filter((article) => {
      let keySearchingWords = article.title;
      article.body.blocks.forEach(block => {
        keySearchingWords += block
      })
      let inputPhrase = searchingValue.toLowerCase().split(' ');
      return inputPhrase.every(searchingWord => keySearchingWords.toLowerCase().includes(searchingWord));
    })
    toggleSidemenu()
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
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </span>

      <input
        onChange={searchInputChange}
        onKeyDown={checkInputKey}
        placeholder={`${isI18NisEnglish  ? 'Search' : 'Wyszukaj'}`}
        type="text"
        className="w-full py-2 pl-10 pr-4 rounded-lg bg-transparent text-gray-300 border border-gray-600"
      />
    </div>
  )
}

export default ArticlesSearching