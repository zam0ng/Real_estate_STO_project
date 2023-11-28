import React, { useEffect, useState } from 'react';
import useWeb3 from '../hooks/web3.hook';
import voteContractInfo from '../abi/Voting.json';
import axios from 'axios';
import { serverurl } from '../components/serverurl';
import { useQuery } from '@tanstack/react-query';

interface ContractAddressRequest {
    id: number;
    real_estate_name: string;
    address: string;
    ca_type: string;
    symbol: string;
    createdAt: string;
    updatedAt: string;
}

const VotingTestPage: React.FC = () => {
    const {user,web3} = useWeb3();

    const [contract,setContract] = useState<any>(null);

    const [tokenCA,setTokenCA] = useState<string>("");
    const [ownerList,setOwnerList] = useState<string[]>([]);
    const [amountList,setAmountList] = useState<number[]>([]);
    const [voteCA,setVoteCA] = useState<string>("");

    const fetchTokenCA = async (): Promise<ContractAddressRequest[]> => {
        const response = await axios.get(`${serverurl}/vote/token_contract_address`);
        return response.data;
    };

    const fetchVoteCA = async () => {
        const response = await axios.get(`${serverurl}/vote/vote_contract_address`);
        return response.data;
    };

    const fetchVotableUsers = async (): Promise<string[]> => {
        const response = await axios.get(`${serverurl}/vote/vote_wallets`,{
            params: {
                real_estate_name: "문래 공차"
            }
        });
        return response.data;
    };

    const fetchVotableUsersAmount = async (): Promise<number[]> => {
        const response = await axios.get(`${serverurl}/vote/vote_amounts`,{
            params: {
                real_estate_name: "문래 공차"
            }
        });
        return response.data;
    };

    // 매물별 토큰 CA 가져오기
    const {data:tokenCAdata,error:tokenCAerror,isLoading:tokenCAisLoading,isError:tokenCAisError} = 
    useQuery<ContractAddressRequest[]>({
        queryKey: ["fetchTokenCA"],
        queryFn: fetchTokenCA
    });

    // 투표 목록 페이지에서 사용할 부분
    const {data:voteCAdata,error:voteCAerror,isLoading:voteCAisLoading,isError:voteCAisError} = useQuery({
        queryKey: ["fetchVoteCA"],
        queryFn: fetchVoteCA
    });

    // 해당 매물을 가진 사람들의 지갑 주소 가져오기
    const {data:userData,error:userError,isLoading:userIsLoading,isError:userIsError} = useQuery<string[]>({
        queryKey: ["fetchVotableUsers"],
        queryFn: fetchVotableUsers
    });

    // 해당 매물을 가진 사람들의 토큰 양 가져오기
    const {data:userAmountData,error:userAmountError,isLoading:userAmountLoading,isError:userAmountIsError} = 
    useQuery<number[]>({
        queryKey: ["fetchVotableUsersAmount"],
        queryFn: fetchVotableUsersAmount
    });

    useEffect(()=>{
        console.log(tokenCAdata);
        if(tokenCAdata){
            setTokenCA(tokenCAdata[0].address)
        };
    },[tokenCAdata])

    // useEffect(()=>{
    //     console.log(voteCAdata);
    // },[voteCAdata]);

    useEffect(()=>{
        console.log(userData);
        if(userData){
            setOwnerList(userData);
        }
    },[userData]);

    useEffect(()=>{
        console.log(userAmountData);
        if(userAmountData){
            setAmountList(userAmountData);
        }
    },[userAmountData]);

    useEffect(()=>{
        if(web3 !== null){
            if(contract) return;
    
            const tokenContract = new web3.eth.Contract(
                voteContractInfo.votingABI
            );
    
            setContract(tokenContract);
        };
    },[web3]);

    // deploy function
    const addVote = async ()=>{
        const accounts = await web3?.eth.getAccounts();
        console.log(accounts);
        if(accounts){
            if(accounts.length === 0){
                console.log("No account found");
            };
        };

        if(contract){
            console.log(tokenCA);
            console.log(ownerList);
            console.log(amountList);
            contract.deploy({
                data : voteContractInfo.votingBytecode,
                arguments : [
                    // 1. property token CA : tokenCA
                    tokenCA,
                    // 2. owner list : ownerList
                    ownerList,
                    // 3. amount list : amountList
                    amountList,
                    // 4. property name : input
                    "문래 공차",
                    // 5. vote description / title : input
                    "매각 투표",
                    // 6. start date in seconds (.getTime() / 1000) : input
                    1701129600,
                    // 7. end date in seconds (.getTime() / 1000) : input
                    1701388800
                ]
            })
            .send({
                from: accounts && accounts[0],
                gas: "4700000"
            })
            .on("transactionHash", (hash: string)=>{
                console.log("Transaction Hash : ",hash)
            })
            .on("confirmation",(confirmationNumber: number, receipt: string)=>{
                console.log("Confimation Number : ", confirmationNumber);
                console.log("Receipt : ",receipt);
            })
            .on("receipt", (receipt : string)=>{
                console.log("Receipt : ",receipt);
            })
            .then((newInstance: any)=>{
                console.log(`CA : ${newInstance.options.address}`);
                setVoteCA(newInstance.options.address);
            })
            .catch((error: string)=>{
                console.error("Error while deploying : ",error)
            })
        }
    };

    return (
        <>
            <div>VotingTestPage</div>
            <br />
            <br />
            <button onClick={addVote} className='w-14 h-8 border border-black bg-slate-300'>deploy</button>
        </>
    )
}

export default VotingTestPage;