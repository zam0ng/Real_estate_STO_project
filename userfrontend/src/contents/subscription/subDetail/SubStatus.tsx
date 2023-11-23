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
            <div className=" w-5/6 h-28 m-auto rounded-xl border px-1 ">
                <div className="w-full h-16 mt-3 ">
                    <div className="grid grid-cols-3 h-full ">
                        <div className="">
                            <div className="h-full pt-2 pl-5">
                                <div className="text-xs text-gray-500">청약 모집률</div>
                                <div className="font-bold text-2xl w-5/6 m-auto ">{detail.subscription_order_amount/ detail.subscription_totalsupply * 100}%</div>
                            </div>
                        </div>
                        <div className="text-xs col-span-2 text-center pt-2">
                            <div className="font-bold mb-2">{detail.subscription_description}</div>
                            <span className="bg-gray-200 text-blue-400 rounded-sm px-2 py-1 font-bold">{`마감까지 ${formatCurrency(5000 *(detail.subscription_totalsupply-detail.subscription_order_amount))}원 남음👏`}</span>
                        </div>
                    </div>
                </div>
                <div className=" ">
                    <ProgressBar percent={detail.subscription_order_amount/ detail.subscription_totalsupply * 100} />
                </div>
            </div>
            <div className="w-5/6 h-72 m-auto rounded-xl  mt-3 border ">
                <div className="w-full h-16 mt-1">
                    {statusBox.map((i)=>{
                        return (
                        <div className="flex h-full mb-2">
                            <div className=" w-1/4 pt-1">
                                <div className="w-10 h-10 border-2 border-blue-500 m-auto mt-2 flex items-center justify-center rounded-full font-extrabold">{i.number}</div>
                            </div>
                            <div className="mt-2">
                                <div className="font-extrabold text-lg">{i.title}</div>
                                <div className="text-xs text-gray-700 pt-1">{i.date} 오전 9 시 </div>
                            </div>
                        </div>
                        )
                    })}


                </div>
            </div>
            <div className="w-5/6 h-20 rounded-xl m-auto px-2 mt-3 border rounded-2xl  ">
                <AiOutlineAlert className="text-red-600 " />
                <span className="text-xs text-gray-700">모집률 100% 달성 시 조기에 마감이 될 수 있습니다.<br/>모집이 마감되면 청약 및 청약 취소를 할 수 없어요
                </span>
            </div>
        </>


    )
}