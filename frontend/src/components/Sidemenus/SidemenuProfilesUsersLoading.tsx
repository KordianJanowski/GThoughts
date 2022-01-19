import React from 'react'


const SidemenuProfilesUsersLoading: React.FC = () =>{
  return(
    <>
      <nav className='sidemenu-wrapper animate-pulse'>
        <div className='sidemenu-main'>
          <div className='w-40 h-40 bg-gray-600 rounded-full'></div>
          <p className='w-40 text-xl font-bold mt-2 mb-5 bg-gray-600 text-gray-600 px-5 rounded-full'>
            {'\u00A0'}
          </p>
          <button className='rounded-button w-full'>
            {'\u00A0'}
          </button>
          <hr className='sidemenu-hr' />
          <div className='sidemenu-hash-box'>
            <h2 className=''>{'\u00A0'}</h2>
            <p className=''>{'\u00A0'}</p>

            <h2 className='m-2'>{'\u00A0'}</h2>
            <p className=''>{'\u00A0'}</p>
          </div>
        </div>
      </nav>
      <nav className='w-1/12 xl:w-60 block xl:hidden'>
        <div className='fixed w-full flex xl:justify-between text-white h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div className=' w-full md:ml-1 -mt-2'>
            <div className='h-10 w-10 bg-red-400 cursor-pointer animate-pulse rounded-full'></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SidemenuProfilesUsersLoading;