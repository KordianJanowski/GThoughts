import React from 'react'

const SingleLoading: React.FC = () =>{
  return(
    <div>
      <div className='flex flex-col lg:flex-row items-start justify-start lg:justify-between px-2 mb-4 py-2'>
        <div className='flex flex-col items-start justify-start w-full'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row items-center profile'>
              <div className='w-10 h-10 rounded-full mr-2 bg-gray-700 animate-pulse'></div>
              <div className='flex flex-col'>
                <span className='bg-gray-700 text-gray-700 rounded-full p-2 animate-pulse'>uzytkownik</span>
              </div>
            </div>
          </div>
          <div className='w-full bg-transparent bg-gray-700 text-gray-700 font-bold h-auto rounded-full text-xl md:text-2xl my-2 p-2 animate-pulse'>t</div>
          <div className='w-full bg-gray-700 text-gray-700 rounded-full text-xl p-2 overflow-hidden whitespace-nowrap animate-pulse'>s</div>
        </div>
        <div className='h-32 lg:h-40 w-full lg:w-80 xl:w-96 lg:ml-8 bg-gray-700 mt-2 lg:mt-0 animate-pulse'></div>
      </div>
    </div>
  )
}

const Loading: React.FC = () =>{
  return(
    <div>
      <div className='hidden lg:block'>
        {/* for pc */}
        <SingleLoading />
        <SingleLoading />
        <SingleLoading />
        <SingleLoading />
      </div>
      <div className='block lg:hidden'>
        {/* for mobile */}
        <SingleLoading />
        <SingleLoading />
      </div>
    </div>
  )
}

export default Loading;
