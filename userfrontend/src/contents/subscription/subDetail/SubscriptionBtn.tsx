import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useQueries, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../components/url";
import jwt from "jsonwebtoken";
import { FaPlus, FaMinus } from "react-icons/fa6";
import OrderConfirm from "./Orderconfirm";
import { RiArrowDropDownLine } from "react-icons/ri";

type subdetailtype = {
  props: string | undefined;
};

export default function SubscriptionBtn({ props }: subdetailtype) {
  let { buildingId } = useParams();
  const [userBalance, setUserBalance] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [orderConfirm, setOrderConfirm] = useState(false);

  const fetchData = async () => {
    const { data } = await axios.get(`/subscription/detail/${buildingId}`);
    return data;
  };

  const {
    isLoading: isLoadingSubDetail,
    error: errorSubDetail,
    data: dataSubDetail,
  } = useQuery({
    queryKey: ["SubDetail", buildingId],
    queryFn: fetchData,
  });

  let [detail] = dataSubDetail;

  parseInt(detail.subscription_offering_price);

  const [isCookie, setIsCookie] = useState(false);

  const [cookies] = useCookies(["accessToken"]);

  const accessToken = cookies.accessToken;

  const fetchId = async () => {
    const { data } = await axios.post(`/subscription/get_balance`, {
      token: accessToken,
    });
    return data;
  };

  const {
    isLoading: isLoadingUserId,
    error: errorUserId,
    data: dataUserId,
  } = useQuery({
    queryKey: ["UserID"],
    queryFn: fetchId,
  });

  const Navigate = useNavigate();

  function handleSubscription() {
    if (cookies.accessToken) {
      setIsCookie(true);
    } else {
      Navigate("/bounslogin", { state: `/subscription/detail/${props}` });
    }
  }

  function handleQuantityBtn(num: number) {
    setQuantity((prev) => {
      console.log("이전값", prev);
      console.log(typeof dataUserId);
      console.log("dataUserId");
      console.log(dataUserId);
      const newQuantity = prev + num;
      if (dataUserId < parseInt(detail.subscription_offering_price)) {
        setQuantity(0);
      }

      if (newQuantity < 1) return 0;
      if (
        newQuantity >
        detail.subscription_totalsupply - detail.subscription_order_amount
      ) {
        return (
          detail.subscription_totalsupply - detail.subscription_order_amount
        );
      }
      if (
        newQuantity >
        Math.floor(dataUserId / parseInt(detail.subscription_offering_price))
      ) {
        return Math.floor(
          dataUserId / parseInt(detail.subscription_offering_price)
        );
      }
      console.log("newQuantity");
      console.log(newQuantity);
      return newQuantity;
    });
  }

  function handleQuantityInput(num: number) {
    const validNum = isNaN(num) ? 0 : num;

    if (validNum < 1) {
      setQuantity(0);
    } else if (
      validNum >
      Math.floor(dataUserId / parseInt(detail.subscription_offering_price))
    ) {
      setQuantity(
        Math.floor(dataUserId / parseInt(detail.subscription_offering_price))
      );
    } else {
      setQuantity(validNum);
    }
  }

  function handleOrder() {
    setOrderConfirm(true);
    setIsCookie(false);
  }

  useEffect(() => {
    // "청약하기" 버튼을 클릭하면 스크롤을 맨 위로 올리고 새로운 <div>를 나타나게 함
    if (isCookie) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isCookie]);

  function formatCurrency(amount: number) {
    return `${amount.toLocaleString("ko-KR")}`;
  }

  return (
    <>
      {orderConfirm ? (
        <OrderConfirm
          setOrderConfirm={setOrderConfirm}
          dataUserId={dataUserId}
          dataSubDetail={dataSubDetail}
          quantity={quantity}
        />
      ) : null}

      {isCookie ? (
        <>
          <div className=" w-full h-full border z-10  m-auto fixed top-96 shadow-lg bg-white bg-gradient-to-brounded-3xl animate-slide-up rounded-2xl ">
            <RiArrowDropDownLine
              className="mt-4 ml-4 w-6 h-6 m-auto"
              onClick={() => setIsCookie(false)}
            />
            <div className="w-5/6  m-auto text-right  h-6 mb-5 text-sm">
              <span className="bg-gray-100 text-blue-400 rounded-sm px-2 py-1 font-bold">
                잔고 : {formatCurrency(dataUserId)}
                {/* <span className="ml-1"></span> */}
              </span>
            </div>
            <div className=" text-right h-14 w-5/6 m-auto flex justify-between mb-5">
              <div>
                <input
                  type="number"
                  className=" w-8 mt-3 font-extrabold text-center"
                  placeholder="0"
                  value={quantity}
                  onChange={(event) =>
                    handleQuantityInput(parseInt(event?.target.value))
                  }
                ></input>
                <span className="text-xs">주</span>
              </div>
              <div className="w-28  ">
                <div className="inline-block border border-gray-200 w-12 h-12 text-center text-gray-400 hover:text-blue-400 ">
                  <button
                    className="h-full "
                    onClick={() => handleQuantityBtn(-1)}
                  >
                    <FaMinus className=" " />
                  </button>
                </div>
                <div className="inline-block border border-gray-200 w-12 h-12 text-center text-gray-400 hover:text-blue-400">
                  <button
                    className="h-full "
                    onClick={() => handleQuantityBtn(+1)}
                  >
                    <FaPlus className="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-5/6 m-auto h-9  font-extrabold flex justify-between">
              <div>공모가</div>
              <div>5,000 원</div>
            </div>
            <div className="w-5/6 m-auto h-9 font-extrabold flex justify-between">
              <div>구매수량</div>
              <div className="w-20 text-right">{formatCurrency(quantity)}</div>
            </div>
            <div className="w-5/6 m-auto h-9 border-t-2 border-black font-extrabold flex justify-between pt-3">
              <div className="text-blue-500">총 청약 금액</div>
              <div className="w-25 text-blue-500 text-right">
                {formatCurrency(
                  quantity * parseInt(detail.subscription_offering_price)
                )}
                <span className="ml-1">원</span>
              </div>
            </div>
            <div
              className={` w-5/6 h-12 rounded-md ${
                quantity ? "bg-blue-950" : "bg-gray-400"
              } text-white m-auto flex justify-center items-center font-semibold my-4`}
              onClick={quantity ? handleOrder : undefined}
            >
              주문하기
            </div>
          </div>
        </>
      ) : (
        <div
          className=" w-5/6 h-12 rounded-md bg-blue-950 text-white m-auto flex justify-center items-center font-semibold my-4"
          onClick={() => handleSubscription()}
        >
          청약하기
        </div>
      )}
    </>
  );
}
