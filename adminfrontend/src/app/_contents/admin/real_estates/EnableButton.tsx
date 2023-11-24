"use client"

import { EnableButtonParam } from "@/app/_features/admin/real_estates";
import Web3 from "web3";
import abi from '../abi/Factory.json';
import AbiItem from 'web3-utils';
// 💪
const EnableButton = ({ text }: EnableButtonParam) => {
  //  http://127.0.0.1:8545
  // https://network.bouncecode.net/
  const web3 = new Web3("http://127.0.0.1:8545");
  const monraeContract = new web3.eth.Contract(abi ,"0x972A48DC3B5C70b1064C077b8d801327Ce54b230",{data: ""});

    const ownerAddress: string = '0xEf43F08be59eFAeF99870Bd0a212c1c942A0aE20';
    const name: string = 'monrae';
    const symbol: string = 'mr';
    const totalSupply: number = 100;
    const subscribers: string[] = ["0x4d4E373fdE0194778Dc7D43293e6D36130b467fb","0x66e00Bc8d0dEE7E4ECdCB43075cd60777C7D2509","0x3E17F584c6d0e10dbCad1b6645eb4BBB5d3128fa","0x8e5611a9e448ec9eF81Ab19D7c3cBB735316F7B8","0xD9394307d88Db4fA3D4136cd67eFA8E19F5c8e36","0x9dCb34877Bda077AC03FC974938A9fcC8d91C9a7"];
    const amounts: number[] = [17,17,17,17,17,15];
    const lockTime: number = 0;

  const handleSTOBtn = async() => {
   
    // 버튼 누를 때 팩토리 ca가 실행되서 매물 토큰 발행 ca를 생성
    const data = await monraeContract.methods.createCA(
      ownerAddress,
      "monrae",
      "mr",
      100,
      ["0x4Ad59fC7f2afa0FED68cD835459259E7fD757DbD","0x0a89A8069Abf233B4e959c67Cf60f3A6e375041D","0x68E6e24D4E69b6a05c0BD514F4108fE198533758","0x78A97Ad5cb1e3950CB2917F4A4E5cFF3F7869fFb","0xE98dfFB19EdA34A614b8AB37b9f9B7e9903900e5","0xCff2bF9847D423825EFC8f1Fa9aE87549f15B027"],
      [17,17,17,17,17,15],
      0,
    ).send({
      from : "0xA2D29620a5826E83D2e0d967EFb649d7c39b917c",
    })
    

    // createCA 함수의 매개변수 전달
    // const data = monraeContract.methods.createCA(
    //   "0xA2D29620a5826E83D2e0d967EFb649d7c39b917c",
    //   "Name",
    //   "Symbol",
    //   1000,
    //   ["0xSub1", "0xSub2"],
    //   [10, 20],
    //   123456789
    // ).encodeABI();
  
  // const transactionObject = {
  //     from: "0xA2D29620a5826E83D2e0d967EFb649d7c39b917c",
  //     data: data,
  // };
  
  // const transaction = await web3.eth.sendTransaction(transactionObject);
  }

  return (
    <>
      {/* STO 등록 또는 청약 등록 */}
      <button  onClick={handleSTOBtn} className="flex items-center justify-center col-span-1 text-base font-bold text-neutral-700 ">
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
