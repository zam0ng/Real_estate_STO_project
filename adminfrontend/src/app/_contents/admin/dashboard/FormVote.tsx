"use client";

import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";
import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormSectionVoteInfo from "./FormSectionVoteInfo";
import getVoteableEstateData from "@/app/api/getVoteableEstateData";
import postFetchEstateForm from "@/app/api/postFetchEstateForm";
import postFetchVoteInfoVoteTable from "@/app/api/postFetchVoteInfoVoteTable";
import postFetchVoteInfoCATable from "@/app/api/postFetchVoteInfoCATable";

interface VoteableEstate {
  id: number;
  address: string;
  real_estate_name: string;
  cy_type: string;
  symbol: string;
}

/* API 데이터 형식 
const voteableEstateData = [
  {
    "id": 1,
    "address": "0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427",
    "real_estate_name": "문래 공차",
    "symbol": "MG"
},
  {
    "id": 2,
    "address": "0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427",
    "real_estate_name": "대전 창업스페이스",
    "symbol": "MG"
},
]
*/

export default function FormVote( {voteableEstateData }: {voteableEstateData : VoteableEstate[] }) {
  const router = useRouter();
  
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<string>("");

  // const [voteableEstateData, setVoteableEstateData] = useState<VoteableEstate[]>([]);
  // const [getAddressFromNameObj , setGetAddressFromNameObj] = useState<{ [key: string]: string }>({});

  // console.log("voteableEstateData" , voteableEstateData)
  
  
  // useEffect( () => {
  //   fetchData()
  // } , [] )
    
  // const fetchData = async () => {
    // const voteableEstateData = await getVoteableEstateData();
    // console.log("voteableEstateData 🔥🔥🔥" , voteableEstateData)
  //   const nameAddressArr= voteableEstateData.map( (item : VoteableEstate) => {
  //   return [item.real_estate_name, item.address]
  // })
  //   const getAddressFromNameObj = Object.fromEntries(nameAddressArr);
  //   setGetAddressFromNameObj(getAddressFromNameObj)
  // }  
  
  console.log("voteableEstateData_formVote" , voteableEstateData)
  
  const nameAddressArr= voteableEstateData.map( (item : VoteableEstate) => {
  return [item.real_estate_name, item.address]
})
  console.log("nameAddressArr" , nameAddressArr)
  /* 데이터 형식
  [
    [
        "문래 공차",
        "0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427"
    ],
    [
        "대전 창업스페이스",
        "0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427"
    ]
]
  */
 
  const getAddressFromNameObj = Object.fromEntries(nameAddressArr);
  console.log("getAddressFromNameObj" , getAddressFromNameObj)
  /* 데이터 형식
    {
        "문래 공차": "0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427",
        "대전 창업스페이스": "0x2bBF33D5DDAC72Dfe7A42AFda9D4e7d60Ad8a427"
    }
  */
  
  
  const postVoteForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴
    console.log(typeof(startDate))  // number
    const finalStartDate = startDate.toString();  // form 안으로 들어가려면, string 타입 불가피
    const finalEndDate = endDate.toString();

    formData.append("voteStartDate", finalStartDate); // 타임스탬프 추가 | form 데이터로 전송시, toString 필요
    formData.append("voteEndDate", finalEndDate);
    formData.append('caAddress', getAddressFromNameObj[selectedValue].toString());

    for (let [key, value] of formData.entries()) {
      console.log("formData 확인🐣🐣");
      console.log(`${key}: ${value}`);
    }

    const voteTableRes = await postFetchVoteInfoVoteTable(formData)
    // ✅✅ 작업중
    const caTableRes = await postFetchVoteInfoCATable(formData) 

    alert("투표 DB 등록 완료 | 컨트랙트 배포는 아직")

    router.replace(`http://localhost:3000/admin/real_estates`);

    
    
  };

  return (

    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
      <form encType="multipart/form-data" onSubmit={postVoteForm}>
        {/* 여기부터 디자인 👇👇👇 */}

        {/* 사이즈 잡기 */}
        <div className="w-screen h-full rounded-lg ">
          {/* 불투명 레이어 */}
          <div className="flex justify-center w-full h-screen overflow-hidden rounded-lg bg-blend-overlay backdrop-blur-backdrop_test bg-backdrop_test/[.3] shadow-backdrop_test_bg">
            <div className="relative flex justify-center h-[93%] my-8 overflow-x-hidden overflow-y-auto rounded-lg bg-admin_modal_mainBG w-admin_modal modal-custom-scrollbar">
              {/* wrapper */}
              <div className="my-8 w-40rem mx-7 h-37.9rem ">
                <h1 className="text-3xl font-bold tracking-tighter text-center w-40rem text-adminLayout_menubar_name">
                  투표 등록
                </h1>

                {/* 임시 취소 */}
                <Link
                  className="absolute right-1 top-2"
                  href={"/admin/dashboard"}
                >
                  ❎
                </Link>

                {/* 구분선 */}
                <div className="mt-8 h-line bg-admin_modal_line"></div>

                {/* info 안내 문구 */}
                <MessageBoxInfo />

                <div className="">
                  <FormSectionVoteInfo
                    title="투표 상세 등록"
                    desc="발행 매물에 대한 투표 상세 등록"
                    voteTarget = {nameAddressArr}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </div>

                <div className="flex items-center justify-end h-28 ">
                  <BtnCancel />

                  <BtnCreate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
}
