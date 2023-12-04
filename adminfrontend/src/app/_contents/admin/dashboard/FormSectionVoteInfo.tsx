'use client'

import InputFormDateItem from './InputFormDateItem'
import InputFormItem from './InputFormItem'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import InputFormItemTitle from './InputFormItemTitle';

interface VoteableEstate {
  id: number;
  address: string;
  real_estate_name: string;
  cy_type: string;
  symbol: string;
}

interface VoteFormSectionProps {
    title : string 
    desc : string
    setStartDate : Function
    setEndDate : Function
    
    selectedValue : string
    setSelectedValue : Function
    voteTarget : string[]
}


const FormSectionVoteInfo : React.FC<VoteFormSectionProps> = ( {
    title, 
    desc , 
    setStartDate , 
    setEndDate,
    
    selectedValue,
    setSelectedValue,
    voteTarget,
  }) => {
  
  const [selectedCategory, setSelectedCategory] = useState("") 
  const [selectedEstateName, setSelectedEstateName] = useState("") 

  const handleCategoryChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value)
  }
  
  const handleEstateNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value)
  }

  // useEffect(() => {
  //   console.log("Updated voteTarget", voteTarget);
  // }, [voteTarget]);
  
  // console.log("votetarget")
  // console.log(voteTarget)

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
                  <span> 대상 매물 </span> 
                  {/* <span className='ml-2 text-base text-admin_modal_input' >(택 1)</span> */}
                </h2>
                
                  <div className="flex flex-col items-center justify-start mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
                    
              

                    {voteTarget.map( (item, index) => (
                      <div key={index}>
                          <label> {  `매물 ${index + 1} : ${item}`}   </label>
                          <input 
                            type="radio" 
                            name="real_estate_name"  
                            value={item}
                            checked = {selectedValue === item}   // ✅ 체크된 화면 표시  
                            onChange={handleEstateNameChange}
                            />
                      </div>
                    )
                      )}
                    
                  </div>

                <InputFormItem
                    _title={"투표 주제"} 
                    _type={"text"} 
                    _name = {"notice_title"}  
                    _placeholder={"매각 여부 결정 투표"} />
                

                <InputFormDateItem 
                    _title={"시작 일시"} 
                    _type={"date"} 
                    _placeholder={"2023-11-28"}
                    setDate={setStartDate}
                    _step='1'
                    />

                <InputFormDateItem 
                    _title={"종료 일시"} 
                    _type={"date"} 
                    _placeholder={"2023-12-10"}
                    setDate={setEndDate}
                    _step='1'
                    />

                {/* 공지 정보 */}
                {/* <InputFormItem 
                    _title={"작성자"} 
                    _type={"text"} 
                    _name = {"notice_writer"}  
                    _placeholder={"admin"} /> */}
    </>
  )
}

export default FormSectionVoteInfo