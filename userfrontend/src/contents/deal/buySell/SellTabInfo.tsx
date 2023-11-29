import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { serverurl } from '../../../components/serverurl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import useWeb3 from '../../../hooks/web3.hook';
import {Contract} from "web3";
import testAbi from '../../../abi/estate.json'
// import estateAbi from '../../../abi/estate.json';
interface SellPost {
  price: number;
  amount: number;
}
const estate_abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "__totalSupply",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "subscribers",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "__lockTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "name": "TransferWithSymbol",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_useraddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ForceBurn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_useraddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ForceMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "_adminLockTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDocumentURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLockTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "__documentURI",
                "type": "string"
            }
        ],
        "name": "setDocumentURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const; 

// const [contract,setContract] = useState<any>("");

const sellPost = async (propertyName: string,sellData:SellPost,token:string,user:any,web3:any): Promise<any> => {
    
    // ca, 내가 걸어 놓은 매도 주문, 내 판매가능 수량 3개 가져오기.
    const getCa_mysellorders : any = await axios.post<string>(`${serverurl}/order/getca_mysellorders/${propertyName}`,{
        token : token
    })
    console.log(getCa_mysellorders.data);

    if(getCa_mysellorders.data.possible_quantity == undefined){
        alert("보유 수량 없음")
        return;
    }
    if(Number(getCa_mysellorders.data.possible_quantity) < Number(sellData.amount)){
        alert("보유 수량 부족")
        return;
    }

    // 현재 내가 걸어 놓은 매도 주문
    const approveAmount = Number(sellData.amount) + Number(getCa_mysellorders.data.total_possible_amount);
    // 현재 매물의 CA
    const real_estate_CA = getCa_mysellorders.data.address;
    
    // abi 랑 ca 가져와서 contract 생성.
    const testCa = web3 ? new web3.eth.Contract(estate_abi,real_estate_CA,{data : ""}) : null;

    console.log(user.account);
        const balanceOf = await testCa?.methods.balanceOf(user.account).call();
        console.log("balance ----",balanceOf);

        const approve = await testCa?.methods.approve("0xF5649DC185fe16C22D3Ef5E43921f206A8cd2fD2",approveAmount).send({
            from : user.account,
        });
        console.log(approve);

    
    const {data} = await axios.post<string>(`${serverurl}/order/sell/${propertyName}`,{
        ...sellData,
        token : token
    });
    console.log(data);

    if(approve) return {data,real_estate_CA,testCa};

}

interface socketProps {
  isSocket: any;
}

