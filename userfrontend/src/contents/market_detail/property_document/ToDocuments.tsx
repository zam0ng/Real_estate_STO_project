import React from 'react';

interface DocumentTypeProps {
    type: string;
}

const ToDocuments: React.FC<DocumentTypeProps> = ({type}) => {
  return (
    <div className='w-[90%] h-14 border border-black flex flex-row items-center text-sm'>
        <div className='w-[50%] h-full flex justify-start items-center pl-3'>
            {type}
        </div>
        <div className='w-[50%] h-full flex justify-end items-center pr-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M8.25 16.5L13.75 11L8.25 5.5" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    </div>
  )
}

export default ToDocuments;