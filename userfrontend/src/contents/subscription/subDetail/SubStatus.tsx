import ProgressBar from "../../../components/ProgressBar"
import { AiOutlineAlert } from "react-icons/ai";
import { SubDetail } from "../../../features/SubDetail";

type SubStatusType = {
    detail : SubDetail
}

export default function SubStatus({detail} : SubStatusType){

    let statusBox = [
        { number: 1, title: "청약 시작", date: detail.subscription_start_date },
        { number: 2, title: "결과 발표", date: detail.subscription_end_date },
        { number: 3, title: "건물 입고", date: detail.subscription_building_date },
        { number: 4, title: "거래 시작 ", date: detail.subscription_trading_start_date },
    ]

    function formatCurrency(amount :number) {
        return `${amount.toLocaleString('ko-KR')}`;
    }

    return(
        <>
            <div className=" w-5/6 h-24 m-auto rounded-xl ">
                <div className="w-full h-16 border border-black">
                    <div className="grid grid-cols-3 h-full ">
                        <div className="">
                            <div className=" border border-black h-full pt-2 pl-5">
                                <div className="text-xs text-gray-500">청약 모집률</div>
                                <div className="font-bold text-2xl ">{detail.subscription_order_amount/ detail.subscription_totalsupply * 100}%</div>
                            </div>
                        </div>
                        <div className="text-xs col-span-2 text-center pt-8"><span className="bg-gray-200 text-blue-400 rounded-sm px-2 py-1 font-bold">{`마감까지 ${formatCurrency(5000 *(detail.subscription_totalsupply-detail.subscription_order_amount))}원 남음👏`}</span></div>
                    </div>
                </div>
                <div className=" ">
                    <ProgressBar percent={detail.subscription_order_amount/ detail.subscription_totalsupply * 100} />
                </div>
            </div>
            <div className="w-5/6 min-h-[25rem] m-auto rounded-xl bg-slate-100 mt-3 border border-black">
                <div className="border border-black w-full h-16 ">
                    {statusBox.map((i)=>{
                        return (
                        <div className="flex h-full">
                            <div className=" w-1/4">
                                <div className="w-10 h-10 border-2 border-blue-500 m-auto mt-2 flex items-center justify-center rounded-full font-extrabold">{i.number}</div>
                            </div>
                        <div className="mt-2">
                            <div className="font-extrabold text-lg">{i.title}</div>
                                <div className="text-xs text-gray-700">{i.date}</div>
                            </div>
                        </div>
                        )
                    })}


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