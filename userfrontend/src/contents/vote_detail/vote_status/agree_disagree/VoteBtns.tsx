import React, { useEffect, useState } from 'react';
import useWeb3 from '../../../../hooks/web3.hook';
import voteContractInfo from "../../../../abi/Voting.json";
import { useLocation } from 'react-router-dom';

interface OwnerVoterProps {
  tokenOwners: string[];
  votedOwners: string[];
  voteCA: string;
}

const VoteBtns: React.FC<OwnerVoterProps> = ({tokenOwners,votedOwners,voteCA}) => {
  const currentPage = useLocation();
  // console.log(tokenOwners);
  // console.log(votedOwners);
  const newTokenOwners = tokenOwners.map(item=>item.toLowerCase());
  const newVotedOwners = votedOwners.map(item=>item.toLowerCase());
  
  const {user,web3} = useWeb3();

  const [currentAccount,setCurrentAccount] = useState<string>(currentPage.state.wallet);
  const [voteState,setVoteState] = useState<string>("vote-check");
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
    await contract.methods.vote(true).send({from:currentAccount});
  };

  const disagree = async ()=>{
    await contract.methods.vote(false).send({from:currentAccount});
  };

  return (
    <>
    <div className='w-full h-16 flex flex-row justify-evenly items-center'>
      {newTokenOwners.includes(currentAccount) && !newVotedOwners.includes(currentAccount) && (
        <>
          <button className='w-24 h-10 rounded-lg text-white bg-blue-500' onClick={agree}>
            찬성
          </button>
          <button className='w-24 h-10 rounded-lg text-white bg-red-500' onClick={disagree}>
            반대
          </button>
        </>
      )}
      {newTokenOwners.includes(currentAccount) && newVotedOwners.includes(currentAccount) && (
        <>
          <div className='w-[70%] h-10 border border-slate-200 rounded-lg text-slate-500 bg-slate-200 flex justify-center items-center'>
            투표 완료
          </div>
        </>
      )}
      {!newTokenOwners.includes(currentAccount) && (
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