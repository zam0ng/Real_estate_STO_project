import InputFormItem from "../dashboard/InputFormItem";
import Image from "next/image";

import React from "react";
import RenderItem from "../dashboard/RenderItem";

interface RenderEstateInfoProps {
  title?: string | null;
  image?: string | null;
  desc?: string | null;
  name?: string | null;
  subscription_address?: string | null;
  floors?: string | null;
  purpose?: string | null;
  main_purpose?: string | null;
  area?: number | null;
  all_area?: number | null;
  build_area?: number | null;
  floor_area?: number | null;
  completion?: string | null;
}

const RenderEstateInfo: React.FC<RenderEstateInfoProps> = ({
  title,
  image,
  desc,
  name,
  subscription_address,
  floors,
  purpose,
  main_purpose,
  area,
  all_area,
  build_area,
  floor_area,
  completion,
}) => {
    
  const path = `${image}`.replace(/\\/g, '/');   // 정규표현식활용, 백슬래시를 슬래시로 교체
  const fileName = path.split('/')[2]

  const finalDomain = `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL}`
  const finalImageURL = `${finalDomain}/estate_img/${fileName}`;    // 이 경로로 요청하면 -> 백엔드에서 미들웨어 처리로, mapping 되어서, 사진이 저장된 곳으로 연결된다. 

  // console.log(finalImageURL , "finalImageURL🚀🚀")


  return (
    <>
      <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
        {title}
      </h1>

      <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
        <p className=""> {desc} </p>
      </div>

      {/* 제목 */}
      <h2 className="mt-2 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
        건물 이미지
      </h2>

      {/* Input 컴포넌트 */}

      <div className="relative w-24 h-24 my-auto rounded-md bg-slate-500 ">
          <Image
            alt="매물 사진"
            src={finalImageURL}   // next.config.js 에 기재한 경로와 맞아야 함
            sizes="100vw"
            style={{objectFit: "cover"}}	
            fill={true}
          />
        </div>

        
      {/* <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem"> */}
        {/* <input type="file" name="upload" placeholder= "ex) img"  multiple /> */}
        {/* <p> 
          이미지 ✅✅✅✅✅✅✅✅✅✅✅✅✅ {image} 
        </p>
      </div> */}
      
      <RenderItem title="매물명" desc={name} />
      <RenderItem title="공모자산주소" desc={subscription_address} />
      <RenderItem title="층수" desc={floors} />
      <RenderItem title="용도 지역" desc={purpose} />
      <RenderItem title="주용도" desc={main_purpose} />
      <RenderItem title="대지면적" desc={area} />
      <RenderItem title="연면적" desc={all_area} />
      <RenderItem title="건폐율" desc={build_area} />
      <RenderItem title="용적률" desc={floor_area} />
      <RenderItem title="준공일" desc={completion} />

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

export default RenderEstateInfo;
