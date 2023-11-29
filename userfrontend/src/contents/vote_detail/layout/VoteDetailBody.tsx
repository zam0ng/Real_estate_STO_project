import React, { useEffect } from 'react';
import VoteTitle from '../VoteTitle';
import VotePeriod from '../VotePeriod';
import VotePropertyImg from '../VotePropertyImg';
import VoteStatus from '../vote_status/VoteStatus';
import VoteAdditionalInfo from '../VoteAdditionalInfo';
import VoteBtns from '../vote_status/agree_disagree/VoteBtns';
import VoteCount from '../VoteCount';
import { useLocation } from 'react-router-dom';
import { serverurl } from '../../../components/serverurl';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const VoteDetailBody: React.FC = () => {
  const currentPage = useLocation();
  console.log(currentPage.state);

  const fetchVoteCA = async () => {
    const response = await axios.get(`${serverurl}/vote/vote_contract_address`,{
      params: {
        real_estate_name: currentPage.state.real_estate_name
      }
    });
    return response.data;
  };

  const {data,error,isLoading,isError} = useQuery({
    queryKey: ["fetchVoteCA",currentPage.state.real_estate_name],
    queryFn: fetchVoteCA,
    enabled: !!currentPage.state.real_estate_name
  });

  useEffect(()=>{
    console.log(data);
  },[data])

  return (
    <div className='w-full h-fit flex flex-col'>
        <VoteTitle />
        <VotePeriod />
        <VotePropertyImg />
        <VoteStatus />
        <VoteBtns />
        <VoteCount />
    </div>
  )
}

export default VoteDetailBody;