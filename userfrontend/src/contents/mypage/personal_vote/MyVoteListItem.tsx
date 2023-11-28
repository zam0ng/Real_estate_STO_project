import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyVoteListItem: React.FC = () => {
  const navigation = useNavigate();

  // const propertyName;
  // const voteName;

  // const toVoteDetail = ()=>{
  //   navigation(`/vote-detail/${propertyName}/${voteName}`);
  // };

  return (
    <div className='w-full h-20 flex flex-row border-b border-slate-300'>
        <div className='w-[20%] h-full flex justify-center items-center'>
            <img className='w-14 h-14 border border-black rounded-lg' src='' />
        </div>
        <div className='w-[50%] h-full pt-2'>
            <div className='w-full h-2/5 flex justify-start items-end pl-2 text-sm'>
              {/* property name */} 문래 공차
            </div>
            <div className='w-full h-3/5 flex justify-start items-start text-xl pl-2'>
              {/* vote topic */} 청소 업체 선정
            </div>
        </div>
        <div className='w-[30%] h-full flex justify-end items-end text-sm pr-2 pb-2'>
            10.10 ~ 10.31
        </div>
    </div>
  )
}

export default MyVoteListItem;