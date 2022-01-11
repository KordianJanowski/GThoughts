import React from 'react'

const SidemenuArticleLoading: React.FC = () =>{
  return(
    <>
      <nav className='xl:w-1/4 hidden xl:block animate-pulse'>
        <div className='fixed w-60 flex flex-col text-white h-screen mt-20 2xl:ml-8 xl:p-2'>
          <div className='flex flex-col mb-5'>
            <div className='flex flex-col items-center'>
              <div className='w-40 h-40 rounded-full bg-gray-600'></div>
              <p className='text-xl font-bold mt-2 bg-gray-600 text-gray-600 px-5 rounded-full'>
                username
              </p>
              <button className='flex justify-center items-center text-red-500 bg-red-500 py-2 px-6 text-base w-full mt-5'>
                Obserwuj
              </button>
            </div>
          </div>
          <hr className='my-4 border-gray-700' />
          <div className='mt-5 border border-gray-600 rounded-xl p-3 bg-second text-second'>
            t <br /> t <br /> t <br /> t
          </div>
        </div>
      </nav>
      <nav className='w-1/12 xl:w-60 block xl:hidden'>
        <div className='fixed w-full flex xl:justify-between text-white h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div className=' w-full md:ml-1 -mt-2'>
            <div className='h-10 w-10 rounded-full bg-red-400'></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SidemenuArticleLoading;