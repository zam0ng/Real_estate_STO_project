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

    const path = `/admin/dashboard?criteria=${option}`;
    const domain = process.env.NEXT_PUBLIC_LOCAL_CLIENT || process.env.NEXT_PUBLIC_PRODDUCTION_CLIENT;
    const url = `${domain}${path}`
    router.replace(`${url}`);
    
    // router.replace(`http://localhost:3000`);   // 새로고침 하는 효과는 없음.     
    // router.replace(`http://localhost:3000/admin/dashboard?criteria=${option}`);   // 새로고침 하는 효과는 없음.     
    
  }



  return (
    <>
    <select
      className="rounded-md shadow-sm outline-none border-admin_content_bg bg-admin_content_bg focus:ring" 
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
