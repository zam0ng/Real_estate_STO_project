

import InputFormItem from './InputFormItem'

import React from 'react'

interface FormSectionProps {
    title : string 
    desc : string
}

const FormSectionSubscriptionInfo : React.FC<FormSectionProps> = ( {title, desc} ) => {
  return (
    <>
              <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
                발행 정보
              </h1>
              
              {/* 설명 */}
                <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
                    <p className="" >발행정보 : 어떤 건물이 STO 토큰으로 발행되는지에 대한 정보 제공

</p>
                </div>

                {/* 발행 정보 */}
                <InputFormItem _title={"증권 종류"} _type={"text"} _name = {"stock_type"}  _placeholder={"수익증권"} />
                <InputFormItem _title={"토큰 이름"} _type={"text"} _name = {"symbol"}  _placeholder={"MG"} />
                <InputFormItem _title={"발행인"} _type={"text"} _name = {"publisher"}  _placeholder={"한국투자부동산신탁"} />
                
                {/* 최초 청약 이기 때문에 default 가 0 👇👇  */}
                <InputFormItem _title={"모집된 청약 수"} _type={"number"} _name = {"order_amount"}  _placeholder={"0"} />
                
                <InputFormItem _title={"주당 공모 금액"} _type={"number"} _name = {"offering_price"}  _placeholder={"5000"} />
                <InputFormItem _title={"총 발행량"} _type={"number"} _name = {"totalsupply"}  _placeholder={"500,000"} />
                <InputFormItem _title={"총 공모금액"} _type={"number"} _name = {"totalprice"}  _placeholder={"2,500,000,000"} />


                {/* <InputFormItem _title={"청약 시작일"} _type={"text"} _name = {"start_date"}  _placeholder={"2023-11-01"} /> */}

                <InputFormItem _title={"청약 시작일"} _type={"date"} _name = {"start_date"}  _placeholder={"2023-11-01"} />
                
                <InputFormItem _title={"청약 종료일"} _type={"date"} _name = {"end_date"}  _placeholder={"2023-11-11"} />
                <InputFormItem _title={"청약 발표일"} _type={"date"} _name = {"result_date"}  _placeholder={"2023-11-12"} />

                {/* 청약 입고일 = 청약 했을 때 배당 받는날 👇👇*/}
                <InputFormItem _title={"청약 입고일"} _type={"date"} _name = {"building_date"}  _placeholder={"2023-11-13"} />
                <InputFormItem _title={"거래 시작일"} _type={"date"} _name = {"trading_start_date"}  _placeholder={"2023-11-13"} />

                <InputFormItem _title={"매물 설명"} _type={"text"} _name = {"description"}  _placeholder={"매출의 15% 이상 월 배당"} />

                {/* status 는 매물 등록 시점에 기본 'pending' 으로 입력  */}
                <InputFormItem _title={"청약 상태"} _type={"text"} _name = {"status"}  _placeholder={"pending"} />
                


    </>
  )
}

export default FormSectionSubscriptionInfo