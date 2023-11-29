import React, { createContext, useEffect, useState } from 'react';
import VoteListItemBox from '../contents/vote_list/layout/VoteListItemBox';
import TabBar from '../layouts/TabBar';
import useWeb3 from '../hooks/web3.hook';
import voteContractInfo from '../abi/Voting.json';
import axios from 'axios';
import { serverurl } from '../components/serverurl';
import { useQuery } from '@tanstack/react-query';

export interface VoteListRequest {
    real_estate_name: string;
    vote_title: string;
    vote_start_date: string;
    vote_end_date: string;
}

export const VoteListContext = createContext<VoteListRequest[]|undefined>(undefined);

const VoteList: React.FC = () => {

    const fetchVoteList = async () => {
        const response = await axios.get(`${serverurl}/vote/vote_list`);
        return response.data;
    };

    const {data,error,isLoading,isError} = useQuery({
        queryKey: ["fetchVoteList"],
        queryFn: fetchVoteList
    });

    useEffect(()=>{
        console.log(data);
    },[data]);

    // useEffect(()=>{
    //     if(web3 !== null){
    //         if(contract) return;
    
    //         const tokenContract = new web3.eth.Contract(
    //             voteContractInfo.votingABI,
    //             "0x2FCC105C8d9cf8285b1016a56bc5f9ADe88E5108",
    //             {data : ""}
    //         );
    
    //         setContract(tokenContract);
    //     };
    // },[web3]);

    // const getVotingDetails = async () => {
    //     const details = await contract.methods.getVoteInfo().call();
    //     console.log(details);
    // };

    // useEffect(()=>{
    //     if(web3 !== null){
    //         getVotingDetails();
    //     }
    // },[web3]);

    return (
        <VoteListContext.Provider value={data}>
            <div className='w-screen h-screen pb-12'>
                <div className='w-full h-full overflow-y-scroll pr-2 pl-2'>
                    <VoteListItemBox />
                </div>
                <TabBar />
            </div>
        </VoteListContext.Provider>
    )
}

export default VoteList;