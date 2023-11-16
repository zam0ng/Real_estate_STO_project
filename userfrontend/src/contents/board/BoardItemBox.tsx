import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import BoardItem from './BoardItem';
import axios from "axios";

interface boardRequest {
    id: number;
    category: string;
    notice_title: string;
    createdAt: string;
    real_estate_name: string;
}

const BoardItemBox: React.FC = () => {
    const currentPage = useLocation();
    const propertyName = currentPage.state.propertyName;

    const boardFetch = async (): Promise<boardRequest[]> => {
        const {data} = await axios.get(`http://127.0.0.1:8080/market/detail/board/${propertyName}`);
        // console.log(data);
        return data;
    };

    const {data,error,isLoading,isError} = useQuery<boardRequest[]>(
        ["boardFetch",propertyName],
        boardFetch
    );

    useEffect(()=>{
        console.log(data);
    },[])

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    };

    if(isError){
        return (
            <div>Error: cannot fetch data</div>
        )
    };

    return (
        <div className='w-[90%] h-[90%] flex flex-col overflow-y-scroll'>
            {data?.map((item,index)=>(
                <BoardItem key={index} category={item.category} createdAt={item.createdAt} 
                id={item.id} notice_title={item.notice_title} real_estate_name={item.real_estate_name} />
            ))}
        </div>
    )
}

export default BoardItemBox;