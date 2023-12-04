import InputFormItem from "@/app/_contents/admin/dashboard/InputFormItem"
import { FormEvent, useState } from "react";


const GetInputData = () => {

  // const [uploadFile, setUploadFile] = useState<File | null>(null);

  // const saveUploadFile = (e: FormEvent<HTMLInputElement>) => {
  //   const input = e.target as HTMLInputElement;

  //   if (input.files) {
  //     // console.log("파일 저장 @GetInputData 컴포넌트", input.files[0]);
  //     setUploadFile(input.files[0]);
  //   }
  // };


  return (
    <>
            {/* item container */}
            <div className="">
              
              <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
                건물 정보
              </h1>
              
              {/* 설명 */}
                <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
                    <p className="" >건물 정보 : 청약 등록시 필요한 건물정보  </p>
                </div>

                {/* 제목 */}
                <h2 className="mt-2 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
                  건물 이미지
                </h2>
                
                {/* input */}
                <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
                  {/* <input type="file" name="upload" placeholder= "ex) img" onChange={saveUploadFile} multiple /> */}
                  <input type="file" name="upload" placeholder= "ex) img"  multiple />
                </div>

                {/* 건물 정보 */}
                <InputFormItem _title={"공모자산 이름"} _type={"text"} _name = {"name"}  _placeholder={"문래공차"} />
                <InputFormItem _title={"매물 설명"} _type={"text"} _name = {"description"}  _placeholder={"매출의 15% 이상 월 배당"} />
                <InputFormItem _title={"공모자산 주소"} _type={"text"} _name = {"address"}  _placeholder={"서울 영등포구 선유로 76"} />
                <InputFormItem _title={"층수"} _type={"text"} _name = {"floors"}  _placeholder={"4층"} />
                <InputFormItem _title={"용도 지역"} _type={"text"} _name = {"purpose"}  _placeholder={"준공업지역"} />
                <InputFormItem _title={"주용도"} _type={"text"} _name = {"mainpurpose"}  _placeholder={"근린생활시설"} />
                <InputFormItem _title={"대지면적"} _type={"number"} _name = {"area"}  _placeholder={"333.2"} _step='0.1' />
                <InputFormItem _title={"연면적"} _type={"number"} _name = {"all_area"}  _placeholder={"999.5"} _step='0.1'/>
                <InputFormItem _title={"건폐율"} _type={"number"} _name = {"build_area"}  _placeholder={"70.1"} _step='0.1'/>
                <InputFormItem _title={"용적률"} _type={"number"} _name = {"floor_area"}  _placeholder={"265.1"} _step='0.1'/>
                <InputFormItem _title={"준공일"} _type={"text"} _name = {"completion"}  _placeholder={"2005-07-26"} />



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
                <InputFormItem _title={"발행인"} _type={"text"} _name = {"publisher"}  _placeholder={"한국투자부동산신탁"} />
                {/* 최초 청약 이기 때문에 default 가 0 👇👇  */}
                <InputFormItem _title={"모집된 청약 수"} _type={"number"} _name = {"order_amount"}  _placeholder={"0"} />
                <InputFormItem _title={"주당 공모 금액"} _type={"number"} _name = {"offering_price"}  _placeholder={"5000원"} />
                <InputFormItem _title={"총 공모금액"} _type={"number"} _name = {"totalprice "}  _placeholder={"2,500,000,000원"} />
                <InputFormItem _title={"총 발행량"} _type={"number"} _name = {"totalsupply"}  _placeholder={"500,000주"} />
                <InputFormItem _title={"청약 시작일"} _type={"text"} _name = {"start_date"}  _placeholder={"2023-11-01"} />
                <InputFormItem _title={"청약 종료일"} _type={"text"} _name = {"end_date"}  _placeholder={"2023-11-11"} />
                <InputFormItem _title={"청약 발표일"} _type={"text"} _name = {"result_date"}  _placeholder={"2023-11-12"} />

                {/* 청약 입고일 = 청약 했을 때 배당 받는날 👇👇*/}
                <InputFormItem _title={"청약 입고일"} _type={"text"} _name = {"building_date"}  _placeholder={"2023-11-13"} />
                <InputFormItem _title={"거래 시작날"} _type={"text"} _name = {"trading_start_date"}  _placeholder={"2023-11-13"} />

                {/* status 는 매물 등록 시점에 기본 'pending' 으로 입력  */}
                <InputFormItem _title={"청약 상태"} _type={"text"} _name = {"status"}  _placeholder={"pending"} />
                
            </div>

    </>
  )
}

export default GetInputData