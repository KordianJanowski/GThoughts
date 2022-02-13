import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import emailjs from '@emailjs/browser';
import { EMAILJS_API_KEY, EMAILJS_SERVICE, EMAILJS_TEMPLATE } from '../secret'
import { LOCALES } from './../i18n/locales';
import { useHistory } from 'react-router-dom';

type Props = {
  id?: string;
  toggleReportLayer: () => void;
}

const ReportLayer:React.FC<Props> = ({
  toggleReportLayer,
  id
}) =>{ 
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;
  const history: any = useHistory();
  const[isUsed, setIsUsed] =  useState<boolean>(false)

  const sendReport = async (e: any) =>{
    if(!isUsed){
      setIsUsed(true);
      e.preventDefault();

      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, e.target, EMAILJS_API_KEY)
      history.push('/');
    }
  }


  return(
    <div className="h-screen w-screen absolute flex flex-col justify-center items-center">
      <form onSubmit={sendReport} className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="text-3xl p-4 text-center"><FormattedMessage id='reportArticle'/></div>
        <div className='p-4'>
          <textarea
            name="mail"
            className='w-full h-48 p-4 text-black' placeholder={`${isI18NisEnglish ? 'Here enter what is wrong with the article' : 'Tutaj wpisz co jest nie tak z artykułem'}`} maxLength={200}>
          </textarea>
          <input className='hidden' type="text" value={id} name="id" />
        </div>
        <div className="flex flex-row flex-wrap justify-around mt-8">
          <input
            className="w-32 xl:w-1/3 mt-2 p-5 text-center bg-red-500 text-2xl font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer"
            type="submit" 
            value={ isI18NisEnglish ? 'Report' : 'Zgłoś'} 
          />
          <button
            className="w-32 xl:w-1/3 mt-2 p-5 text-center text-2xl bg-second font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer"
            onClick={toggleReportLayer}
          >
            <FormattedMessage id='hide'/>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportLayer