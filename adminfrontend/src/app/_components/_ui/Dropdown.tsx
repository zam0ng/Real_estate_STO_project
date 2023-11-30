"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const Dropdown = () => {
  const router = useRouter();
  const options = ["day" , "week" , "month"]
  const [selectedOption, setSelectedOption ] = useState(options[0])
  // console.log("selectedOption", selectedOption )
  
  const setOptionParams = (option : string) => {
    
    setSelectedOption(option)
    router.refresh();
    router.replace(`http://localhost:3000/admin/dashboard?criteria=${option}`);   // 새로고침 하는 효과는 없음.     

  }



  return (
    <>
    <select
      className="border border-gray-300 border-solid rounded-md shadow-sm outline-none focus:ring" 
        /* outline-none : 테두리 같은 검은색 없어지게 함 

        */
      value={selectedOption} 
      onChange={e => setOptionParams(e.target.value)}>
        {options.map( (item) => (
          <option 
            className="border border-blue-300 shadow-sm outline-none"
            key={item} 
            value={item} > {item} </option>
        ) )}    
    </select>
    
    </>
  )
};

export default Dropdown;
