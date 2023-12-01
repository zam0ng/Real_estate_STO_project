import React from 'react';

const MyTotalWithdrawal: React.FC = () => {
  return (
    <div className='w-[40%] h-[80%] bg-[#EDF0F4] rounded-lg shadow-neu1 shadow-neu2 '>
        <div className='w-full h-[50%] border-b border-black flex flex-row justify-start items-center pl-3'>
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6666 11.3332L14 7.99984L10.6666 4.6665" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 8H6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            총 출금액
        </div>
        <div className='w-full h-[50%] flex justify-end items-center pr-3'>
            0원
        </div>
    </div>
  )
}

export default MyTotalWithdrawal;