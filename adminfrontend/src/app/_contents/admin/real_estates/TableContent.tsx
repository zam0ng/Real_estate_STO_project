
import Link from "next/link"
import TableItem from "./TableItem"

const TableContent = () => {
return (
    <>
        <div className="grid gap-2 pb-12 pl-12 pr-12 text-base tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-table mx-44">
            
            {/* 속성 */}
                {/* 구분선 */}
                    <div className="w-full col-span-9 border-t-4 border-collapse border-neutral-100 ">  </div>
                {/* 구분 요소 나열 */}
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">매물명</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">설명</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">진행 상태</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">청약률</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">목표 공모</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">완료 공모</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">청약 기간</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text ">청약 발표일</div>
                    <div className="flex items-center justify-center h-12 col-span-1 font-semibold text-table_crieria_text "></div>

            {/* item */}
                    <TableItem />
                {/* <Link href={} >  
                </Link> */}
                
                <TableItem />
                <TableItem />





                {/* 종료 구분선 */}
                <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>

                
        </div>

    </>
)
}

export default TableContent