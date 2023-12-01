"use client";

import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FormSectionVoteInfo from "./FormSectionVoteInfo";
import getVoteableEstateData from "@/app/api/getVoteableEstateData";

interface VoteableEstate {
  id: number;
  address: string;
  real_estate_name: string;
  cy_type: string;
  symbol: string;
}

// // ✅ 임시 데이터 받기
// const voteableEstateData = [
//   {
//     id : 1,
//     address : '0x112123123',
//     real_estate_name : '문래 공차',
//     cy_type : 'token',
//     symbol : 'MR'
//   },
//   {
//     id : 2,
//     address : '0x112123',
//     real_estate_name : '대전 뮤지엄',
//     cy_type : 'token' ,
//     symbol : 'MG'
//   },
// ]

export default function FormVote() {
  const router = useRouter();
  
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");

  //  우선 임시로 꺼둠 ✅
  // const voteableEstateData = await getVoteableEstateData()

  
  // ✅ 임시 데이터 받기
const voteableEstateData = [
  {
    id : 1,
    address : '0x112123123',
    real_estate_name : '문래 공차',
    cy_type : 'token',
    symbol : 'MR'
  },
  {
    id : 2,
    address : '0x112123',
    real_estate_name : '대전 뮤지엄',
    cy_type : 'token' ,
    symbol : 'MG'
  },
]


  const nameAddressArr= voteableEstateData.map( (item : VoteableEstate) => {
      return [item.real_estate_name, item.address]
  })
  const getAddressFromNameObj = Object.fromEntries(nameAddressArr);

  const postVoteForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // e.stopPropagation()

    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴
    const finalStartDate = startDate.toString();
    const finalEndDate = endDate.toString();

    formData.append("voteStartDate", finalStartDate); // 타임스탬프 추가 | form 데이터로 전송시, toString 필요
    formData.append("voteEndDate", finalEndDate);
    formData.append('caAddress', getAddressFromNameObj[selectedValue].toString());

    for (let [key, value] of formData.entries()) {
      console.log("formData 확인🐣🐣");
      console.log(`${key}: ${value}`);
    }
    router.refresh(); // 새로고침기능 -> so, 게시글 등록 후 바로 보임.
    router.replace(`http://localhost:3000/admin/dashboard`);

    // POST 요청시
    // const response = await postFetchEstateForm(formData);
    // if (response) {
    //   console.log("제출 성공👏👏");
    //   router.refresh(); // 새로고침기능 -> so, 게시글 등록 후 바로 보임.
    //   router.replace(`http://localhost:3000/admin/real_estates`);
    // }
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
