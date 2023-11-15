
import TableItem from "./TableItem"

const TableContent = () => {
return (
    <>
        <div className="grid gap-2 pb-12 pl-12 pr-12 text-xl tracking-tight text-center bg-white border-b-2 w-4/4 rounded-b-3xl justify-items-center grid-cols-table mx-44">
            
            {/* 속성 */}
                {/* 구분선 */}
                    <div className="w-full col-span-9 border-t-4 border-collapse border-neutral-100 ">  </div>
                {/* 구분 요소 나열 */}
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">구분 </div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">청약 상태</div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">청약 기간</div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">참여율</div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">D-day</div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">lorem</div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">loremlorem</div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text ">loremloremloremlorem</div>
                    <div className="flex items-center justify-center col-span-1 font-bold h-14 text-table_crieria_text "></div>

            {/* item */}
                <TableItem />
                <TableItem />
                <TableItem />





                {/* 종료 구분선 */}
                <div className="w-full col-span-6 border-t-2 border-collapse border-neutral-100 ">  </div>

                
        </div>

    </>
)
}

export default TableContent