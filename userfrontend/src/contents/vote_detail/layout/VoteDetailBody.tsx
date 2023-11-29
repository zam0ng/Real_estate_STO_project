import React, { useEffect, useState } from 'react';
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
import useWeb3 from '../../../hooks/web3.hook';
import voteContractInfo from '../../../abi/Voting.json';

const VoteDetailBody: React.FC = () => {
  const {user,web3} = useWeb3();
  const [contract,setContract] = useState<any>();

  const [voteCA,setVoteCA] = useState<string>("");

  const currentPage = useLocation();
  console.log(currentPage.state);

  const fetchVoteCA = async () => {
    const response = await axios.get(`${serverurl}/vote/vote_contract_address`,{
      params: {
        vote_id: `${currentPage.state.vote_id}`
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
    if(data){
      setVoteCA(data.address);
      
      if(web3 !== null){
        if(contract) return;

        const tokenContract = new web3.eth.Contract(
          voteContractInfo.votingABI,
          voteCA,
          { data : "" }
        );

        setContract(tokenContract);
      }
    }
  },[data,web3]);

  // // 컨트랙트 불러오기
  // useEffect(()=>{
  //   if(web3 !== null){
  //       if(contract) return;

  //       const tokenContract = new web3.eth.Contract(
  //           voteContractInfo.votingABI,
  //           voteCA,
  //           {data:""}
  //       );

  //       setContract(tokenContract);
  //   };
  // },[web3]);

  const fetchVoteInfo = async ()=>{
    const voteInfo = await contract.methods.getVoteInfo().call();
    console.log(voteInfo);
  };

  useEffect(()=>{
    if(contract){
      fetchVoteInfo();
    }
  },[contract]);

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