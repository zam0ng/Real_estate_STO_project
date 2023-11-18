import React from 'react';
import BoardItemTitle from './BoardItemTitle';
import BoardTypeDate from './BoardTypeDate';
import { useNavigate } from 'react-router-dom';

interface boardDetailProps {
    category: string;
    createdAt: string;
    id: number;
    notice_title: string;
    real_estate_name: string;
}

const BoardItem: React.FC<boardDetailProps> = ({category,createdAt,id,notice_title,real_estate_name}) => {
    const navigation = useNavigate();

    const toBoardDetail = ()=>{
        if(category === "공지사항"){
            navigation(`/market/detail/board-detail/notice/${notice_title}`,
            {state: {
                id: id,
                real_estate_name: real_estate_name,
            }});
        }else{
            navigation(`/market/detail/board-detail/dividend/${notice_title}`,
            {state: {
                id: id,
                real_estate_name: real_estate_name,
            }});
        };
    };

    return (
        <div className='w-full h-24 flex flex-row p-3 border-b border-slate-300'
        onClick={toBoardDetail}>
            <div className='w-[80%] h-full'>
                <BoardItemTitle notice_title={notice_title} />
                <BoardTypeDate createdAt={createdAt} category={category} />
            </div>
            <div className='w-[20%] h-full flex justify-end items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="#9A98A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
}

export default BoardItem;