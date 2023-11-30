import React, { useEffect, useState } from 'react';
import VoteTitle from '../VoteTitle';
import VotePeriod from '../VotePeriod';
import VotePropertyImg from '../VotePropertyImg';
import VoteStatus from '../vote_status/VoteStatus';
import VoteBtns from '../vote_status/agree_disagree/VoteBtns';
import VoteCount from '../VoteCount';
import { useLocation } from 'react-router-dom';
import useWeb3 from '../../../hooks/web3.hook';
import voteContractInfo from '../../../abi/Voting.json';

const VoteDetailBody: React.FC = () => {
  const {user,web3} = useWeb3();
  const [contract,setContract] = useState<any>();

  const currentPage = useLocation();
  console.log(currentPage.state);

  const [realEstateName, setRealEstateName] = useState<string>("");
  const [voteTitle,setVoteTitle] = useState<string>("");
  const [startDate,setStartDate] = useState<number>(0);
  const [endDate,setEndDate] = useState<number>(0);
  const [tokenOwners,setTokenOwners] = useState<string[]>([]);
  const [votedOwners,setVotedOwners] = useState<string[]>([]);
  const [completeStatus,setCompleteStatus] = useState<boolean>(false);
  const [result,setResult] = useState<boolean>(false);

  const [totalVotes,setTotalVotes] = useState<number>(0);
  const [usedVotes,setUsedVotes] = useState<number>(0);
  const [agreeVotes,setAgreeVotes] = useState<number>(0);
  const [disagreeVotes,setDisagreeVotes] = useState<number>(0);

  useEffect(()=>{
    console.log(user);
  },[user]);

  // 컨트랙트 불러오기
  useEffect(()=>{
    if(web3 !== null){
      if(contract) return;

      const voteContract = new web3.eth.Contract(
        voteContractInfo.votingABI,
        currentPage.state.vote_ca,
        {data : ""}
      );
      setContract(voteContract);

      voteContract.events.Voted({fromBlock: 'latest'})
      .on("data", (event)=>{
        console.log(event.returnValues);
      })
    };
  },[web3]);

  // 정보 불러오기
  const getVoteInfo = async () => {
    const {"0": property, "1": voteTitle, "2": startDate, "3": endDate, "4": tokenOwners, "5": votedOwners, "6": completeStatus, "7": result} 
    = await contract.methods.getVoteInfo().call();
    // console.log(property,voteTitle,startDate,endDate,tokenOwners,votedOwners,completeStatus,result);
    setRealEstateName(property);
    setVoteTitle(voteTitle);
    setStartDate(startDate);
    setEndDate(endDate);
    setTokenOwners(tokenOwners);
    setVotedOwners(votedOwners);
    setCompleteStatus(completeStatus);
    setResult(result);
  };

  // 투표 카운트 불러오기
  const getVoteCounts = async () => {
    const {"0": totalVotes, "1": usedVotes, "2": agreeVotes, "3": disagreeVotes} = await contract.methods.getVoteCounts().call();
    // console.log(totalVotes,usedVotes,agreeVotes,disagreeVotes);
    setTotalVotes(totalVotes);
    setUsedVotes(usedVotes);
    setAgreeVotes(agreeVotes);
    setDisagreeVotes(disagreeVotes);
  };

  useEffect(()=>{
    console.log(contract);
    if(contract){
      getVoteInfo();
      getVoteCounts();
    }
  },[contract]);

  return (
    <div className='w-full h-fit flex flex-col'>
        <VoteTitle real_estate_name={realEstateName} vote_title={voteTitle} />
        <VotePeriod startDate={startDate} endDate={endDate} />
        <VotePropertyImg img={currentPage.state.img} />
        <VoteStatus totalVotes={totalVotes} usedVotes={usedVotes} />
        <VoteBtns tokenOwners={tokenOwners} votedOwners={votedOwners} voteCA={currentPage.state.vote_ca} />
        <VoteCount tokenOwners={tokenOwners} votedOwners={votedOwners} agreeVotes={agreeVotes} disagreeVotes={disagreeVotes} totalVotes={totalVotes} />
    </div>
  )
}

export default VoteDetailBody;