


const TableItem = () => {
return (
    <>
        {/* 두 번째 행 : item*/}
            {/* 구분선 */}
            <div className="w-full col-span-9 border-t-2 border-collapse border-neutral-100 ">  </div>
            {/* 아이템 나열 */}
                <div className="flex items-center col-span-1 -mr-8 w-52 h-14 justify-self-start">
                    {/* 사진 */}
                    <div className="w-10 h-10 my-auto rounded-md bg-slate-500 "></div>
                    {/* 이름 */}
                    <p className="ml-3 text-base font-medium tracking-tight text-neutral-700 "> Emma Ryan</p>
                </div>
                <div className="flex items-center justify-center col-span-1 font-semibold tracking-tight text-neutral-700">
                    <div className="flex items-center justify-center w-24 h-8 bg-state_pending_back rounded-2xl ">
                    <p className="text-sm font-medium text-state_pending_text ">진행중</p>
                    </div>
                </div>
                <div className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                <div className="flex items-center justify-center col-span-1 overflow-hidden text-base font-medium tracking-tight text-neutral-700 text-overflow-ellipsis">
                100% 
                </div>

                <div className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700">D-day</div>
                <div className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700">lorem</div>
                <div className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700">loremlorem</div>
                <div className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700">loremloremloremlorem</div>
                
                <div className="flex items-center justify-center col-span-1 text-base font-medium tracking-tight text-neutral-700 ">
                <div className="flex items-center justify-center w-24 h-8 -mr-8 border-2 rounded-lg border-text-action_btn_text bg-neutral-50">
                    <p className="text-sm text-action_btn_text">Details</p>
                </div>
                </div>


    </>
)
}

export default TableItem