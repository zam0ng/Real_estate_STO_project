"use client";

import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FormSectionVoteInfo from "./FormSectionVoteInfo";
import getVoteableEstateData from "@/app/api/getVoteableEstateData";
import FormSectionNoticeInfo from "./FormSectionVoteInfo";
import postFetchEstateForm from "@/app/api/postFetchEstateForm";
import postFetchNoticeForm from "@/app/api/postFetchNoticeForm";
import FormSectionNoticeInfo_ from "./FormSectionNoticeInfo_";
import FormSectionDividendsInfo from "./FormSectionDividendsInfo";
import postFetchDividendsForm from "@/app/api/postFetchDividendsForm";

// interface NoticableEstate {
//   id: number;
//   address: string;
//   real_estate_name: string;
//   cy_type: string;
//   symbol: string;
// }

// ✅ 임시 데이터 받기
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

/* api 상 데이터 예시
  {
      category : "공지사항",
      title : "대체공휴일 지정에 따른 휴장 안내",
      content : "안녕하세요. 카사입니다.\n 
                      정부의 대체공휴일 지정에 따라 아래와 같이 휴장을 안내드립니다.\n
                        -휴장일 : 2023년 10월 02일(월)",
      real_estate_name : "문래 공차"
  }
  */

  
export default function FormDividends() {
  const router = useRouter();
  // const [startDate, setStartDate] = useState(0)
  // const [endDate, setEndDate] = useState(0)

  // const noticableEstateData = await getVoteableEstateData()

  // const nameAddressArr= voteableEstateData.map( (item : VoteableEstate) => {
  //     return [item.real_estate_name, item.address]
  // })
  // const getAddressFromNameObj = Object.fromEntries(nameAddressArr);

  const postDividendsForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // e.stopPropagation()

    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴
    // const finalStartDate= startDate.toString()
    // const finalEndDate= endDate.toString()

    // formData.append("notice_writer ", "admin");

    // formData.append('caAddress', getAddressFromNameObj[selectedValue].toString());

    for (let [key, value] of formData.entries()) {
      // console.log("formData 확인🐣🐣");
      // console.log(`${key}: ${value}`);
    }

    // POST 요청시
    const response = await postFetchDividendsForm(formData);
    console.log("response" , response) // Created
    
    if (response == 'Created') {
      router.refresh(); // 새로고침기능
      // const asd=process.env.NODE_ENV ⭐⭐⭐⭐⭐
      router.replace('http://localhost:3000/admin/dashboard');
    }
  };


  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
      <form encType="multipart/form-data" onSubmit={postDividendsForm}>

        {/* 사이즈 잡기 */}
        <div className="w-screen h-full rounded-lg ">
          {/* 불투명 레이어 */}
          <div className="flex justify-center w-full h-screen overflow-hidden rounded-lg bg-blend-overlay backdrop-blur-backdrop_test bg-backdrop_test/[.3] shadow-backdrop_test_bg">
            <div className="relative flex justify-center h-[93%] my-8 overflow-x-hidden overflow-y-auto rounded-lg bg-admin_modal_mainBG w-admin_modal modal-custom-scrollbar">
              {/* wrapper */}
              <div className="my-8 w-40rem mx-7 h-37.9rem ">
                <h1 className="text-3xl font-bold tracking-tighter text-center w-40rem text-adminLayout_menubar_name">
                  배당금 등록
                </h1>

                {/* 임시 취소 */}
                <Link
                  className="absolute right-1 top-2"
                  href={"/admin/dashboard"}
                > ❎
                </Link>

                {/* 구분선 */}
                <div className="mt-8 h-line bg-admin_modal_line"></div>

                {/* info 안내 문구 */}
                <MessageBoxInfo />

                <div className="">
                  
                  <FormSectionDividendsInfo
                    title="배당금 등록"
                    desc="상세 내용 등록"
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
