"use client";

import FormItem from "@/app/_components/_ui/FormItem";
import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";


import Link from "next/link";
// import FormEstate from "./FormEstate";


import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";



export default function FormEstate() {
  const router = useRouter();

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleUploadFile = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    console.log("input.files", input.files);

    if (input.files) {
      console.log("input.files[0]", input.files[0]);
      setUploadFile(input.files[0]);
    }
  };
  

  const handleCreateEstate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.target as HTMLFormElement;

    if (uploadFile) {
      formData.append("img", uploadFile);
      console.log("uploadFile 이 formData 에 들어갔는지 보기" , uploadFile)
    }

    const keyList = [
      "address",
      "totalprice",
      "description",
      "start_date",
      "end_date",
      "result_date",
      "building_date",
      "trading_start_date",
      "order_amount",
      "offering_price",
      "status",
      "floors",
      "purpose",
      "area",
      "all_area",
      "build_area",
      "floor_area",
      "completion",
      "stock_type",
      "stock_type",
      "publisher",
    ];

    keyList.forEach((item) => {
      const value = form[item].value; // ex) form.address.value 인데, 배열에서 꺼내기 때문에 form[item].value

      formData.append(`${item}`, value);
      console.log("item : value" , item, value)
    });










  await fetch(process.env.NEXT_PUBLIC_API_URL + "admin/subscription_submit", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("result", result);

      router.refresh();
      router.replace(`http://localhost:3000/admin/main`); // 방금 쓴 글을 확인하기 위한 리디렉션
    });
};



  
  return (
    <>
      {/* 여기에 이제 입힐 것  */}
      
      <form encType="multipart/form-data" onSubmit={handleCreateEstate}>

      <p>
          <label> img </label>
          <input
            type="file"
            name="img"
            placeholder="ex) img"
            onChange={handleUploadFile}
          />
        </p>

      <p>
          <input type="submit" value="건물 정보 등록" />
      </p>
      </form>


      
      
      {/* 여기부터 디자인 👇👇👇 */}
      {/* [🔥기존코드]  <div className="absolute top-0 left-0 flex justify-center w-screen h-screen overflow-hidden backdrop-blur-3xl bg-admin_modal_bg"> */}
      <div className="absolute top-0 left-0 flex justify-center w-screen h-screen overflow-hidden backdrop-blur-3xl">


        [🔥기존코드] <div className="relative  flex justify-center my-8 bg-admin_modal_mainBG rounded-lg  w-admin_modal h-71.5rem overflow-y-auto  overflow-x-hidden modal-custom-scrollbar">
        {/* <div className="relative flex justify-center my-8  rounded-lg  w-admin_modal h-71.5rem overflow-y-auto backdrop-blur-md border-2 overflow-x-hidden modal-custom-scrollbar"> */}
          {/* wrapper */}
          <div className="my-8 w-40rem mx-7 h-37.9rem ">

            {/* 제목 : About your page */}
            <h1 className="text-3xl font-bold tracking-tighter text-center w-40rem text-adminLayout_menubar_name">
              About your page
            </h1>


            {/* 임시 취소 */}
            <Link className="absolute right-1 top-2" href={"/admin/dashboard"} > ❎ </Link> 

            {/* 구분선 */}
            <div className="mt-8 h-line bg-admin_modal_line"></div>

            {/* info 안내 문구 */}
            <MessageBoxInfo />


            <FormItem/>
            <FormItem/>
            <FormItem/>
            <FormItem/>
            <FormItem/>
            <FormItem/>
            <FormItem/>
            

          {/* 작성완료 및 취소 버튼 */}
          <div className="flex items-center justify-end h-28 " >

            <BtnCancel/>

            <BtnCreate />
                        
          </div>
          



            <div></div>
          </div>
        </div>
      </div>


    </>
  );
}
