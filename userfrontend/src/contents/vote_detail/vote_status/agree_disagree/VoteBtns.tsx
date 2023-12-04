import React, { useEffect, useState } from 'react';
import useWeb3 from '../../../../hooks/web3.hook';
import voteContractInfo from "../../../../abi/Voting.json";
import { useLocation } from 'react-router-dom';

interface OwnerVoterProps {
  tokenOwners: string[];
  votedOwners: string[];
  voteCA: string;
  startDate: number;
  endDate: number;
}

const VoteBtns: React.FC<OwnerVoterProps> = ({tokenOwners,votedOwners,voteCA,startDate,endDate}) => {
  const currentTime = new Date().getTime() / 1000;
  
  const currentPage = useLocation();
  
  const newTokenOwners = tokenOwners.map(item=>item.toLowerCase());
  const newVotedOwners = votedOwners.map(item=>item.toLowerCase());
  // console.log(newTokenOwners);
  // console.log(newVotedOwners);

  const [whoVoted,setWhoVoted] = useState<string[]>([]);
  useEffect(()=>{
    setWhoVoted(newVotedOwners);
    console.log(whoVoted);
  },[]);
  
  const {user,web3} = useWeb3();

  const [currentAccount,setCurrentAccount] = useState<string>(currentPage.state.wallet);
  // console.log(currentAccount);
  const [contract,setContract] = useState<any>(undefined);

  useEffect(()=>{
    const fetchUserData = async () => {
      const accounts = await window.ethereum.request({method:"eth_accounts"});
      if(accounts.length > 0){
        setCurrentAccount(accounts[0]);
      }
    };
    fetchUserData();
  },[])

  useEffect(()=>{
    if(user){
      console.log(user);
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
          // console.log(user);
        }
      })
    }else{
      console.log("no metamask found");
    }
  },[user]);

  useEffect(()=>{
    if(web3 !== null){
        if(contract) return;

        const tokenContract = new web3.eth.Contract(
            voteContractInfo.votingABI,
            voteCA,
            {data:""}
        );

        setContract(tokenContract);
    };
  },[web3]);

  const agree = async ()=>{
    try {
      await contract.methods.vote(true).send({
        from:currentAccount,
        gasPrice: web3?.utils.toWei('1','gwei')
      });
      alert("투표가 완료되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const disagree = async ()=>{
    try {
      await contract.methods.vote(false).send({
        from:currentAccount,
        gasPrice: web3?.utils.toWei('1','gwei')
      });
      alert("투표가 완료되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className='w-full h-16 flex flex-row justify-evenly items-center'>
      {currentTime < startDate && (
        <>
          <div className='w-[70%] h-10 border border-slate-200 rounded-lg text-slate-500 bg-slate-200 flex justify-center items-center'>
            투표 오픈 예정
          </div>
        </>
      )}
      {currentTime > endDate && (
        <>
          <div className='w-[70%] h-10 border border-slate-200 rounded-lg text-slate-500 bg-slate-200 flex justify-center items-center'>
            투표 종료
          </div>
        </>
      )}
      {currentTime > startDate && currentTime < endDate && newTokenOwners.includes(currentAccount) && !newVotedOwners.includes(currentAccount) && (
        <>
          <button className='w-24 h-10 rounded-lg text-white bg-blue-500' onClick={agree}>
            찬성
          </button>
          <button className='w-24 h-10 rounded-lg text-white bg-red-500' onClick={disagree}>
            반대
          </button>
        </>
      )}
      {currentTime > startDate && currentTime < endDate && newTokenOwners.includes(currentAccount) && newVotedOwners.includes(currentAccount) && (
        <>
          <div className='w-[70%] h-10 border border-slate-200 rounded-lg text-slate-500 bg-slate-200 flex justify-center items-center'>
            투표 완료
          </div>
        </>
      )}
      {currentTime > startDate && currentTime < endDate && !newTokenOwners.includes(currentAccount) && (
        <>
          <div className='w-[70%] h-10 border border-slate-200 rounded-lg text-slate-500 bg-slate-200 flex justify-center items-center'>
            투표 불가 : 보유한 토큰이 없음
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default VoteBtns;