"use client";

import GetInputData from "@/app/_components/_ui/GetInputData";
import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { postEstateData } from "@/app/_api/postEstateData.sample";
import { useRouter } from "next/navigation";

import InputFormItem from "./InputFormItem";
import { Console } from "console";

export default function FormEstate() {
  const router = useRouter()

  // const [isSubmitting, setIsSubmitting] = useState(false);
  
  const postEstateForm = async (e: FormEvent<HTMLFormElement>) => {
    
    // setIsSubmitting(true)
    
    e.preventDefault();


    const formData = new FormData(e.currentTarget); // e.currentTarget = form 태그 | FormData 객체 : form 태그의 '모든 자식 input 태그' 갖고 있는 데이터를 가져옴
    console.log("전송되는 formData 확인", formData);

        // FormData 객체의 내용을 콘솔에 출력
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);

          if(value instanceof File) {
            console.log(`${key}: 파일 이름 = ${value.name}, 파일 크기 = ${value.size}, 파일 타입 = ${value.type}`);
          } else {
            console.log(`${key}: ${value}`);
          }
        }

    // 이거 fetch 종류니까 따로 빼기 ✅
    const response = await fetch(
      "http://localhost:8080/admin/subscription_submit",
      {
        method: "POST",
        body: formData,
      }
    );

    console.log("response" , response)
      
    
    if (response.status !== 201) {
      throw new Error(
        "Failed to fetch data : 매물 등록 후 서버에서 fetch 받기 Error"
        );
      
    } else {
      
      const result = await response.json();
      console.log("제출 성공👏👏" , result)


      // router.refresh();
      // router.replace(`http://localhost:3000/admin/real_estates`); // 기존 코드
      // router.replace(`http://localhost:3000/admin/real_estates/[${response.id}]`); // 이렇게 되어야 함 
      router.replace(`http://localhost:3000/admin/real_estates/[${result.id}]`); 
      
      
      
      // 방금 쓴 글을 확인하기 위한 리디렉션
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
              
              <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
                건물 정보
              </h1>
              
                <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
                    <p className="" >건물 정보 : 0000000000000000000  </p>
                </div>

                {/* 제목 */}
                <h2 className="mt-2 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
                  건물 이미지
                </h2>
                
                {/* Input 컴포넌트 */}
                <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
                  <input type="file" name="upload" placeholder= "ex) img"  multiple />
                </div>

                {/* 건물 정보 */}
                <InputFormItem _title={"공모자산 이름"} _type={"text"} _name = {"name"}  _placeholder={"문래공차"} />
                <InputFormItem _title={"공모자산 주소"} _type={"text"} _name = {"address"}  _placeholder={"서울 영등포구 선유로 76"} />
                <InputFormItem _title={"층수"} _type={"text"} _name = {"floors"}  _placeholder={"7층"} />
                <InputFormItem _title={"용도 지역"} _type={"text"} _name = {"purpose"}  _placeholder={"준공업지역"} />
                <InputFormItem _title={"주용도"} _type={"text"} _name = {"mainpurpose"}  _placeholder={"근린생활시설"} />
                <InputFormItem _title={"대지면적"} _type={"number"} _name = {"area"}  _placeholder={"333.2"} _step='0.1' />
                <InputFormItem _title={"연면적"} _type={"number"} _name = {"all_area"}  _placeholder={"999.5"} _step='0.1'/>
                <InputFormItem _title={"건폐율"} _type={"number"} _name = {"build_area"}  _placeholder={"70.1"} _step='0.1'/>
                <InputFormItem _title={"용적률"} _type={"number"} _name = {"floor_area"}  _placeholder={"265.1"} _step='0.1'/>
                <InputFormItem _title={"준공일"} _type={"text"} _name = {"completion"}  _placeholder={"2005-07-26"} />



              <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
                발행 정보
              </h1>
              
              {/* 설명 */}
                <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
                    <p className="" >발행정보 : 00000000000000000000000  </p>
                </div>
              
                {/* 발행 정보 */}
                <InputFormItem _title={"증권 종류"} _type={"text"} _name = {"stock_type"}  _placeholder={"수익증권"} />
                <InputFormItem _title={"발행인"} _type={"text"} _name = {"publisher"}  _placeholder={"한국투자부동산신탁"} />
                {/* 최초 청약 이기 때문에 default 가 0 👇👇  */}
                <InputFormItem _title={"모집된 청약 수"} _type={"number"} _name = {"order_amount"}  _placeholder={"0"} />
                <InputFormItem _title={"주당 공모 금액"} _type={"number"} _name = {"offering_price"}  _placeholder={"5000원"} />
                <InputFormItem _title={"총 공모금액"} _type={"number"} _name = {"totalprice"}  _placeholder={"2,500,000,000원"} />
                <InputFormItem _title={"총 발행량"} _type={"number"} _name = {"totalsupply"}  _placeholder={"500,000주"} />
                <InputFormItem _title={"청약 시작일"} _type={"text"} _name = {"start_date"}  _placeholder={"2023-11-01"} />
                <InputFormItem _title={"청약 종료일"} _type={"text"} _name = {"end_date"}  _placeholder={"2023-11-11"} />
                {/* 청약 입고일 = 청약 했을 때 배당 받는날 👇👇*/}
                <InputFormItem _title={"청약 입고일"} _type={"text"} _name = {"building_date"}  _placeholder={"2023-11-13"} />
                <InputFormItem _title={"매물 설명"} _type={"text"} _name = {"description"}  _placeholder={"매출의 15% 이상 월 배당"} />

                <InputFormItem _title={"청약 발표일"} _type={"text"} _name = {"result_date"}  _placeholder={"2023-11-12"} />
                <InputFormItem _title={"거래 시작일"} _type={"text"} _name = {"trading_start_date"}  _placeholder={"2023-11-13"} />

                {/* status 는 매물 등록 시점에 기본 'pending' 으로 입력  */}
                <InputFormItem _title={"청약 상태"} _type={"text"} _name = {"status"}  _placeholder={"pending"} />
                
                
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
