"use client";

import InputFormDateItem from "./InputFormDateItem";
import InputFormItem from "./InputFormItem";

import React, { ChangeEvent, FormEvent, useState } from "react";

interface DividendsFormSectionProps {
  title: string;
  desc: string;

  selectedValue: string;
  setSelectedValue: Function;
  voteTarget: string[];
}

const FormSectionDividendsInfo: React.FC<DividendsFormSectionProps> = ({
  title,
  desc,

  selectedValue,
  setSelectedValue,
  voteTarget,
}) => {
  // const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedEstateName, setSelectedEstateName] = useState("");

  // const handleCategoryChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedCategory(e.target.value)
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEstateName(e.target.value);
  };

  const handleEstateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
      <h1 className="mt-20 text-2xl font-extrabold tracking-tighter w-40rem text-adminLayout_menubar_name">
        {title}
      </h1>

      <div className="flex items-center justify-start h-12 -mt-1 text-admin_modal_input font-semiSemibold w-40rem">
        <p className=""> {desc} </p>
      </div>

      {/* 제목 */}
      <h2 className="flex items-center mt-2 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name ">
        <span> 대상 매물 </span>
        {/* <span className='ml-2 text-base text-admin_modal_input' >(택 1)</span> */}
      </h2>

      {/* Input 컴포넌트 */}
      <div className="flex flex-col items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
        {voteTarget.map((item, index) => (
          <div key={index}>
            <label> {`매물 ${index + 1} : ${item}`} </label>
            <input
              type="radio"
              name="real_estate_name"
              value={item}
              checked={selectedValue === item} // ✅ 체크된 화면 표시
              onChange={handleEstateNameChange}
            />
          </div>
        ))}

        {/* <div>
                      <label> 매물1 : 문래 공차 (하드코딩)✅ 데이터 가져와야 함 </label>
                      <input 
                        type="radio" 
                        name="real_estate_name"  
                        value="문래 공차"
                        checked = {selectedEstateName === '문래 공차'}   // ✅ 체크된 화면 표시
                        placeholder= "img"  
                        onChange={handleChange}
                        />
                    
                  </div> */}

        {/* <div>
                      <label> 매물2 : 대전 뮤지엄 </label>
                      <input 
                        type="radio" 
                        name="real_estate_name"  
                        value="대전 뮤지엄"
                        checked = {selectedEstateName === '대전 뮤지엄'}   // ✅ 체크된 화면 표시
                        placeholder= "img"  
                        onChange={handleChange}
                        />
                  </div> */}
      </div>

      <InputFormItem
        _title={"배당금"}
        _type={"number"}
        _name={"dividend_price"}
        _placeholder={"10,000"}
      />

      <InputFormItem
        _title={"기준일"}
        _type={"date"}
        _name={"basedate"}
        _placeholder={"ex) 2023-11-29"}
      />

      <InputFormItem
        _title={"지급일"}
        _type={"date"}
        _name={"paymentdate"}
        _placeholder={"ex) 2023-12-1"}
      />
    </>
  );
};

export default FormSectionDividendsInfo;
