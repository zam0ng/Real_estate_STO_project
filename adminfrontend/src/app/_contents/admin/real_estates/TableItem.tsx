


const TableItem = () => {
return (
    <>
        {/* 두 번째 행 : item*/}
            {/* 구분선 */}
            <div className="w-full col-span-9 border-t-2 border-collapse border-neutral-100 ">  </div>
            {/* 아이템 나열 */}
                <div className="flex items-center h-16 col-span-1 -mr-8 justify-self-start">
                    {/* 사진 */}
                    <div className="w-12 h-12 mx-auto my-auto rounded-md bg-slate-500 "></div>
                    {/* 이름 */}
                    <p className="ml-3 text-xl font-semibold tracking-tight text-neutral-700 "> Emma Ryan</p>
                </div>
                <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">
                    <div className="flex items-center justify-center w-28 h-9 bg-state_pending_back rounded-2xl ">
                    <p className="text-base text-state_pending_text ">진행중</p>
                    </div>
                </div>
                <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">23.11.01 - 23.11.10</div>
                <div className="flex items-center justify-center col-span-1 overflow-hidden text-xl font-semibold tracking-tight text-neutral-700 text-overflow-ellipsis">
                100% 
                </div>

                <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">D-day</div>
                <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">lorem</div>
                <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">loremlorem</div>
                <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700">loremloremloremlorem</div>
                
                <div className="flex items-center justify-center col-span-1 text-xl font-semibold tracking-tight text-neutral-700 ">
                <div className="flex items-center justify-center -mr-8 border-2 rounded-lg border-text-action_btn_text w-28 h-9 bg-neutral-50">
                    <p className="text-base text-action_btn_text">Details</p>
                </div>
                </div>


    </>
)
}

export default TableItem