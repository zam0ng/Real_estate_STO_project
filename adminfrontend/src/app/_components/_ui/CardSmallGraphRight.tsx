
import LineChartSmall from "@/app/_contents/admin/dashboard/LineChartSmall";




const CardSmallGraphRight = (   ) => {
  return (
    <>
      {/* <div className="w-52 h-20 bg-dashboard_card_bg rounded-0.87rem border-dashboard_card_board  shadow-card  flex flex-row	items-center	justify-around	"> */}
      <div className="w-52 h-20 bg-dashboard_card_bg rounded-0.87rem border-dashboard_card_board  shadow-card  flex flex-row	items-center	justify-around	">
        
        {/* <div className="flex items-center justify-center w-12 h-12 bg-green-600"> */}
        <div className="relative flex items-start w-20 h-20 bg-dashboard_card_bg ">
          <LineChartSmall 
            _lineColor = {'rgb(142, 153, 250)'}  
            _data = {[110, 123, 60, 50, 70, 110, 120, 520, 270 , 700]}  
            _label = {["Oct 10","17","Nov 3", "10", "17", "24", "Dec 3", "10", "17", "24", ]} />
        </div>

        <div className="flex flex-col">
          <p className="text-base font-medium text-dashboard_card_text">
            총 거래금액
            {/* 총 거래 금액 */}
          </p>
          <h3 className="text-xl font-bold tracking-0.015rem text-adminLayout_menubar_name">
            
            5,700만원
            {/* 5,700만원 */}
          </h3>
        </div>
      </div>
    </>
  );
};

export default CardSmallGraphRight;
