// component 에서 활용할 수 있는 재료가 있으면 사용 
// 없으면, 만들어서 
// layout 컴포넌트 만들고 
// 모든 페이지에서 공통 사용 


export default function Layout() {
    return (
      <>
        <div className="relative">
          {/* 상단 header */}
          <div className="w-auto bg-blue-100 h-36 rounded-adminLayout_header -z-10">
            {/* border-radius: 3rem 3rem 0rem 0rem; */}
          </div>
  
          {/* 왼쪽 menu bar | 메뉴바 */}
          <div className="absolute h-auto bg-neutral-200 left-4 top-4 w-80 rounded-3xl">
            
            {/* wrapper */}
            <div className="flex flex-col items-center ">
            
              {/* 로고 ✅✅ */}
              <div className="mt-12 bg-blue-900 rounded-full w-28 h-11"></div>
              
              {/* 프로필 이미지 */}
              <div className="rounded-full mt-14 bg-blue-950 w-28 h-28"></div>
  
              {/* 이름 */}
              <p className="mt-5 text-base font-normal text-zinc-400 ">
                Welcome back
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-adminLayout_menubar_name ">
                Bounce Code
              </p>
  
              {/* Monthly Earnings */}
              <p className="mt-16 text-4xl font-semibold tracking-tighter text-adminLayout_menubar_name">
              ₩34,321
              </p>
              <p className="mt-2 text-base font-medium text-gray-500 ">
                Monthly Earnings
              </p>
  
              {/* 목차 */}
              <div className="flex-col mt-28 " >
  
                <div className="flex" >
                  {/* ✅ 아이콘 들어가야 함 */}
                  <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                    <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                      대시보드
                    </p>
                  </div>
                  
                <div className="flex mt-14" >
                  {/* ✅ 아이콘 들어가야 함 */}
                  <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                    <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                      사용자
                    </p>
                </div>
                  
                <div className="flex mt-14" >
                  {/* ✅ 아이콘 들어가야 함 */}
                  <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                    <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                      거래이력
                    </p>
                </div>
  
                <div className="flex mt-14" >
                  {/* ✅ 아이콘 들어가야 함 */}
                  <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                    <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                      매물관리
                    </p>
                </div>
  
                <div className="flex mt-14" >
                  {/* ✅ 아이콘 들어가야 함 */}
                  <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                    <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                      게시글
                    </p>
                </div>
  
                <div className="flex mt-48 mb-4" >
                  {/* ✅ 아이콘 들어가야 함 */}
                  <div className="w-8 h-8 bg-stone-300 rounded-2xl" > </div>
                    <p className="ml-5 text-xl font-bold tracking-tight text-adminLayout_menubar_name">
                      Log-out
                    </p>
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
  }
  