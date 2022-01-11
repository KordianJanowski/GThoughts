import React from 'react'


const SidemenuProfilesUsersLoading: React.FC = () =>{
  return(
    <>
      <nav className='w-1/4 hidden xl:block animate-pulse'>
        <div className='fixed w-64 flex flex-col text-white h-screen mt-20 2xl:ml-8 xl:p-2'>
          <div className='flex flex-col mb-5'>
            <div className='flex flex-col items-center'>
              <div
                className='w-40 h-40 bg-gray-600 rounded-full'
              ></div>
              <p className='text-xl font-bold mt-2 bg-gray-600 text-gray-600 px-5 rounded-full'>
                username
              </p>
              <button className='flex justify-center items-center bg-red-500 text-red-500 py-2 px-6 text-base w-full mt-5'>
                Obserwuj
              </button>
              <hr className='mt-6 border w-full border-gray-700 ' />
              <div className='mt-6 w-full border rounded-xl border-gray-600 text-second p-3 bg-second'>
                <h2 className=''>t</h2>
                <p className=''>t</p>

                <h2 className='mt-2'>t</h2>
                <p className=''>t</p>
              </div>
            </div>
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