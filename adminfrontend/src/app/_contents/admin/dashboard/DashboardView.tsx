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


export default async function DashboardView({searchParams} : SearchParamsProps) {


  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full h-full ">
        {/* 상단 제목 
            [참고] 사용자 페이지 제목 수치 : text-2xl font-semibold */}
        <div className=" items-center h-8 text-1.75rem font-bold tracking-tight text-adminLayout_menubar_name flex ">
          <h1 className="ml-10 tracking-tight"> Dashboard </h1>
        </div>

        {/* 중간 부분 */}
        {/* <div className="flex flex-row h-45.625rem bg-stone-100 justify-evenly"> */}
        <div className="flex flex-row bg-stone-100 justify-evenly h-[78vh]">

          {/* 왼쪽 영역 */}
          <div className="flex flex-col h-full justify-evenly">
          
          
          
            {/* 매물 현황 card */}
            
            <EstateCarousel />

            {/* <div className="flex flex-col items-center justify-center rounded-xl bg-stone-200 w-30rem"> */}
              {/* 상단 제목 */}
              {/* <div className="flex flex-col w-full ml-24">
                <h3 className="text-lg font-semibold ">매물현황</h3>
                <p className="text-sm ">금일 10:00 기준</p>
              </div> */}

              {/* 아래 사진 */}
              {/* <div className="flex flex-col justify-end bg-center bg-no-repeat bg-cover w-96 h-52 bg-slate-300 bg-pattern_2 ">
                <p className="text-sm">매출의 월 15% 이상 배당 </p>

                <h3 className="text-lg font-semibold tracking-tight">
                  {" "}
                  수원 행궁 뉴스 뮤지엄{" "}
                </h3>

                <p className="text-sm"> 최근 7일 거래횟수 : 1000</p>
                <p className="text-sm"> 토큰 가격 : 5000</p>
                <p className="text-sm"> 누적 수익률 : 120%</p>
              </div>
            </div> */}



            {/* 공모현황 card */}
            <div className="relative z-20 flex flex-col justify-between h-14 w-30rem bg-slate-50 ">
              
              <PublicOfferingStatus />
            </div>




            {/* small card */}
            <div className="flex justify-between w-30rem ">
              {/* 유저 card */}
              <CardSmallGraphLeft />

              {/* 총 거래금액 card */}
              <CardSmallGraphRight />
            </div>

            {/* Latest transaction */}
            <Transaction />
                {/* <div className="flex flex-col justify-around w-30rem h-60"> */}
                  {/* 제목 */}
                  {/* <div className="flex justify-between w-30rem ">
                    <h3 className="text-xl font-bold">Latest transaction</h3>
                    <p className="flex items-center text-sm font-normal text-dashboard_card_transaction_view">
                      View all
                    </p>
                  </div> */}

                  {/* item */}
                  {/* <TransactionItem  imageURL={} />
                  <TransactionItem imageURL={} />
                  <TransactionItem imageURL={} /> */}

                {/* </div> */}

          </div>

          {/* 오른쪽 영역 */}
          <div className="flex flex-col h-full justify-evenly">
            {/* 그래프, 일별, 주별, 월별 통계 */}
            <div className="flex flex-col w-30rem ">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Market Statistics</h3>
                <p className="flex items-center text-sm font-normal text-dashboard_card_transaction_view">
                  <CriteriaToggle/>
                </p>
              </div>

              <div className="flex items-center justify-center bg-neutral-300 w-30rem h-15rem">
                <LargeLineChart  searchParams={searchParams}  />
              </div>
            </div>

            {/* 블랙 리스트 유저 */}
            <div className="flex flex-col justify-around w-30rem h-36 ">
              <h3 className="text-xl font-bold">Blacklist Users</h3>

              {/* 구분선 */}
              <div className="w-full border-2 border-borderLine " />

              {/* 유저 사진 */}
              <div>
                <BlackList />
              </div>
              
            </div>


            {/* 등록 버튼 */}
            <div className="">
              <h3 className="text-xl font-bold">등록 버튼</h3>

              <div className="flex flex-col h-52 w-30rem justify-evenly ">
                
                {/* 첫 줄 */}
                  <div className="flex justify-evenly ">
                    <CreateEstateBtn />
                    
                    <CreateVoteBtn />
                    
                    <CreateNoticeBtn />

                    <CreateDividendsBtn />
                    
                  </div>
                
                {/* 두 번째 줄 */}
                  <div className="flex justify-evenly ">
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
