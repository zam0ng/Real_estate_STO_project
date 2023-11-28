import InputFormItem from "../dashboard/InputFormItem";

import React from "react";
import RenderItem from "../dashboard/RenderItem";

interface RenderSubscriptionInfoProps {
  title?: string | null;
  desc?: string | null;
  totalprice?: string | null | number;
  totalsupply?: string | null | number;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  result_date?: string | null;
  building_date?: string | null;
  trading_start_date?: string | null;
  order_amount?: number | null;
  offering_price?: string | null;
  status?: string | null;
  stock_type?: string | null;
  publisher?: string | null;
}

const RenderSubscriptionInfo: React.FC<RenderSubscriptionInfoProps> = ({
  title,                    
  desc,                    
  totalprice,                    
  totalsupply,                  
  description,                    
  start_date,                    
  end_date,                    
  result_date,                    
  building_date,                    
  trading_start_date,                    
  order_amount,                    
  offering_price,                    
  status,                    
  stock_type,                    
  publisher,                    
}) => {
  return (
    <>
      <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
        {title}
      </h1>

      <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
        <p className=""> {desc} </p>
      </div>

      {/* 제목 */}
      {/* <h2 className="mt-2 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
        건물 이미지
      </h2> */}

      {/* Input 컴포넌트 */}
      {/* <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem"> */}
        {/* <input type="file" name="upload" placeholder= "ex) img"  multiple /> */}
      {/* </div> */}

      <RenderItem title="총 공모금액" desc={totalprice} />
      <RenderItem title="총 발행량" desc={totalsupply} />
      <RenderItem title="매물 설명" desc={description} />
      <RenderItem title="청약 시작일" desc={start_date} />
      <RenderItem title="청약 종료일" desc={end_date} />
      <RenderItem title="청약 발표일" desc={result_date} />
      <RenderItem title="청약 입고일" desc={building_date} />
      <RenderItem title="거래 시작일" desc={trading_start_date} />
      <RenderItem title="모집된 청약 수" desc={order_amount} />
      <RenderItem title="주당 공모 금액" desc={offering_price} />
      <RenderItem title="청약 상태" desc={status} />
      <RenderItem title="증권 종류" desc={stock_type} />
      <RenderItem title="발행인" desc={publisher} />

      {/* <InputFormItem _title={"공모자산 주소"} _type={"text"} _name = {"address"}  _placeholder={"서울 영등포구 선유로 76"} />
                
                <InputFormItem _title={"층수"} _type={"text"} _name = {"floors"}  _placeholder={"7층"} />
                <InputFormItem _title={"용도 지역"} _type={"text"} _name = {"purpose"}  _placeholder={"준공업지역"} />
                <InputFormItem _title={"주용도"} _type={"text"} _name = {"mainpurpose"}  _placeholder={"근린생활시설"} />
                <InputFormItem _title={"대지면적"} _type={"number"} _name = {"area"}  _placeholder={"333.2"} _step='0.1' />
                <InputFormItem _title={"연면적"} _type={"number"} _name = {"all_area"}  _placeholder={"999.5"} _step='0.1'/>
                <InputFormItem _title={"건폐율"} _type={"number"} _name = {"build_area"}  _placeholder={"70.1"} _step='0.1'/>
                <InputFormItem _title={"용적률"} _type={"number"} _name = {"floor_area"}  _placeholder={"265.1"} _step='0.1'/>
                <InputFormItem _title={"준공일"} _type={"text"} _name = {"completion"}  _placeholder={"2005-07-26"} /> */}
    </>
  );
};

export default RenderSubscriptionInfo;
