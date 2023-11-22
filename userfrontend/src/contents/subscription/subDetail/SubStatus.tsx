import ProgressBar from "../../../components/ProgressBar"
import { AiOutlineAlert } from "react-icons/ai";

export default function SubStatus(){
    return(
        <>
            <div className=" w-5/6 h-24 m-auto rounded-xl bg-slate-100">
                <div className="w-full h-16 border border-black">
                    <div className="grid grid-cols-2 h-full ">
                        <div className="">
                            <div className=" border border-black h-full pt-2">
                                <div className="text-xs text-gray-500">청약 모집률</div>
                                <div className="font-bold text-2xl">38%</div>
                            </div>
                        </div>
                        <div className="text-xs">마감까지 17억 3500만원 남음</div>
                    </div>
                </div>
                <div className="w-faull h-8 border border-black">
                    <ProgressBar percent={38} />
                </div>
            </div>
            <div className="w-5/6 min-h-[25rem] m-auto rounded-xl bg-slate-100 mt-3 border border-black">
                <div className="border border-black w-full h-16">
                    <div className="flex h-full">
                        <div className=" w-1/4">
                            <div className="w-10 h-10 border-2 border-blue-500 m-auto mt-2 flex items-center justify-center rounded-full font-extrabold">1</div>
                        </div>
                        <div className="mt-2">
                            <div className="">건물 입고</div>
                            <div className="text-xs text-gray-700">11월 17일 금요일 오후 10시 0분</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-5/6 h-16 rounded-xl bg-slate-200 m-auto mt-2  ">
                <AiOutlineAlert className="" />
                <span className="text-xs text-gray-700">모집률 100% 달성 시 조기에 마감이 될 수 있습니다. 모집이 마감되면 청약 및 청약 취소를 할 수 없어요
                </span>
            </div>
        </>


    )
}