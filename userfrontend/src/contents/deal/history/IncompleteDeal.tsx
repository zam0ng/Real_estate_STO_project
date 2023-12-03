import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { serverurl } from "../../../components/serverurl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cookies } from "react-cookie";

interface IncompleteDealRequest {
  id: number;
  order_type: string;
  createdAt: string;
  order_price: number;
  possible_amount: number;
}

interface CancelArguments {
  id: number;
}

const fetchIncompleteDeal = async (
  propertyName: string,
  accToken: string
): Promise<IncompleteDealRequest[]> => {
  const { data } = await axios.post(
    `${serverurl}/order/not_conclusion/${propertyName}`,
    { token: accToken }
  );
  return data;
};

const cancelIncompleteDeal = async (
  propertyName: string,
  id: number,
  accToken: string
): Promise<string> => {
  const { data } = await axios.post(
    `${serverurl}/order/cancel/${propertyName}/${id}`,
    { token: accToken }
  );
  return data;
};
interface socketProps {
  isSocket: any;
}

const IncompleteDeal: React.FC<socketProps> = ({ isSocket }) => {
  const currentPage = useLocation();

  const queryClient = useQueryClient();

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");

  const [orderType, setOrderType] = useState<string>("");
  const [koreanTime, setKoreanTime] = useState<string[]>([]);
  const [isOpen, setisOpen] =useState(false);
  const [isContent, setContent] = useState("");
  const [isTitle, setIsTitle] = useState("");

  const [fromRecent,setFromRecent] = useState<IncompleteDealRequest[]>([]);

  const {
    data: incompleteDeals,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["incompleteDeals", currentPage.state.propertyName],
    queryFn: () =>
      fetchIncompleteDeal(currentPage.state.propertyName, isCookie),
  });

  const cancelMutation = useMutation({
    mutationFn: (args: CancelArguments) =>
      cancelIncompleteDeal(currentPage.state.propertyName, args.id, isCookie),
    onSuccess: (data) => {
      // console.log(data);
      queryClient.refetchQueries({ queryKey: ["incompleteDeals"] });
      isSocket.emit("cancel_completed");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCancel = (id: number) => {
    cancelMutation.mutate({ id });
    setisOpen(true);
    setIsTitle('주문 취소 접수')
    setContent('주문 취소 신청이 접수되었습니다.')
  };

  useEffect(()=>{
    if(Array.isArray(incompleteDeals)){
      const sortedByDate = incompleteDeals.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
      });

      setFromRecent(sortedByDate);
    }else{
      setFromRecent([]);
    }
  },[incompleteDeals]);

  return (
    <>
      {/* 알림창 */}
      {isOpen && 
          <>
          <div className='absolute border-2 top-0 left-0 w-full h-full bg-state_loading_back z-50'>
              <div className='absolute top-1/2 left -1/2 border-2 custom-transform w-72 h-32 flex flex-col items-center bg-white z-10' >
                  <span className='font-bold mt-3 text-blue-800'>{isTitle}</span> <br></br> <span className='-mt-3 text-sm'>{isContent}</span>
                  <hr className='border-1 w-full mt-3'></hr>
                  <button onClick={()=>setisOpen(false)} className='mt-2 text-blue-800'>확인</button>
              </div>
          </div>
          </>
      }
      {fromRecent &&
        fromRecent.map((item, index) => {
          return (
            <div
              className="w-full h-[30%] flex flex-col items-center text-sm mt-2 mb-2"
              key={index}
            >
              <div
                className={`w-[80%] h-1/5 text-xs md:text-lg flex justify-between ${
                  item.order_type === "sell" ? "blueText" : "redText"
                }`}
              >
                <div className="flex justify-center items-center">
                  {item.order_type === "buy" ? "구매" : "판매"}
                </div>
                <button
                  onClick={() => handleCancel(item.id)}
                  className="w-[30%] h-full bg-slate-400 text-xs text-white rounded-md flex justify-center items-center"
                >
                  취소
                </button>
              </div>
              <div className="w-[80%] h-1/5 text-xxs md:text-sm text-slate-400 flex items-center ">
                {item.createdAt.slice(0, 10) +
                  " " +
                  item.createdAt.slice(11, 16)}
              </div>
              <div className="w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between">
                <p>가격</p>
                <div>{item.order_price} 원</div>
              </div>
              <div className="w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between">
                <p>수량</p>
                <div>{item.possible_amount} 개</div>
              </div>
              <div className="w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between">
                <p>금액</p>
                <div>{item.order_price * item.possible_amount} 원</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default IncompleteDeal;
