import InfoIcon from "@/app/_components/_ui/InfoIcon";

import TableTitle from "@/app/_contents/admin/real_estates/TableTitle";

import CardSmallGraph from "@/app/_components/_ui/CardSmallGraph";
import CardSmallNum from "@/app/_components/_ui/CardSmallNum";
import BorderLine from "@/app/_components/_ui/BorderLineSample";
import BlacklistUser from "@/app/_contents/admin/dashboard/BlacklistUser";

import DashboardActionIcon from "@/app/_contents/admin/dashboard/DashboardActionIcon";
import ActionBtn from "@/app/_contents/admin/dashboard/ActionBtn";


export default function Test() {
  return (
    <div className="flex items-center justify-center">
    <div className="flex flex-col bg-gray-50 w-116rem">
      
          {/* 상단 제목 */}
          <div className=" items-center  h-32 text-1.75rem font-bold tracking-tight text-adminLayout_menubar_name flex ">
            <h1 className="ml-10 tracking-tight"> Dashboard </h1>
          </div>

          {/* 중간 부분 */}
          <div className="flex flex-row bg-gray-100 justify-evenly">
            
            {/* 왼쪽 영역 */}
            <div className="flex flex-col justify-evenly h-60rem" >
                
                {/* 매물 현황 card */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-stone-200 w-30rem h-80">
                  
                  {/* 상단 제목 */}
                  <div className="flex flex-col w-full ml-24">
                    <h3 className="text-lg font-semibold " >매물현황</h3>
                    <p className="text-sm " >금일 10:00 기준</p>
                  </div>
                  
                  {/* 아래 사진 */}
                  <div className="flex flex-col justify-end bg-center bg-no-repeat bg-cover w-96 h-52 bg-slate-300 bg-pattern_2 ">

                        <p>매출의 월 15% 이상 배당 </p>
                        
                        <h3 className="text-lg font-semibold tracking-tight" > 수원 행궁 뉴스 뮤지엄 </h3>
                  
                        <p> 최근 7일 거래횟수 : 1000</p>
                        <p> 토큰 가격 : 5000</p>
                        <p> 누적 수익률 : 120%</p>

                      

                  </div>

                </div>

                
                {/* 공모현황 card */}
                <div className="flex flex-col justify-between h-16 w-30rem bg-slate-50 " >
                
                    {/* 금액현황 */}
                    <div className="flex justify-between w-full ">
                      <h3 className="text-lg font-semibold" >문래공차 공모 금액 현황</h3>
                      <div className="text-xl font-semibold"> $1200/3400 </div>
                    </div>
                    
                    {/* 그래프 바 */}
                    <div className="h-2 bg-blue-500 x-full rounded-2xl">   </div>

                </div>


                {/* small card */}
                <div className="flex justify-between w-30rem ">
                  
                  {/* 유저 card */}
                  <CardSmallGraph />

                  {/* 총 거래금액 card */}
                  <CardSmallGraph />
                  
                </div>
                
                
                {/* Latest transaction */}
                <div className="flex flex-col justify-around w-30rem h-60">

                  {/* 제목 */}
                  <div className="flex justify-between w-30rem ">
                    <h3 className="text-xl font-bold" >Latest transaction</h3>
                    <p className="text-lg font-medium text-dashboard_card_transaction_view" >View all</p>
                  </div>

                  {/* item */}
                  <CardSmallNum />
                  <CardSmallNum />
                  <CardSmallNum />

                </div>

            </div>

            {/* 오른쪽 영역 */}
            <div className="flex flex-col justify-evenly h-60rem">

              {/* 그래프, 일별, 주별, 월별 통계 */}
              <div className="flex flex-col w-30rem bg-sky-50">
                
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold" >Market Statistics</h3>
                  <p className="text-lg font-medium text-dashboard_card_transaction_view" >Week</p>
                </div>
                
                <div className="flex items-center justify-center bg-neutral-300 w-30rem h-15rem">
                    <div className="flex items-center justify-center w-11/12 bg-green-300 h-5/6 ">
                        <p> 통계그림 </p>
                    </div>
                </div>
                
              </div>



              {/* 블랙 리스트 유저 */}
              <div className="flex flex-col justify-around w-30rem h-36 ">
                
                <h3 className="text-xl font-bold">Blacklist Users</h3>
                
                <div className="w-full border-2 border-borderLine " />  
                
                {/* 유저 사진 */}
                <div className="flex justify-between x-full ">
                  <BlacklistUser />
                  <BlacklistUser />
                  <BlacklistUser />
                  <BlacklistUser />
                  <BlacklistUser />
                </div>


                
              </div>

              {/* 등록 버튼 */}
              <div>
                <h3 className="text-xl font-bold" >등록 버튼</h3>

                <div className="flex flex-col h-60 w-30rem justify-evenly ">
                    
                    <div className="flex justify-evenly ">
                      <ActionBtn />
                      <ActionBtn />
                      <ActionBtn />
                    </div>

                    <div className="flex justify-evenly ">
                      <ActionBtn />
                      <ActionBtn />
                      <ActionBtn />
                    </div>

                    
                </div>

              <div>
                  
                </div>
                
              </div>
            </div>

            
          </div>


    </div>



    </div>
  );
}