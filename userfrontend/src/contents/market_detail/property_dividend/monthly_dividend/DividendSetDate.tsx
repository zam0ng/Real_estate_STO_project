import React from 'react';

interface SetDateProps {
  setDate: Date;
}

const DividendSetDate: React.FC<SetDateProps> = ({setDate}) => {
  // console.log(setDate);
  const setYear = setDate.getFullYear();
  const setMonth = setDate.getMonth() + 1;
  const setDay = setDate.getDate();

  return (
    <div className='w-full h-[30%] flex flex-row justify-between'>
      <div className='w-[50%] h-full flex justify-start items-center pl-5 text-xxs'>배당 기준일</div>
      <div className='w-[50%] h-full flex justify-end items-center pr-5 text-sm'>{`${setYear}년 ${setMonth}월 ${setDay}일`}</div>
    </div>
  )
}

export default DividendSetDate;