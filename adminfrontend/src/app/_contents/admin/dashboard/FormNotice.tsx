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

interface NoticableEstate {
  id: number;
  address: string;
  real_estate_name: string;
  cy_type: string;
  symbol: string;
}


export default function FormNotice({voteableEstateData}: {voteableEstateData: string[];
}) {

  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState<string>("");


  const postNoticeForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // e.stopPropagation()

    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴

    for (let [key, value] of formData.entries()) {
      // console.log("formData 확인🐣🐣");
      // console.log(`${key}: ${value}`);
    }

    const response = await postFetchNoticeForm(formData);
    
    if (response == 'Created') {
      router.refresh(); // 새로고침기능


      const path = `/admin/notices`;
      const domain = process.env.NEXT_PUBLIC_LOCAL_CLIENT || process.env.NEXT_PUBLIC_PRODDUCTION_CLIENT;
      const url = `${domain}${path}`
      router.replace(`${url}`);
      
    }

  };

  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
      <form encType="multipart/form-data" onSubmit={postNoticeForm}>
        {/* 여기부터 디자인 👇👇👇 */}

        {/* 사이즈 잡기 */}
        <div className="w-screen h-full rounded-lg ">
          {/* 불투명 레이어 */}
          <div className="flex justify-center w-full h-screen overflow-hidden rounded-lg bg-blend-overlay backdrop-blur-backdrop_test bg-backdrop_test/[.3] shadow-backdrop_test_bg">
            <div className="relative flex justify-center h-[93%] my-8 overflow-x-hidden overflow-y-auto rounded-lg bg-admin_modal_mainBG w-admin_modal modal-custom-scrollbar">
              {/* wrapper */}
              <div className="my-8 w-40rem mx-7 h-37.9rem ">
                <h1 className="text-3xl font-bold tracking-tighter text-center w-40rem text-adminLayout_menubar_name">
                  공지 등록
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
                  
                  <FormSectionNoticeInfo_
                    title="공시/공지 상세 등록"
                    desc="상세 내용 등록"

                    voteTarget={voteableEstateData}
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
