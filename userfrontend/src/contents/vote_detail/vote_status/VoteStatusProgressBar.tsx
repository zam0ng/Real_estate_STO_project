import React from 'react';
import ProgressBar from '../../../components/ProgressBar';

const VoteStatusProgressBar: React.FC = () => {
  return (
    <div className=" bg-gray-300 rounded-full h-2 mx-auto m-3">
        <div className="bg-blue-500 h-2 rounded-full" style={{width : `${40}%`}}></div>
    </div>
  )
}

export default VoteStatusProgressBar;