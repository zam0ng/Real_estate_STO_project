import CardSmallNum from "@/app/_components/_ui/CardSmallNum";
import BlacklistUser from "@/app/_contents/admin/dashboard/BlacklistUser";
import ActionBtn from "@/app/_contents/admin/dashboard/ActionBtn";

import { CreateEstateBtn, CreateNoticeBtn, CreateVoteBtn } from "../main";
import LineChartLarge from "./LineChartLarge";

import CardSmallGraphRight from "@/app/_components/_ui/CardSmallGraphRight";
import CardSmallGraphLeft from "@/app/_components/_ui/CardSmallGraphLeft";
import TransactionItem from "./TransactionItem";
import BlackList from "./BlackList";
import Transaction from "./Transaction";
import ProgressBarAdmin from "./ProgressBarAdmin";
import EstateCarousel from "./EstateCarousel";
import PublicOfferingStatus from "./PublicOfferingStatus";
import LargeLineChart from "./LargeLineChart";
import CriteriaToggle from "./CriteriaToggle";
import { SearchParamsProps } from "@/app/_features/admin/dashboard";
import { CreateDividendsBtn } from "../main/CreateDividendsBtn";
import getVoteableEstateData from "@/app/api/getVoteableEstateData";
import Link from "next/link";


export default async function DashboardView({searchParams} : SearchParamsProps) {
  

  return (
    <div className="flex items-center justify-center ">
      
      <div className="flex flex-col w-full h-full ">
        {/* 상단 제목 
            [참고] 사용자 페이지 제목 수치 : text-2xl font-semibold */}
        <div className=" items-center h-14 mt-2 text-1.75rem font-bold tracking-tight text-adminLayout_menubar_name flex ">
          <h1 className="ml-1 text-3xl tracking-tight "> Dashboard </h1>
        </div>

        {/* 중간 부분 */}
        {/* <div className="flex flex-row h-45.625rem bg-stone-100 justify-evenly"> */}
        <div className="flex flex-row bg-admin_content_bg justify-evenly h-[80vh]      ">

          {/* 왼쪽 영역 */}
          {/* <div className="flex flex-col h-full justify-evenly"> */}
          <div className="flex flex-col justify-between h-full">
        
          
            {/* 매물 현황 card */}            
            <EstateCarousel />


            {/* 공모현황 card */}
            <div className="relative z-20 flex flex-col justify-between h-14 w-30rem bg-slate-50 ">
              <PublicOfferingStatus />
            </div>

            {/* 공모현황 card */}
            {/* <div className="relative z-20 flex flex-col justify-between h-14 w-30rem bg-slate-50 ">
              <PublicOfferingStatus />
            </div> */}


            {/* small card */}
            <div className="flex justify-between w-30rem ">
              {/* 유저 card */}
              <CardSmallGraphLeft />

              {/* 총 거래금액 card */}
              <CardSmallGraphRight />
            </div>

            {/* Latest transaction */}
            <Transaction />
            

          </div>

          {/* 오른쪽 영역 */}
          {/* <div className="flex flex-col h-full justify-evenly"> */}
          <div className="flex flex-col justify-between h-full">
            {/* 그래프, 일별, 주별, 월별 통계 */}
            <div className="flex flex-col w-30rem ">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Market Statistics</h3>
                <p className="flex items-center text-sm font-normal text-dashboard_card_transaction_view">
                  <CriteriaToggle/>
                </p>
              </div>

              {/* <div className="flex items-center justify-center bg-neutral-300 w-30rem h-15rem"> */}
              <div className="flex items-center justify-center h-72 w-30rem">
                <LargeLineChart  searchParams={searchParams}  />
              </div>
            </div>

            {/* 공모현황 card */}
            {/* <div className="relative z-20 flex flex-col justify-between h-14 w-30rem bg-slate-50 ">
              <PublicOfferingStatus />
            </div> */}

            {/* 블랙 리스트 유저 */}
            <Link 
                href={"/admin/users"}
                className="flex flex-col justify-around w-30rem h-36">
              
              <div className="flex items-center justify-between border-b-2" >
                  <h3 className="mb-4 text-xl font-bold" >Blacklist Users</h3>
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18L15 12L9 6" stroke="#848484" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                  </div>
              </div>
                
              {/* 구분선 */}
              {/* <div className="w-full border-b-2 border-borderLine " /> */}



              {/* 유저 사진 */}
              <div>
                <BlackList />
              </div>
              
            </Link>


            {/* 등록 버튼 */}
            <div className="flex flex-col justify-between mb-8 h-36">
              <h3 className="text-xl font-bold">등록 버튼</h3>

              <div className="flex flex-col justify-end h-52 w-30rem ">
                
                {/* 첫 줄 */}
                  <div className="flex justify-between ">
                    <CreateEstateBtn   />
                    
                    <CreateVoteBtn />
                    
                    <CreateNoticeBtn />

                    <CreateDividendsBtn />
                    
                  </div>
                
                {/* 두 번째 줄 */}
                  <div className="flex justify-between ">
                    {/* <CreateEstateBtn />
                    <CreateEstateBtn />
                    <CreateEstateBtn /> */}
                  </div>
              
              </div>


              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