const SellTabInfo: React.FC<socketProps> = ({ isSocket }) => {
  const currentPage = useLocation();

  const queryClient = useQueryClient();

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");

    const [sellPrice,setSellPrice] = useState<any>(0);
    const [sellAmount,setSellAmount] = useState<any>(0);
    const {user,web3} = useWeb3();

    
    const priceInputRef = useRef<HTMLInputElement>(null);
    const amountInputRef = useRef<HTMLInputElement>(null);

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(event.target.value);
    if (!isNaN(price)) {
      setSellPrice(price);
    }
  };

  const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setSellAmount(amount);
    }
  };

  // 초기화 버튼 전용
  const clearInputs = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (priceInputRef.current && priceInputRef.current?.value !== "") {
      priceInputRef.current.value = "";
    }
    if (amountInputRef.current && amountInputRef.current?.value !== "") {
      amountInputRef.current.value = "";
    }
    setSellPrice("");
    setSellAmount("");
  };

  // 매도 완료 혹은 매도 주문 완료 전용
  const clearInputs2 = () => {
    if (priceInputRef.current && priceInputRef.current?.value !== "") {
      priceInputRef.current.value = "";
    }
    if (amountInputRef.current && amountInputRef.current?.value !== "") {
      amountInputRef.current.value = "";
    }
    setSellPrice("");
    setSellAmount("");
  };

    const mutation = useMutation<string,Error,{propertyName: string; sellData:SellPost; user:any; web3:any;}>(
        {
            mutationFn:({propertyName,sellData})=>sellPost(propertyName,sellData,isCookie,user,web3),
            onSuccess: async (data : any)=>{
                console.log(data);
                console.log(data.real_estate_CA);  //CA 주소
                console.log(data.data.data);

                if(data.data.data){
                    
                    data.data.data.forEach(async (el : any) => {
                        console.log(el);
                        console.log(el.sellerWallet)
                        console.log(el.buyerWallet)
                        console.log(el.conclusionAmount)

                        // let transferFromTransaction = {
                        //     from: "0xF5649DC185fe16C22D3Ef5E43921f206A8cd2fD2",
                        //     to: data.real_estate_CA,
                        //     gas:  200000,
                        //     gasPrice: web3?.utils.toWei('100', 'gwei'),
                        //     data: web3?.eth.abi.encodeFunctionCall(
                        //         {
                        //             "inputs": [
                        //                 {
                        //                     "internalType": "address",
                        //                     "name": "from",
                        //                     "type": "address"
                        //                 },
                        //                 {
                        //                     "internalType": "address",
                        //                     "name": "to",
                        //                     "type": "address"
                        //                 },
                        //                 {
                        //                     "internalType": "uint256",
                        //                     "name": "amount",
                        //                     "type": "uint256"
                        //                 }
                        //             ],
                        //             "name": "transferFrom",
                        //             "outputs": [
                        //                 {
                        //                     "internalType": "bool",
                        //                     "name": "",
                        //                     "type": "bool"
                        //                 }
                        //             ],
                        //             "stateMutability": "nonpayable",
                        //             "type": "function"
                        //         }
                        //     , [el.sellerWallet, el.buyerWallet, el.conclusionAmount]),
                        // };
      
                        // let signedTransaction = await web3?.eth.accounts.signTransaction(transferFromTransaction, "6e31603120a0b4e9c4e42b2fdfbfd7f5609ccd6f79a3f56c573428f059dab017");
                        // // console.log(signedTransaction);
                        
                        // try {
                        //     const receipt = await web3?.eth.sendSignedTransaction(signedTransaction!.rawTransaction);
                        //     console.log("TransferFrom Transaction Hash:", receipt?.transactionHash);
                        //     console.log("TransferFrom Transaction Receipt:", receipt);
                        // } catch (error) {
                        //     console.error("TransferFrom Transaction Error:", error);
                        // }
                        const result = await data.testCa.methods.transferFrom(el.sellerWallet,el.buyerWallet,el.conclusionAmount).send({
                            from : "0xF5649DC185fe16C22D3Ef5E43921f206A8cd2fD2",
                            gas: 2000000,
                            // gasPrice: web3?.utils.toWei('100', 'gwei'),
                        })
                        console.log("--result-- ", result);
    
                    });
                }
                clearInputs2();
                queryClient.refetchQueries({queryKey:["fetchCompleteDeal"]});
                queryClient.refetchQueries({queryKey:["incompleteDeals"]});
                queryClient.refetchQueries({queryKey:["headerInfo"]});

      isSocket.emit("sale_completed");
    },
    onError: (error) => {
      console.log(error);
    },
  });

    const handleSubmit = (propertyName: string, sellData: SellPost, user:any,web3:any)=>{
        mutation.mutate({propertyName,sellData,user,web3});
    };

  useEffect(() => {
    // console.log(sellPrice);
  }, [sellPrice]);

    return (
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const newData = {price: sellPrice,amount:sellAmount};
            handleSubmit(currentPage.state.propertyName,newData,user,web3);
        }}>
            <div className='buy-sell-input w-full h-full flex flex-col text-sm'>
                <div className='buy-input w-full h-full border-b border-dashed flex flex-col justify-center items-center'>
                    <div className='w-[70%] flex flex-row justify-end items-center mt-2 mb-1'>
                        <input ref={priceInputRef} className='w-[96%] border border-slate-300 rounded-md text-right pr-1 mr-1' 
                        type='text' placeholder='0' onChange={handlePriceInput} />
                        <span className='w-[4%] h-full flex justify-center items-center'>원</span>
                    </div>
                    <div className='w-[70%] flex flex-row justify-end items-center mt-1 mb-1'>
                        <input ref={amountInputRef} className='w-[96%] border border-slate-300 rounded-md text-right pr-1 mr-1' 
                        type='text' placeholder='0' onChange={handleAmountInput} />
                        <span className='w-[4%] h-full flex justify-center items-center'>개</span>
                    </div>
                    <div className='w-[70%] h-5 flex flex-row justify-end mt-1 mb-1'>
                        총 <span className='ml-2'>{sellPrice * sellAmount} 원</span>
                    </div>
                    <div className='w-[70%] h-5 flex justify-between text-xs'>
                        <button className='bg-slate-400 text-white w-[40%] h-5' onClick={clearInputs}>초기화</button>
                        <button type='submit' className='bg-blue-500 text-white w-[55%] h-5'>매도</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SellTabInfo;
