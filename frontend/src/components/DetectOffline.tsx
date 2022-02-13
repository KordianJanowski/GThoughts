import { Offline } from "react-detect-offline"
import { FormattedMessage } from 'react-intl';

const DetectOffline = () => {
  return (
    <Offline>
      <div className="h-full w-screen z-50  bg-transparent fixed justify-center items-center flex">          
        <div className=" h-32 w-96 bg-red-700 text-center p-4 flex flex-col justify-around items-center">
          <FormattedMessage id="offline"/>
          <svg className="h-10 w-10 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="1" y1="1" x2="23" y2="23" />  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />  <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />  <line x1="12" y1="20" x2="12.01" y2="20" /></svg>
        </div>
      </div>
    </Offline>
  );
}

export default DetectOffline