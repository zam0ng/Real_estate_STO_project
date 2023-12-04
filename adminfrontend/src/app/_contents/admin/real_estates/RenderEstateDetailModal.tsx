"use client";

import GetInputData from "@/app/_components/_ui/GetInputData";
import BtnCancel from "@/app/_components/_ui/BtnCancel";
import BtnCreate from "@/app/_components/_ui/BtnCreate";
import MessageBoxInfo from "@/app/_components/_ui/MessageBoxInfo";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
// import { postEstateData } from "@/app/api/_archive/postEstateData.sample";
import { useRouter } from "next/navigation";
import InputFormItem from "../dashboard/InputFormItem";
import { Console } from "console";
import postFetchEstateForm from "@/app/api/postFetchEstateForm";
import RenderEstateInfo from "./RenderEstateInfo";

import RenderSubscriptionInfo from "./RenderSubscriptionInfo";

import { ReadProps } from "@/app/_features/admin/real_estates";
import getEstateDetail from "@/app/api/getEstateDetail";

import { useParams } from "next/navigation";
import { getEstateDetailProps } from "@/app/_features/admin/real_estates";

import { RenderEstateDetailModalProps } from "@/app/_features/admin/real_estates";
import { EstateDetailData } from "@/app/_features/admin/real_estates";
import { DetailData } from "@/app/_features/admin/real_estates";

// 리팩토링 전 원본 코드 : adminfrontend\src\app\(pages)\test\_archive\RenderEstateDetailModal.test.tsx

export default function RenderEstateDetailModal() {
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  // console.log("detailData" , detailData)

  const router = useRouter();
  const params = useParams();
  const id = params.id;
  // console.log("id🔵🔵", id);
  // console.log("typeof(id)", typeof id);
  // console.log("params.id🔥", params.id);

  useEffect(() => {
    getEstateDetail({ id })
      .then((data) => setDetailData(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    // <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full /absolute ">
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-50">
      {/* <form encType="multipart/form-data" onSubmit={postEstateForm} > */}
      <div>
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
                  {detailData ? detailData.subscription_name : "loading"} 상세
                  정보
                </h1>

                {/* 임시 취소 */}
                <Link
                  className="absolute right-1 top-2"
                  href={"/admin/real_estates"}
                >
                  ❎
                </Link>

                {/* 구분선 */}
                <div className="mt-8 h-line bg-admin_modal_line"></div>

                {/* info 안내 문구 */}
                <MessageBoxInfo />

                <div className="">
                  <RenderEstateInfo
                    title="건물정보"
                    desc="어떤 건물이 STO 토큰으로 발행되는지에 대한 정보 제공"
                    image={detailData && detailData.subscription_img_1}
                    name={detailData && detailData.subscription_name}
                    subscription_address={
                      detailData && detailData.subscription_address
                    }
                    floors={detailData && detailData.floors}
                    purpose={detailData && detailData.purpose}
                    main_purpose={detailData && detailData.main_purpose}
                    area={detailData && detailData.area}
                    all_area={detailData && detailData.all_area}
                    build_area={detailData && detailData.build_area}
                    floor_area={detailData && detailData.floor_area}
                    completion={detailData && detailData.completion}
                  />

                  <RenderSubscriptionInfo
                    title="발행 정보"
                    desc="어떤 건물이 STO 토큰으로 발행되는지에 대한 정보 제공"
                    totalprice={
                      detailData && detailData.subscription_totalprice
                    }
                    totalsupply={
                      detailData && detailData.subscription_totalsupply
                    }
                    description={
                      detailData && detailData.subscription_description
                    }
                    start_date={
                      detailData && detailData.subscription_start_date
                    }
                    end_date={detailData && detailData.subscription_end_date}
                    result_date={
                      detailData && detailData.subscription_result_date
                    }
                    building_date={
                      detailData && detailData.subscription_building_date
                    }
                    trading_start_date={
                      detailData && detailData.subscription_trading_start_date
                    }
                    order_amount={
                      detailData && detailData.subscription_order_amount
                    }
                    offering_price={
                      detailData && detailData.subscription_offering_price
                    }
                    status={detailData && detailData.subscription_status}
                    stock_type={detailData && detailData.stock_type}
                    publisher={detailData && detailData.publisher}
                  />
                </div>

                {/* 밑에 부분 여백 */}
                <div className="flex items-center justify-end h-12 ">
                  {/* <BtnCancel />

                  <BtnCreate /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
