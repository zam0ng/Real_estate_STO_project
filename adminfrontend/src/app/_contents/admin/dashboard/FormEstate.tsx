"use client";

import GetInputData from "@/app/_components/_ui/GetInputData";
import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";
import Link from "next/link";
import { FormEvent, useState } from "react";
// import { postEstateData } from "@/app/_api/_archive/postEstateData.sample";
import { useRouter } from "next/navigation";
import InputFormItem from "./InputFormItem";
import { Console } from "console";
import postFetchEstateForm from "@/app/_api/postFetchEstateForm";
import FormSectionEstateInfo from "./FormSectionEstateInfo";
import FormSectionSubscriptionInfo from "./FormSectionSubscriptionInfo";
// 리팩토링 전 원본 코드 : adminfrontend\src\app\(pages)\test\_archive\FormEstate.test.tsx


export default function FormEstate() {
  const router = useRouter()
  
  const postEstateForm = async (e: FormEvent<HTMLFormElement>) => {
        
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴

    const response = await postFetchEstateForm(formData)

    if(response){
      console.log("제출 성공👏👏" , )
      router.refresh();   // 새로고침기능 -> so, 게시글 등록 후 바로 보임.  
      router.replace(`http://localhost:3000/admin/real_estates`);       

    }

  };


  return (

    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full ">
      

      <form encType="multipart/form-data" onSubmit={postEstateForm} >
        {/* 여기부터 디자인 👇👇👇 */}

        {/* 사이즈 잡기 */}
        <div className="w-screen h-full rounded-lg ">
          {/* <div className="h-full rounded-lg w-150rem h-75rem "> */}

          {/* 불투명 레이어 */}
          <div className="flex justify-center w-full h-screen overflow-hidden rounded-lg bg-blend-overlay backdrop-blur-backdrop_test bg-backdrop_test/[.3] shadow-backdrop_test_bg">
            <div className="relative flex justify-center h-[93%] my-8 overflow-x-hidden overflow-y-auto rounded-lg bg-admin_modal_mainBG w-admin_modal modal-custom-scrollbar">
              
              {/* wrapper */}
              <div className="my-8 w-40rem mx-7 h-37.9rem ">
              
                {/* 제목 : About your page */}
                <h1 className="text-3xl font-bold tracking-tighter text-center w-40rem text-adminLayout_menubar_name">
                  매물 등록
                </h1>

                {/* 임시 취소 */}
                <Link className="absolute right-1 top-2"href={"/admin/dashboard"} > ❎ </Link>

                {/* 구분선 */}
                <div className="mt-8 h-line bg-admin_modal_line"></div>

                {/* info 안내 문구 */}
                <MessageBoxInfo />

                <div className="">
              
                  <FormSectionEstateInfo  title="건물정보" desc="어떤 건물이 STO 토큰으로 발행되는지에 대한 정보 제공" />
            
                  <FormSectionSubscriptionInfo  title="발행 정보" desc="어떤 건물이 STO 토큰으로 발행되는지에 대한 정보 제공" />

            </div>

                {/* 작성완료 및 취소 버튼 */}
                <div className="flex items-center justify-end h-28 ">
                  <BtnCancel />
                  
                  <BtnCreate  /> 
                
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
