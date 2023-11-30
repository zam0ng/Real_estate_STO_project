import React, { useEffect, useState } from 'react';
import VoteListItemProperty from './VoteListItemProperty';
import VoteListItemName from './VoteListItemName';
import VoteListItemPeriod from './VoteListItemPeriod';
import VoteListItemProgress from './VoteListItemProgress';
import { useNavigate } from 'react-router-dom';
import { VoteListRequest } from '../../pages/VoteList';
import axios from 'axios';
import { serverurl } from '../../components/serverurl';
import { useQuery } from '@tanstack/react-query';

const VoteListItem: React.FC<VoteListRequest> = ({real_estate_name,vote_id,subscription_img_1,vote_title,vote_start_date,vote_end_date}) => {
    const [voteCA,setVoteCA] = useState<string>("");
    const [currentUser,setCurrentUser] = useState<string>("");

    const fetchVoteCA = async () => {
        const response = await axios.get(`${serverurl}/vote/vote_contract_address`,{
            params: {
                vote_id: `${vote_id}`
            }
        });
        return response.data;
    };
    
    const {data,error,isLoading,isError} = useQuery({
        queryKey: ["fetchVoteCA",vote_id],
        queryFn: fetchVoteCA,
        enabled: !!vote_id
    });

    useEffect(()=>{
        console.log(data);
        if(data){
            setVoteCA(data[0].address);
        }
    },[data]);

    useEffect(()=>{
        const getWalletAccount = async () => {
            const accounts = await window.ethereum.request({method:"eth_accounts"});
            if(accounts.length > 0){
                setCurrentUser(accounts[0]);
            }
        };
        getWalletAccount();
    },[])

    const navigation = useNavigate();

    const toVoteDetail = () => {
        navigation(`/vote-detail/${real_estate_name}/${vote_title}`,{
            state: {
                real_estate_name: real_estate_name,
                vote_ca: voteCA,
                img: subscription_img_1,
                wallet: currentUser
            }
        });
    };

    return (
        <div className='w-full h-32 border-b border-slate-200 flex flex-row' onClick={toVoteDetail}>
            <div className='w-[80%] h-full'>
                <VoteListItemProperty real_estate_name={real_estate_name} />
                <VoteListItemName vote_title={vote_title} />
                <VoteListItemPeriod vote_start_date={vote_start_date} vote_end_date={vote_end_date} />
            </div>
            <VoteListItemProgress vote_start_date={vote_start_date} vote_end_date={vote_end_date} />
        </div>
    )
}

export default VoteListItem;