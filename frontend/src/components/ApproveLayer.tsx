import React from 'react'
import { FormattedMessage } from 'react-intl';

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
      <div>
        <div className="text-3xl"><FormattedMessage id='areYouSure'/></div>
        <div className="flex flex-row flex-wrap justify-around mt-8">
          <div
            className="w-32 xl:w-1/3 mt-2 p-5 text-center bg-red-500 text-2xl font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer"
            onClick={approve}
          >
            <FormattedMessage id='yes'/>
          </div>
          <div
            className="w-32 xl:w-1/3 mt-2 p-5 text-center text-2xl bg-main font-bold rounded-xl hover:opacity-80 duration-150 cursor-pointer"
            onClick={() => toggleLayer('')}
          >
            <FormattedMessage id='no'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproveLayer