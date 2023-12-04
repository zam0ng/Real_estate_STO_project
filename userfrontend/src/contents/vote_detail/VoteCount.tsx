import React, { useEffect, useState } from 'react';
import VoteAgreeNumber from './vote_status/agree_disagree/VoteAgreeNumber';
import VoteAgreeStatus from './vote_status/agree_disagree/VoteAgreeStatus';
import VoteDisagreeNumber from './vote_status/agree_disagree/VoteDisagreeNumber';
import VoteDisagreeStatus from './vote_status/agree_disagree/VoteDisagreeStatus';
import useWeb3 from '../../hooks/web3.hook';
import { useLocation } from 'react-router-dom';

interface AgreeDisagreeProps {
  tokenOwners: string[];
  votedOwners: string[];
  agreeVotes: number;
  disagreeVotes: number;
  totalVotes: number;
  startDate: number;
  endDate: number;
  tokenSymbol: string;
}

const VoteCount: React.FC<AgreeDisagreeProps> = ({tokenOwners,votedOwners,agreeVotes,disagreeVotes,totalVotes,startDate,endDate,tokenSymbol}) => {
  const currentPage = useLocation();
  // console.log(currentPage.state);

  const currentTime = new Date().getTime() / 1000;
  
  const newTokenOwners = tokenOwners.map(item=>item.toLowerCase());
  const newVotedOwners = votedOwners.map(item=>item.toLowerCase());
  const [whoVoted,setWhoVoted] = useState<string[]>([]);
  useEffect(()=>{
    setWhoVoted(newVotedOwners);
  },[votedOwners]);

  const {user,web3} = useWeb3();

  const [currentAccount,setCurrentAccount] = useState<string>("");

  const [agreeNumber,setAgreeNumber] = useState<number>(0);
  const [disagreeNumber,setDisagreeNumber] = useState<number>(0);
  const [totalNumber,setTotalNumber] = useState<number>(0);

  useEffect(()=>{
    setAgreeNumber(Number(agreeVotes));
    setDisagreeNumber(Number(disagreeVotes));
    setTotalNumber(Number(totalVotes));
  },[agreeVotes,disagreeVotes,totalVotes]);

  useEffect(()=>{
    const fetchUserData = async () => {
      const accounts = await window.ethereum.request({method:"eth_accounts"});
      if(accounts.length > 0){
        setCurrentAccount(accounts[0]);
      }
    };
    fetchUserData();
  },[]);

  useEffect(()=>{
    if(user){
      // console.log(user);
      setCurrentAccount(user.account);
    }
  },[user]);

  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.on("accountsChanged", (accounts: string[])=>{
        if(accounts.length === 0){
          console.log("no account connected: locked or not logged in");
        }else{
          const currentAccount = accounts[0];
          setCurrentAccount(currentAccount);
          // console.log("current account : ",currentAccount);
        }
      })
    }else{
      console.log("no metamask found");
    }
  },[user]);

  return (
    <>
      {currentTime > endDate && (
        <div className='w-full h-32 border-t border-slate-200'>
          <VoteAgreeNumber agreeVotes={agreeNumber} totalVotes={totalNumber} tokenSymbol={tokenSymbol} />
          <VoteAgreeStatus agreeVotes={agreeNumber} totalVotes={totalNumber} />
          <VoteDisagreeNumber disagreeVotes={disagreeNumber} totalVotes={totalNumber} tokenSymbol={tokenSymbol} />
          <VoteDisagreeStatus disagreeVotes={disagreeNumber} totalVotes={totalNumber} />
        </div>
      )}
      {currentTime > startDate && currentTime < endDate && newTokenOwners.includes(currentAccount) && whoVoted.includes(currentAccount) && (
        <div className='w-full h-32 border-t border-slate-200'>
          <VoteAgreeNumber agreeVotes={agreeNumber} totalVotes={totalNumber} tokenSymbol={tokenSymbol} />
          <VoteAgreeStatus agreeVotes={agreeNumber} totalVotes={totalNumber} />
          <VoteDisagreeNumber disagreeVotes={disagreeNumber} totalVotes={totalNumber} tokenSymbol={tokenSymbol} />
          <VoteDisagreeStatus disagreeVotes={disagreeNumber} totalVotes={totalNumber} />
        </div>
      )}
      {currentTime > startDate && currentTime < endDate && !newTokenOwners.includes(currentAccount) && (
        <div className='w-full h-32 border-t border-slate-200'>
          <VoteAgreeNumber agreeVotes={agreeNumber} totalVotes={totalNumber} tokenSymbol={tokenSymbol} />
          <VoteAgreeStatus agreeVotes={agreeNumber} totalVotes={totalNumber} />
          <VoteDisagreeNumber disagreeVotes={disagreeNumber} totalVotes={totalNumber} tokenSymbol={tokenSymbol} />
          <VoteDisagreeStatus disagreeVotes={disagreeNumber} totalVotes={totalNumber} />
        </div>
      )}
    </>
  )
}

export default VoteCount;