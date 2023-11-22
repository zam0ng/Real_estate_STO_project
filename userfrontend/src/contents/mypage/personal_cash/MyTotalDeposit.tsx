import React from 'react';

const MyTotalDeposit: React.FC = () => {
  return (
    <div className='w-[40%] h-[80%] border border-black rounded-lg'>
        <div className='w-full h-[50%] border-b border-black flex flex-row justify-start items-center pl-3'>
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.66663 11.3332L9.99996 7.99984L6.66663 4.6665" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8H2" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            총 입금액
        </div>
        <div className='w-full h-[50%] flex justify-end items-center pr-3'>
            0원
        </div>
    </div>
  )
}

export default MyTotalDeposit;