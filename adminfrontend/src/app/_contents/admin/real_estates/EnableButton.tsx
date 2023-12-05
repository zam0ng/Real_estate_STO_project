"use client"

import { EnableButtonParam } from "@/app/_features/admin/real_estates";
import {Contract, InvalidNonceOrChainIdError, Web3} from "web3";
import { useEffect, useState } from 'react';
import useAccount from "../hooks/useAccount";
import { getSubscriptionList } from "@/app/api/getSubscription_list";
import { useRouter } from "next/navigation";

// 💪
const EnableButton = ({ text,id,setLoading}: EnableButtonParam) => {
  const router = useRouter();

  const factory_abi =  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "DebugLog",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "EstateCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "callCA",
      "outputs": [
        {
          "internalType": "contract ERC20subscription[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
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
          "name": "_totalsupply",
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
          "name": "_lockTime",
          "type": "uint256"
        }
      ],
      "name": "createCA",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "estates",
      "outputs": [
        {
          "internalType": "contract ERC20subscription",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const;
  const factory_CA = "0x4Dd099b8f749a2E50852e5e51dF0865123A3f888";
  
  const [web3, setWeb3] = useState<Web3 | null >(null);
  // const [CAList, setCAList] = useState<string[] | any>([]);
  const {account} = useAccount();
  const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;

  useEffect(() => {
    // 클라이언트 환경에서만 실행
    if (typeof window !== 'undefined' && window.ethereum) {
      const initWeb3 = async () => {
        try {
          if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
          }
        } catch (error) {
          console.error(error);
        }
      };
      initWeb3();
    }
  }, []);

    const factoryContract = web3 ? new web3.eth.Contract(factory_abi ,factory_CA,{data: ""}) : null;
    // console.log(factoryContract);
    const handleSTOBtn = async(id : number) => {
        setLoading(true);
        try {
          const list = await getSubscriptionList(id);
          console.log(list)
          // // console.log(list.estateInfo[0]["Subscription.subscription_name"]); // 문래공차
          // // console.log(list.estateInfo[0]["Subscription.subscription_totalsupply"]); // 578000
          // // console.log(list.estateInfo[0]["Subscription.subscription_symbol"]); // MG
          // // console.log(list.estateInfo[0]["Subscription.subscription_building_date"]); // 
          // // console.log(list.wallet_list); // ['test@naver.com', 'test2@naver.com', 'test3@naver.com']
          // // console.log(list.amount_list); // [5, 2, 10]

          const estateName = list.estateInfo[0]["Subscription.subscription_name"];
          const symbol = list.estateInfo[0]["Subscription.subscription_symbol"];
          const totalsupply = list.estateInfo[0]["Subscription.subscription_totalsupply"];
          const currentDate = new Date();
          const buildingDate = new Date(list.estateInfo[0]["Subscription.subscription_building_date"]);
          
          // lockTime 설정 : 입고날짜 - 현재날짜 빼고 초로 환산
          const seconds: number = Math.floor((Math.abs(buildingDate.getTime() - currentDate.getTime()))/1000);
          // console.log(account)
          // console.log(estateName)
          // console.log(symbol)
          // console.log(totalsupply)
          // console.log(list.wallet_list),
          // console.log(list.amount_list),
          // console.log(seconds); // 212471
          // 버튼 누를 때 팩토리 ca가 실행되서 매물 토큰 발행 ca를 생성
          factoryContract?.methods.createCA(
          account,
          estateName,
          symbol,
          totalsupply,
          list.wallet_list,
          list.amount_list,
          seconds,
          ).send({
            from : account,
            // gas : "3000000",
            gas : "3000000",
            gasPrice : web3?.utils.toWei(20, 'gwei'),
          }).then(async (data :any)=>{
          // // console.log(data.events?.EstateCreated.returnValues[0]); 매물 CA 주소

          await fetch(`${domain}/admin/ca_register`,{
            method : "POST",
            headers: {
              'Content-Type': 'application/json', 
            },
            body : JSON.stringify({
              address : data.events?.EstateCreated.returnValues[0],
              real_estate_name : estateName,
              symbol : symbol,
            }),
          })
          await fetch(`${domain}/admin/status_update/${estateName}`,{
            method : "GET",
          })
          setLoading(false);
          router.refresh();                
          })
        } catch (error) {
          console.log(error);
        }
    } 
  // useEffect(()=>{
  //   // console.log(CAList);
  //   // console.log(CAList[0]);
    
  // },[CAList])
  
  // 문래 0번
  // const testBtn = async() =>{
  //   const monraeContract = web3 ? new web3.eth.Contract(estate_abi ,CAList[0],{data: ""}) : null;
  //   // console.log(monraeContract)

  //   const data = await monraeContract?.methods.balanceOf("0xB623C7CfB353Bd3a0619F1614d0d661f40978af8").call();
  //   // console.log(data);
  // }  
  return (
    <>
      {/* STO 등록 또는 청약 등록 */}
      <button  onClick={()=>{handleSTOBtn(id)}} className="flex items-center justify-center col-span-1 text-base font-bold text-neutral-700 ">
        {/* <div className="flex items-center w-24 -mr-8 border-2 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
        <div className="flex items-center w-5.6rem  rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg">
        {/* <div className="flex items-center w-10 -mr-8 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
          
          <p className="text-sm text-state_enable_bg_check_text">{text}</p>
          
          {/* 배경색 :  */}
          <div className="rounded-lg bg-state_enable_bg_check"> 
            <svg  className="m-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 23 23" fill="none">
              <path  d="M20.269 6.66309L9.26904 17.6631L4.26904 12.6631" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
        </div>
      </button>
      {/* <button>{id}</button> */}

      {/* 1차 테스트 : STO 등록 또는 청약 등록 */}
      {/* <div   className="flex items-center justify-center col-span-1 text-base font-bold text-neutral-700 "> */}
        {/* <div className="flex items-center w-24 -mr-8 border-2 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
        {/* <div className="flex items-center w-24 -mr-8 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
          
          {/* <p className="text-sm text-state_enable_bg_check_text">{text}</p> */}
          
          {/* 배경색 :  */}
          {/* <div className="rounded-lg bg-state_enable_bg_check"> 
            <svg  className="m-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 23 23" fill="none">
              <path  d="M20.269 6.66309L9.26904 17.6631L4.26904 12.6631" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>


        </div>
      </div> */}
    </>
  );
};

export default EnableButton;