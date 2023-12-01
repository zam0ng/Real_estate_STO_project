import React from 'react';

const DepositWithdrawalBtn: React.FC = () => {
  return (
    <div className='w-full h-[20%] flex justify-evenly items-start'>
        <button className='w-[40%] h-[50%]  bg-[#EDF0F4] rounded-xl shadow-innerneu2 flex flex-row justify-center items-center text-blue-500 bg-slate-100'>
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H10" stroke="#3B78C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.66663 11.3332L9.99996 7.99984L6.66663 4.6665" stroke="#3B78C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8H2" stroke="#3B78C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            입금하기
        </button>
        <button className='w-[40%] h-[50%]  rounded-xl shadow-innerneu2 flex flex-row justify-center items-center text-white bg-blue-400'>
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6666 11.3332L14 7.99984L10.6666 4.6665" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 8H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            출금하기
        </button>
    </div>
  )
}

export default DepositWithdrawalBtn;