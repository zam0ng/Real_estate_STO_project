"use client"
import React, { useState } from "react";

const CriteriaToggle = () => {

  const options = ["day" , "week" , "month"]
  const [selectedOption, setSelectedOption ] = useState(options[0])
  console.log("selectedOption", selectedOption )

  const testDiv = () => {
    console.log("된다🚀🚀🚀🚀🚀🚀🚀🚀🚀")
  }


  return (
    <>
    <select
      className="border border-gray-300 border-solid rounded-md shadow-sm outline-none focus:ring" 
        /* outline-none : 테두리 같은 검은색 없어지게 함 

        */
      value={selectedOption} 
      onChange={e => setSelectedOption(e.target.value)}>
        {options.map( (item) => (
          <option 
            className="border border-blue-300 shadow-sm outline-none"
            key={item} 
            value={item} > {item} </option>
        ) )}    
    </select>



    <div className="w-10 h-10 bg-blue-300" onClick={testDiv}>
        hello
    </div>
    
    </>
  )
};

export default CriteriaToggle;





