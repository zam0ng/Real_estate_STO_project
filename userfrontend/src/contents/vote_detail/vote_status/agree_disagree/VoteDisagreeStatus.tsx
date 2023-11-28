import React from 'react';

const VoteDisagreeStatus: React.FC = () => {
  return (
    <div className=" bg-gray-300 rounded-full h-2 mx-auto m-3">
        <div className="bg-red-500 h-2 rounded-full" style={{width : `${40}%`}}></div>
    </div>
  )
}

export default VoteDisagreeStatus;