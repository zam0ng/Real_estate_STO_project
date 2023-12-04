import LineChartSmall from "@/app/_contents/admin/dashboard/LineChartSmall";
import { getTradeData } from "@/app/api/getTradeData";

const CardSmallGraphRight = async () => {
  const tradeData = await getTradeData();

  console.log("tradeData", tradeData);

  const totalSum = tradeData?.reduce(
    (acc: number, curr: number | string) => acc + Number(curr),
    0
  );
  const convertedTotal = totalSum?.toLocaleString();

  return (
    <>
      {/* <div className="w-52 h-20 bg-dashboard_card_bg rounded-0.87rem border-dashboard_card_board  shadow-card  flex flex-row	items-center	justify-around	"> */}
      <div className="w-52 h-20 bg-dashboard_card_bg rounded-0.87rem border-dashboard_card_board  shadow-md  flex flex-row	items-center	justify-around	">
        {/* <div className="flex items-center justify-center w-12 h-12 bg-green-600"> */}
        <div className="relative flex items-start w-20 h-20 bg-dashboard_card_bg ">
          <LineChartSmall
            _lineColor={"rgb(142, 153, 250)"}
            _data={tradeData && tradeData}
            _label={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-base font-medium text-dashboard_card_text">
            거래금액
          </p>
          <h3 className="text-xl font-bold tracking-0.015rem text-adminLayout_menubar_name">
            {convertedTotal && convertedTotal}원
          </h3>
        </div>
      </div>
    </>
  );
};

export default CardSmallGraphRight;
