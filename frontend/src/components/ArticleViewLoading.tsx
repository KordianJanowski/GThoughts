import React from 'react';

const ArticleViewLoading:React.FC = () =>{
  return(
    <div className='h-screen w-full animate-pulse'>
      <div className='w-full h-1/2 xl:h-1/3 gap-8 mt-8 flex flex-col xl:flex-row'>
        <div className='w-full xl:w-1/2 bg-gray-700 h-1/2 xl:h-full'></div>
        <div className='w-full xl:w-1/2 bg-gray-700 h-1/2 xl:h-full'></div>
      </div>
      <div className='w-full h-1/2 bg-gray-700 mt-8'></div>
    </div>
  )
}

export default ArticleViewLoading;