import React from 'react'

const SidemenuLoading: React.FC = () =>{
  return(
    <>
      <nav className='xl:w-80 hidden xl:block text-second'>
        <div className='fixed w-full flex h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div>
            <div className="relative">
              <input
                disabled
                className="w-full py-2 pl-10 pr-4 border rounded-md bg-transparent text-gray-300 border-gray-600 animate-pulse"
              />
            </div>

            <div
              className=' w-3/5 bg-main my-2 px-2 py-1 text-main border border-gray-600 rounded-md animate-pulse'
            >t
            </div>

            <div className=' mt-7 border border-gray-600 rounded-xl p-3 bg-second animate-pulse'>
              <h2 className='text-lg font-semibold'>Ostatnie hashtagi</h2>
              <ul className='m-1'>
                <li>#Programming</li>
                <li>t</li>
                <li>t</li>
              </ul>
            </div>
            <div className='mt-5 border border-gray-600 rounded-2xl p-3 bg-second animate-pulse'>
              <h2 className='text-lg font-semibold'>Popularne hashtagi</h2>
              <ul className='m-1'>
                <li>t</li>
                <li>t</li>
                <li>t</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <nav className='w-1/12 block xl:hidden'>
        <div className='fixed w-full flex xl:justify-between text-white h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div className=' w-full md:ml-1 -mt-2'>
            <div className='w-8 h-8 bg-red-400 animate-pulse rounded-full'></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SidemenuLoading;