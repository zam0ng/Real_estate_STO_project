

import InputFormItem from './InputFormItem'

import React from 'react'

interface FormSectionProps {
    title : string 
    desc : string
}

const FormSectionEstateInfo : React.FC<FormSectionProps> = ( {title, desc} ) => {
  return (
    <>
              <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
                {title}
              </h1>
              
                <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
                    <p className="" > {desc}  </p>
                </div>

                {/* 제목 */}
                <h2 className="flex items-center mt-2 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name ">
                  <span>건물 이미지</span> 
                  <span className='ml-2 text-base text-admin_modal_input' >(최대 5장)</span>
                </h2>
                
                {/* Input 컴포넌트 */}
                <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
                  <input type="file" name="upload" placeholder= "ex) img" multiple />
                </div>

                {/* 건물 정보 */}
                <InputFormItem _title={"공모자산 이름"} _type={"text"} _name = {"name"}  _placeholder={"문래공차"} />
                <InputFormItem _title={"공모자산 주소"} _type={"text"} _name = {"address"}  _placeholder={"서울 영등포구 선유로 76"} />
                <InputFormItem _title={"층수"} _type={"text"} _name = {"floors"}  _placeholder={"7층"} />
                <InputFormItem _title={"용도 지역"} _type={"text"} _name = {"purpose"}  _placeholder={"준공업지역"} />
                <InputFormItem _title={"주용도"} _type={"text"} _name = {"mainpurpose"}  _placeholder={"근린생활시설"} />
                <InputFormItem _title={"대지면적"} _type={"number"} _name = {"area"}  _placeholder={"333.2"} _step='0.1' />
                <InputFormItem _title={"연면적"} _type={"number"} _name = {"all_area"}  _placeholder={"999.5"} _step='0.1'/>
                <InputFormItem _title={"건폐율"} _type={"number"} _name = {"build_area"}  _placeholder={"70.1"} _step='0.1'/>
                <InputFormItem _title={"용적률"} _type={"number"} _name = {"floor_area"}  _placeholder={"265.1"} _step='0.1'/>
                <InputFormItem _title={"준공일"} _type={"date"} _name = {"completion"}  _placeholder={"2005-07-26"} />


    </>
  )
}

export default FormSectionEstateInfo