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
              <div className=" bg-white items-center w-2/4	 mt-12 h-28 mx-44 text-1.75rem font-bold tracking-tight text-adminLayout_menubar_name flex rounded-t-3xl">
                <p className="ml-12"> Transactions </p>
              </div>

              {/* table 내용 */} 
              <div className="grid w-2/4 gap-2 pl-12 pr-12 text-xl tracking-tight text-center bg-white border-b-2 justify-items-center grid-cols-table mx-44">
                
                {/* 첫 번째 행 : 구분 기준 */}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-4 border-collapse border-neutral-200 ">  </div>
                  {/* 구분 요소 나열 */}
                      <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">구분 </div>
                      <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">청약 상태</div>
                      <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">청약 기간</div>
                      <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">참여율</div>
                      <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">D-day</div>
                      <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text "></div>

                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                      
                {/* 두 번째 행 : item*/}
                  {/* 구분선 */}
                      <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>
                  {/* 아이템 나열 */}
                      <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                          {/* 사진 */}
                          <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                          {/* 이름 */}
                          <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                          <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                            <p className=" text-state_pending_text">진행중</p>
                          </div>
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                      <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                        100% 
                      </div>
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                      
                      <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                        <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                          <p className="text-action_btn_text">Details</p>
                        </div>
                      </div>
                




                
              </div>
              
            </div>





              <br></br>
              <br></br>
              <br></br>

              <div className="flex flex-col w-3/4 px-12 text-center bg-white mx-44 border-neutral-200">
                
                <div className="flex items-center justify-between h-16 col-span-6 text-xl font-bold tracking-tight border-t-4 border-b-2 text-table_crieria_text border-neutral-200">
                  
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-blue-50">구분</p>
                  </div>
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-blue-100">청약 상태</p>
                  </div>
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-yellow-100">청약 기간</p>
                  </div>
                  <div className="w-16 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-blue-200">참여율</p>
                  </div>
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-green-200">D-day</p>
                  </div>
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-blue-300">버튼</p>
                  </div>
                </div>

                <div className="flex items-center justify-between h-16 col-span-6 text-xl font-bold tracking-tight text-center border-b-2 text-adminLayout_menubar_name">
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-blue-50">구분</p>
                  </div>
                  <div>
                    <p className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                      청약 상태
                    </p>
                  </div>
                  <div>
                    <p className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                      청약 기간
                    </p>
                  </div>
                  <div className="w-16 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="text-center">1000%%%%%%%%%%%%%%%</p>
                  </div>
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-green-200">D-day</p>
                  </div>
                  <div className="w-12 flex-grow:1 flex-shrink:1 flex-basis:auto">
                    <p className="bg-blue-300">버튼</p>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <br />

              <table className="bg-white table-auto mx-44 rounded-b-3xl ">
                {/* <caption className=" bg-white mt-12  mx-44 text-1.75rem font-bold tracking-tight text-adminLayout_menubar_name ">  Transactions </caption> */}
                <thead className="">
                  <tr className="h-16 text-xl tracking-tight border-t-4 border-b-2 text-table_crieria_text border-neutral-100">
                    {/* <tr className="h-16 text-xl tracking-tight text-blue-500 border-t-4 border-b-2 border-neutral-100"> */}
                    <th className="font-bold" colSpan={2}>
                      Receiver⭐
                    </th>
                    {/* <th >매물이름</th>/ */}
                    <th>청약 상태</th>
                    <th>청약 기간</th>
                    <th>참여율</th>
                    <th>D-day</th>
                    <th> </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="h-20 text-lg font-semibold tracking-tight text-center border-neutral-100 text-adminLayout_menubar_name border-y-2">
                    <td className="">
                      <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                    </td>
                    <td>
                      <p className="-ml-16 text-xl text-neutral-700">
                        {" "}
                        Emma Ryan{" "}
                      </p>
                    </td>

                    <td className="flex items-center justify-center h-20">
                      <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                        <p className=" text-state_pending_text">진행중</p>
                      </div>
                    </td>

                    <td className="text-xl text-neutral-700">
                      23.11.01 - 23.11.10
                    </td>
                    <td className="text-xl text-neutral-700 ">100%</td>
                    <td className="text-xl text-neutral-700">D+1</td>

                    <td className="flex items-center justify-center h-20 ">
                      <div className="flex items-center justify-center border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                        <p className="text-action_btn_text">Details</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* 제목 */}

            {/* 컬럼 | 속성  */}
            {/* <div className="flex justify-between mt-10 border-stone-200 border-y-2 border-t- mx-44">
              <p className="my-5 text-lg font-semibold tracking-tight text-stone-500"> 구분 </p>
              <p className="my-5 text-lg font-semibold tracking-tight text-stone-500"> 청약 상태 </p>
              <p className="my-5 text-lg font-semibold tracking-tight text-stone-500"> 청약 기간 </p>
              <p className="my-5 text-lg font-semibold tracking-tight text-stone-500"> 참여율 </p>
              <p className="my-5 text-lg font-semibold tracking-tight text-stone-500"> D-day </p>
              <p className="my-5 text-lg font-semibold tracking-tight text-stone-500"> (action 버튼) </p>
            </div> */}

            {/* 아이템  */}
            {/* <ul>
              <li>
                <p>사진</p>
                <p>이름</p>
                <p>이름</p>
                <p>type</p>
                <p>status</p>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}
