import React from 'react'

const SidemenuLoading: React.FC = () =>{
  return(
    <>
      <nav className='sidemenu-wrapper animate-pulse'>
        <div className='sidemenu-main md:items-start'>
          <input
            disabled
            className="w-full py-2 pl-10 pr-4 border rounded-xl bg-transparent text-gray-300 border-gray-600 bg-second"
          />
          <div className='w-3/5 my-2 px-2 py-1 text-main border border-gray-600 rounded-xl bg-second'>{'\u00A0'}</div>
          <div className='sidemenu-hash-box mt-5'>
            <h2 className='text-lg font-semibold'>{'\u00A0'}</h2>
            <ul className='m-1'>
              <li>{'\u00A0'}</li>
              <li>{'\u00A0'}</li>
              <li>{'\u00A0'}</li>
            </ul>
          </div>
          <div className='sidemenu-hash-box mt-5'>
            <h2 className='text-lg font-semibold'>{'\u00A0'}</h2>
            <ul className='m-1'>
              <li>{'\u00A0'}</li>
              <li>{'\u00A0'}</li>
              <li>{'\u00A0'}</li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className='w-1/12 block xl:hidden'>
        <div className='fixed w-full flex xl:justify-between text-white h-screen mt-20 2xl:ml-10 xl:p-2'>
          <div className=' w-full ml-1 -mt-1'>
            <div className='w-8 h-8 bg-red-500 animate-pulse rounded-full'></div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SidemenuLoading;