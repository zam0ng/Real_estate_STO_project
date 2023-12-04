import React from 'react';
import { useNavigate } from 'react-router-dom';

type BackBtn = {
    props : string
}


const BackBtn: React.FC<BackBtn> = ({props} : BackBtn) => {
  const navigation = useNavigate();

  return (
    <div className='w-16 h-16 flex justify-center items-center' onClick={()=>navigation(props)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M20 24L12 16L20 8" stroke="#0C0831" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default BackBtn;