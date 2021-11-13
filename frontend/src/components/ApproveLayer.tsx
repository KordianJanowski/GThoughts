import React from 'react'

type Props = {
  id?: string;
  toggleLayer: (id: string) => void;
  approve: () => void;
}

const ApproveLayer:React.FC<Props> = ({
  toggleLayer,
  approve
}) =>{


  return(
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="p-20 bg-gray-100">
        <div className="text-3xl">Are you sure you want to delete this article?</div>
        <div className="flex flex-row justify-around mt-8">
          <div
            className="w-32 bg-black text-white p-5 text-center text-2xl font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer"
            onClick={approve}
          >
            Yes
          </div>
          <div
            className="w-32 bg-white text-black p-5 text-center text-2xl font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer"
            onClick={() => toggleLayer('')}
          >
            No
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproveLayer