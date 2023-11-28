import React, { useEffect, useState } from 'react';
import VoteListItemBox from '../contents/vote_list/layout/VoteListItemBox';
import TabBar from '../layouts/TabBar';
import useWeb3 from '../hooks/web3.hook';
import voteContractInfo from '../abi/Voting.json';

const VoteList: React.FC = () => {
    const {user,web3} = useWeb3();

    const [contract,setContract] = useState<any>(null);

    useEffect(()=>{
        if(web3 !== null){
            if(contract) return;
    
            const tokenContract = new web3.eth.Contract(
                voteContractInfo.votingABI,
                "0x2FCC105C8d9cf8285b1016a56bc5f9ADe88E5108",
                {data : ""}
            );
    
            setContract(tokenContract);
        };
    },[web3]);

    const getVotingDetails = async () => {
        const details = await contract.methods.getVoteInfo().call();
        console.log(details);
    };

    useEffect(()=>{
        if(web3 !== null){
            getVotingDetails();
        }
    },[web3]);

    return (
        <div className='w-screen h-screen pb-12'>
            <div className='w-full h-full overflow-y-scroll pr-2 pl-2'>
                <VoteListItemBox />
            </div>
            <TabBar />
        </div>
    )
}

export default VoteList;