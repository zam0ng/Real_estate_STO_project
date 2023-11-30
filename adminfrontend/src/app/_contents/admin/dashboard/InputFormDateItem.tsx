
import { InputFormDateItemProps } from "@/app/_features/admin/dashboard";
import { useState } from "react";


const InputFormDateItem:React.FC<InputFormDateItemProps> = ( {_title, _type , _placeholder, _step , setDate } ) => {


  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const dateYMDFormat = e.target.value;    // 'YYYY-MM-DD' 형식의 문자열
    const dateMillisecondsFormat = new Date(dateYMDFormat).getTime()    // 밀리초 변환
    const dateSeconds = dateMillisecondsFormat/1000    // 밀리초에서 초로 변환
    // console.log("dateSeconds" , dateSeconds)
    setDate(dateSeconds)


  }


  return (
    <>
      {/* 제목 */}
      <h2 className="mt-6 text-lg font-bold tracking-tighter w-40rem text-adminLayout_menubar_name">
        {_title}
      </h2>
      {/* input */}
      <div className="flex items-center justify-start h-12 mt-2 border-2 rounded-xl text-admin_modal_input font-semiSemibold border-admin_modal_border w-40rem">
        <input 
            className="w-full pl-3 text-sm font-medium outline-none " 
            type={_type} 
            // name={_name} /
            placeholder= {`ex) ${_placeholder}`} 
            step = {_step}
            onChange={handleInputChange}
            // value={dateYMD}
            />

      </div>

    </>
  );
};

export default InputFormDateItem;
