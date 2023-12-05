import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { serverurl } from "../../../components/serverurl";
import { Await, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import useWeb3 from '../../../hooks/web3.hook';
import { adminWallet , adminPrimarykey } from './adminInfo';
import LoadingComponent from "../../../components/LoadingComponent";

interface BuyPost {
  price: number;
  amount: number;
}
interface socketProps {
  isSocket: any;
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
        "name": "howBuy",
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

const buyPost = async (propertyName: string,buyData:BuyPost,token:string, user:any, web3:any, setisLoading: any): Promise<any> => {
    
    // console.log(buyData); // {price: 1000, amount: 5} 
    setisLoading(true);
    const getCa : any = await axios.post<string>(`${serverurl}/order/getca_mysellorders/${propertyName}`,{
        token : token
    })
    const real_estate_CA = getCa.data.address;
    // console.log(real_estate_CA);
    const testCa = web3 ? new web3.eth.Contract(estate_abi,real_estate_CA,{data:""}) : null;
    // console.log(testCa);
    // console.log(user.account);
    const howBuyAmount = await testCa.methods.howBuy().call({
        from : user.account,
    })
    // console.log(Number(howBuyAmount));

    if(buyData.amount > Number(howBuyAmount)){
        setisLoading(false);
        alert(`매수 주문 오류 : 전체 물량의 20% 초과 보유 불가 ${Number(howBuyAmount)} 개만 주문 가능 `);
        return;
    }
    const {data} = await axios.post<string>(`${serverurl}/order/buy/${propertyName}`,{
        ...buyData,
        token: token
    });
    // console.log(data);
    return {data,real_estate_CA};
}

const BuyTabInfo: React.FC<socketProps> = ({ isSocket }) => {
  // const {socket} = useContext(GlobalContext);
  // // console.log(isSocket);

  const currentPage = useLocation();
  // // console.log(currentPage.state);
  const queryClient = useQueryClient();

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");

    const [buyPrice,setBuyPrice] = useState<any>(0);
    const [buyAmount,setBuyAmount] = useState<any>(0);
    const {user,web3} = useWeb3();

    const [isOpen, setisOpen] =useState(false);
    const [isContent, setContent] = useState("");
    const [isTitle, setIsTitle] = useState("");
    const [isLoading, setisLoading] = useState(false);

  const priceInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(event.target.value);
    if (!isNaN(price)) {
      setBuyPrice(price);
    }
  };

  const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      setBuyAmount(amount);
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
    setBuyPrice("");
    setBuyAmount("");
  };

  // 매수 완료 혹은 매수 주문 완료 전용
  const clearInputs2 = () => {
    if (priceInputRef.current && priceInputRef.current?.value !== "") {
      priceInputRef.current.value = "";
    }
    if (amountInputRef.current && amountInputRef.current?.value !== "") {
      amountInputRef.current.value = "";
    }
    setBuyPrice("");
    setBuyAmount("");
  };

    const mutation = useMutation<string,Error,{propertyName: string; buyData: BuyPost; user : any; web3 : any;}>(
        {
            mutationFn:({propertyName,buyData})=>buyPost(propertyName,buyData,isCookie,user,web3,setisLoading),
            onSuccess: async (data: any) => {
                // console.log(data);
                // console.log(data.data.data);
                // console.log(data.real_estate_CA);

                if(data.data =='매수 주문 완료' || data.data.message =='매수 완료'){
                    setisOpen(true);
                    setisLoading(false);

                    setIsTitle('매수 주문 접수')
                    setContent('매수주문 정상 접수되었습니다.');
                }

                if(data.data == '보유 금액 부족'){
                    setisLoading(false);
                    setisOpen(true);

                    setIsTitle('매수 주문 오류')
                    setContent('보유 금액 부족');
                }
                if(data.data.data){
                    // console.log(adminWallet);

                    for (const el of data.data.data) {
                        
                        console.log(el);
                        // console.log(el.sellerWalelt)
                        // console.log(el.buyerWallet)
                        // console.log(el.conclusionAmount)

                        let transferFromTransaction = {
                            from: adminWallet,
                            to: data.real_estate_CA,
                            gas:  3000000,
                            gasPrice: web3?.utils.toWei('100', 'gwei'),
                            data: web3?.eth.abi.encodeFunctionCall(
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
                                }
                            , [el.sellerWallet, el.buyerWallet, el.conclusionAmount]),
                        };
                        // console.log(adminPrimarykey);
                        let signedTransaction = await web3?.eth.accounts.signTransaction(transferFromTransaction, adminPrimarykey);
                        // console.log(signedTransaction);
                        
                        try {
                            const receipt = await web3?.eth.sendSignedTransaction(signedTransaction!.rawTransaction);
                            console.log("TransferFrom Transaction Hash:", receipt?.transactionHash);
                            console.log("TransferFrom Transaction Receipt:", receipt);
                            if(receipt) {
                                setisLoading(false);
                            } 
                        } catch (error) {
                            console.error("TransferFrom Transaction Error:", error);
                        }
                    }
    
                }
                clearInputs2();
                queryClient.refetchQueries({queryKey:["fetchCompleteDeal"]});
                queryClient.refetchQueries({queryKey:["incompleteDeals"]});
                queryClient.refetchQueries({queryKey:["headerInfo"]});
                isSocket.emit("purchase_completed")

            },
            onError: (error) => {
                console.log(error);
            }
        }
    );
    // event: React.FormEvent<HTMLFormElement>

    const handleSubmit = (propertyName: string, buyData: BuyPost, user :any , web3 : any)=>{
        mutation.mutate({propertyName,buyData, user, web3});
    };

  useEffect(() => {
    // console.log(buyPrice);
  }, [buyPrice]);

    return (
        <>
        {isLoading && <LoadingComponent/>}
        {/* 알림창 */}
        {isOpen && 
            <>
            <div className='absolute border-2 top-0 left-0 w-full h-full bg-state_loading_back z-50'>
                <div className='absolute top-1/2 left -1/2 border-2 custom-transform w-72 h-32 flex flex-col items-center bg-white z-50' >
                    <span className='font-bold mt-3 text-red-800'>{isTitle}</span> <br></br> <span className='-mt-3 text-sm'>{isContent}</span>
                    <hr className='border-1 w-full mt-3'></hr>
                    <button onClick={()=>setisOpen(false)} className='mt-2 text-red-800'>확인</button>
                </div>
            </div>
            </>
        }
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const newData = {price:buyPrice,amount:buyAmount};
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
                        총 <span className='ml-2'>{buyPrice * buyAmount} 원</span>
                    </div>
                    <div className='w-[70%] h-5 flex justify-between text-xs'>
                        <button className='bg-slate-400 text-white w-[40%] h-5' onClick={clearInputs}>초기화</button>
                        <button type='submit' className='bg-red-500 text-white w-[55%] h-5'>매수</button>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}

export default BuyTabInfo;
