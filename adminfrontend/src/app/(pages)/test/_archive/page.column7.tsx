import Layout from "@/app/_layout/layout";

export default function Real_estates() {
  return (
    <>
      <div>
        <Layout />

        <h1 className="text-center bg-green-300 ">
          매물 관련 페이지, 청약 및 매매 페이지
        </h1>

        <div className="flex w-full h-screen">
          <div className="bg-yellow-300 w-adminLayout_menubar_container"> </div>
          {/* <div className="w-full bg-neutral-100"> */}
          <div className="w-full bg-neutral-100">
            <div className="flex flex-col ">
              {/* table container */}
              <div className="w-auto h-auto bg-pink-300">
                {/* table 제목 */}
                <div className=" bg-white items-center w-3/4	 mt-12 h-28 mx-44 text-1.75rem font-bold tracking-tight text-adminLayout_menubar_name flex rounded-t-3xl">
                  <p className="ml-12"> Transactions </p>
                </div>

                {/* table 내용 */}
                <div className="grid w-3/4 gap-2 pb-12 pl-12 pr-12 text-xl tracking-tight text-center bg-white border-b-2 rounded-b-3xl justify-items-center grid-cols-table mx-44">
                  {/* 첫 번째 행 : 구분 기준 */}
                  {/* 구분선 */}
                  <div className="w-full col-span-7 border-t-4 border-collapse border-neutral-200 ">
                    {" "}
                  </div>
                  {/* 구분 요소 나열 */}
                  <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">
                    구분{" "}
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">
                    청약 상태
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">
                    청약 기간
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">
                    참여율
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">
                    D-day
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">
                    D-day
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text "></div>

                  {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                  <div className="w-full col-span-7 border-t-2 border-collapse border-neutral-100 ">
                    {" "}
                  </div>
                  {/* 아이템 나열 */}
                  <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                    {/* 사진 */}
                    <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                    {/* 이름 */}
                    <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 ">
                      {" "}
                      Emma Ryan
                    </p>
                  </div>
                  <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                    <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                      <p className="text-base text-state_pending_text ">
                        진행중
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                    23.11.01 - 23.11.10
                  </div>
                  <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                    100%
                  </div>

                  <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                    D-day
                  </div>
                  <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                    D-day
                  </div>

                  <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                    <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                      <p className="text-base text-action_btn_text">Details</p>
                    </div>
                  </div>

                  {/* 종료 구분선 */}
                  <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">
                    {" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
