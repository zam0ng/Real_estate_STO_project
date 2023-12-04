import React, { ChangeEventHandler, useEffect, useState } from 'react';
import useWeb3 from '../hooks/web3.hook';
import voteContractInfo from '../abi/Voting.json';
import axios from 'axios';
import { serverurl } from '../components/serverurl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    const queryClient = useQueryClient();

    const [contract,setContract] = useState<any>(null);

    const [tokenCA,setTokenCA] = useState<string>("");
    const [ownerList,setOwnerList] = useState<string[]>([]);
    const [amountList,setAmountList] = useState<number[]>([]);
    const [voteCA,setVoteCA] = useState<string>("");

    const [startDateOriginal,setStartDateOriginal] = useState<string>("");
    const [endDateOriginal,setEndDateOriginal] = useState<string>("");

    // 매물 이름, 투표 내용(제목), 시작 날짜, 종료 날짜
    const [selectedProperty,setSelectedProperty] = useState<string>("");
    const [voteDescription,setVoteDescription] = useState<string>("");
    const [startDate,setStartDate] = useState<number>(0);
    const [endDate,setEndDate] = useState<number>(0);


    // 매물 이름 선택하면 해당 매물의 토큰 CA 가져오는거
    const fetchTokenCA = async (property: string): Promise<ContractAddressRequest[]> => {
        const response = await axios.get(`${serverurl}/vote/token_contract_address`,{
            params: {
                real_estate_name: property
            }
        });
        return response.data;
    };

    // const fetchVoteCA = async () => {
    //     const response = await axios.get(`${serverurl}/vote/vote_contract_address`);
    //     return response.data;
    // };

    // 매물 이름 선택하면 해당 매물을 소유한 사람들의 지갑 주소 가져오는거
    const fetchVotableUsers = async (property: string): Promise<string[]> => {
        const response = await axios.get(`${serverurl}/vote/vote_wallets`,{
            params: {
                real_estate_name: property
            }
        });
        return response.data;
    };

    // 매물 이름 선택하면 해당 매물을 소유한 사람들의 소유한 양 가져오는거
    const fetchVotableUsersAmount = async (property: string): Promise<number[]> => {
        const response = await axios.get(`${serverurl}/vote/vote_amounts`,{
            params: {
                real_estate_name: property
            }
        });
        return response.data;
    };

    // 투표 테이블에 내용 넣는거
    const sendVoteInfo = async (address: string,selectedProperty: string,voteDescription: string,startDate:string,endDate:string) => {
        const {data} = await axios.post(`${serverurl}/vote/vote_insert`,{
            address: address,
            real_estate_name: selectedProperty,
            vote_title: voteDescription,
            vote_start_date: startDate,
            vote_end_date: endDate
        });
        return data;
    };

    // ca 테이블에 넣는거
    const sendVoteCAinfo = async (address: string) => {
        const {data} = await axios.post(`${serverurl}/vote/insert_contract_address`,{
            real_estate_name: selectedProperty,
            address: address
        });
        return data;
    }

    // 투표 목록 페이지에서 사용할 부분
    // const {data:voteCAdata,error:voteCAerror,isLoading:voteCAisLoading,isError:voteCAisError} = useQuery({
    //     queryKey: ["fetchVoteCA"],
    //     queryFn: fetchVoteCA
    // });

    // useEffect(()=>{
    //     console.log(tokenCAdata);
    //     if(tokenCAdata){
    //         setTokenCA(tokenCAdata[0].address)
    //     };
    // },[tokenCAdata]);

    // useEffect(()=>{
    //     console.log(voteCAdata);
    // },[voteCAdata]);

    // useEffect(()=>{
    //     console.log(userData);
    //     if(userData){
    //         setOwnerList(userData);
    //     }
    // },[userData]);

    // useEffect(()=>{
    //     console.log(userAmountData);
    //     if(userAmountData){
    //         setAmountList(userAmountData);
    //     }
    // },[userAmountData]);

    // 컨트랙트 불러오기
    useEffect(()=>{
        if(web3 !== null){
            if(contract) return;
    
            const tokenContract = new web3.eth.Contract(
                voteContractInfo.votingABI
            );
    
            setContract(tokenContract);
        };
    },[web3]);

    // 매물 옵션 선택하기
    const selectProperty = () => {
        const selectedOption = document.querySelector("input[name='real_estate_name']:checked");
        if(selectedOption){
            const selectedValue = (selectedOption as HTMLInputElement).value;
            console.log(selectedValue);
            setSelectedProperty(selectedValue);
        };
    };

    // 매물별 토큰 CA 가져오기
    const {data:tokenCAdata,error:tokenCAerror,isLoading:tokenCAisLoading,isError:tokenCAisError} = 
    useQuery<ContractAddressRequest[]>({
        queryKey: ["fetchTokenCA"],
        queryFn: ()=>fetchTokenCA(selectedProperty),
        enabled: !!selectedProperty
    });

    // 해당 매물을 가진 사람들의 지갑 주소 가져오기
    const {data:userData,error:userError,isLoading:userIsLoading,isError:userIsError} = useQuery<string[]>({
        queryKey: ["fetchVotableUsers",selectedProperty],
        queryFn: ()=>fetchVotableUsers(selectedProperty),
        enabled: !!selectedProperty
    });

    // 해당 매물을 가진 사람들의 토큰 양 가져오기
    const {data:userAmountData,error:userAmountError,isLoading:userAmountLoading,isError:userAmountIsError} = 
    useQuery<number[]>({
        queryKey: ["fetchVotableUsersAmount",selectedProperty],
        queryFn: ()=>fetchVotableUsersAmount(selectedProperty),
        enabled: !!selectedProperty
    });

    // 매물별 토큰 CA 저장시켜주기
    useEffect(()=>{
        console.log(tokenCAdata);
        if(tokenCAdata){
            setTokenCA(tokenCAdata[0].address);
        }
    },[tokenCAdata])

    // 매물 소유한 사람들의 지갑 주소
    useEffect(()=>{
        console.log(userData);
        if(userData !== undefined){
            setOwnerList(userData);
        }
    },[userData]);

    // 매물 소유 양
    useEffect(()=>{
        console.log(userAmountData);
        if(userAmountData !== undefined && userAmountData.length > 0){
            setAmountList(userAmountData);
        }
    },[userAmountData]);


    // 투표 내용(제목)
    const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setVoteDescription(event.target.value);
        console.log(voteDescription);
    };

    // 시작 날짜
    const handleStartDate: ChangeEventHandler<HTMLInputElement> = (event) => {
        const selectedDate = event.target.value;
        setStartDateOriginal(selectedDate);
        console.log(selectedDate); // 2023-11-12
        const date = new Date(selectedDate);
        const toSeconds = date.getTime()/1000;
        console.log(toSeconds); // 172345000
        setStartDate(toSeconds);
    };

    // 종료 날짜
    const handleEndDate: ChangeEventHandler<HTMLInputElement> = (event) => {
        const selectedDate = event.target.value;
        setEndDateOriginal(selectedDate);
        console.log(selectedDate);
        const date = new Date(selectedDate);
        const toSeconds = date.getTime()/1000;
        console.log(toSeconds);
        setEndDate(toSeconds);
    };

    // 투표 테이블에 집어넣기
    const mutationVoteTable = useMutation({
        mutationFn: (address:string)=>sendVoteInfo(address,selectedProperty,voteDescription,startDateOriginal,endDateOriginal),
        onSuccess: (data)=>{
            console.log("successfully inserted vote info into vote table",data);
        },
        onError: (error)=>{
            console.log("failed to insert vote info into vote table",error);
        }
    });

    // ca 테이블에 집어넣기
    const mutationCAtable = useMutation({
        mutationFn: (address:string)=>sendVoteCAinfo(address),
        onSuccess: (data)=>{
            console.log("successfully inserted ca into ca table",data);
        },
        onError: (error)=>{
            console.log("failed to insert ca into ca table",error);
        }
    })

    // deploy function - 투표 등록 (배포)
    const addVote = async ()=>{
        const accounts = await web3?.eth.getAccounts();
        console.log(accounts);
        if(accounts){
            if(accounts.length === 0){
                console.log("No account found");
            };
        };

        if(contract){
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
                    selectedProperty,
                    // 5. vote description / title : input
                    voteDescription,
                    // 6. start date in seconds (.getTime() / 1000) : input
                    startDate,
                    // 7. end date in seconds (.getTime() / 1000) : input
                    endDate
                ]
            })
            .send({
                from: accounts && accounts[0],
                gas: "3000000",
                gasPrice: web3?.utils.toWei('1','gwei')
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
                mutationCAtable.mutate(newInstance.options.address);
                mutationVoteTable.mutate(newInstance.options.address);
            })
            .catch((error: string)=>{
                console.error("Error while deploying : ",error);
            })
        }
    };

    return (
        <>
            <div>VotingTestPage</div>
            <br />
            <div className='w-32 h-32 border border-black flex flex-col items-start'>
                <label>
                    <input type='radio' name='real_estate_name' value="문래 공차" onClick={selectProperty} />
                    문래 공차
                </label>
                <label>
                    <input type='radio' name='real_estate_name' value="문래 볼" onClick={selectProperty} />
                    문래 볼
                </label>
                <label>
                    <input type='radio' name='real_estate_name' value="문래 문래" onClick={selectProperty} />
                    문래 문래
                </label>
                <label>
                    <input type='radio' name='real_estate_name' value="문래 오래" onClick={selectProperty} />
                    문래 오래
                </label>
                <label>
                    description
                    <input type='text' className='border border-black' onChange={handleDescriptionChange} />
                </label>
                <label>
                    start date
                    <input type='date' className='border border-black' onChange={handleStartDate} />
                </label>
                <label>
                    end date
                    <input type='date' className='border border-black' onChange={handleEndDate} />
                </label>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            
            <button onClick={addVote} className='w-14 h-8 border border-black bg-slate-300'>투표 등록</button>
        </>
    )
}

export default VotingTestPage;