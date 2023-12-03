import React, { useEffect, useState } from 'react';

interface GetDateProps {
  getDate: Date;
}

const DividendGetDate: React.FC<GetDateProps> = ({getDate}) => {

  const getYear = getDate.getFullYear();
  const getMonth = getDate.getMonth() + 1;
  const getDay = getDate.getDate();

  return (
    <div className='w-full h-[30%] flex flex-row justify-between'>
      <div className='w-[50%] h-full flex justify-start items-center pl-5 text-xxs'>배당 지급일</div>
      <div className='w-[50%] h-full flex justify-end items-center pr-5 text-sm'>{`${getYear}년 ${getMonth}월 ${getDay}일`}</div>
    </div>
  )
}

export default DividendGetDate;