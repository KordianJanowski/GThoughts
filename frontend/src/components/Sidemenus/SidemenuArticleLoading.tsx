import React from 'react'

const SidemenuArticleLoading: React.FC = () =>{
  return(
    <>
      <nav className='sidemenu-wrapper animate-pulse'>
        <div className='sidemenu-main'>
          <div className='w-40 h-40 rounded-full bg-gray-600'></div>
          <p className='w-40 text-xl font-bold mt-2 mb-5 bg-gray-600 px-5 rounded-full'>
            {'\u00A0'}
          </p>
          <button className='rounded-button w-full'>
            {'\u00A0'}
          </button>
          <button className='rounded-button w-full mt-2'>
            {'\u00A0'}
          </button>
          <button className='flex justify-center items-center bg-red-900 py-2 px-6 text-lg button-animation rounded-full cursor-pointer w-full mt-2'>
            {'\u00A0'}
          </button>
          <hr className='sidemenu-hr' />
          <div className='sidemenu-hash-box'>
            <h2 className='text-lg font-semibold'>{'\u00A0'}</h2>
            <ul className='m-1'>
              <li>{'\u00A0'}</li>
              <li>{'\u00A0'}</li>
              <li>{'\u00A0'}</li>
            </ul>
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