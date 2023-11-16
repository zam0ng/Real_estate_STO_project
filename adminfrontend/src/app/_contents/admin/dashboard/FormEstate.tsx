"use client";

import GetInputData from "@/app/_components/_ui/GetInputData";
import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { postEstateData } from "@/app/_api/postEstateData.sample";
import { useRouter } from "next/navigation";



export default function FormEstate() {
  const router = useRouter()

  const postEstateForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴
    console.log("전송되는 formData 확인", formData);


    // 이거 fetch 종류니까 따로 빼기 ✅
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "admin/subscription_submit",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.status !== 201) {
      console.log("매물 등록 후 서버에서 fetch 받기 Error 📛📛")
      throw new Error(
        "Failed to fetch data : 매물 등록 후 서버에서 fetch 받기 Error"
        );
      
    } else {
      router.refresh();
      router.replace(`http://localhost:3000/admin/real_estates`); // 방금 쓴 글을 확인하기 위한 리디렉션
    }
  
  };

  
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full ">
      <form encType="multipart/form-data" onSubmit={postEstateForm}>
        {/* 여기부터 디자인 👇👇👇 */}

        {/* 사이즈 잡기 */}
        <div className="w-full h-full rounded-lg ">
          {/* <div className="h-full rounded-lg w-150rem h-75rem "> */}

          {/* 불투명 레이어 */}
          <div className="flex justify-center w-full h-full overflow-hidden rounded-lg bg-blend-overlay backdrop-blur-backdrop_test bg-backdrop_test/[.3] shadow-backdrop_test_bg">
            <div className="relative  flex justify-center my-8 bg-admin_modal_mainBG rounded-lg  w-admin_modal h-71.5rem overflow-y-auto  overflow-x-hidden modal-custom-scrollbar">
              
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

                {/* input 태그에서 정보 가져오기 */}
                <GetInputData />

                {/* 작성완료 및 취소 버튼 */}
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
