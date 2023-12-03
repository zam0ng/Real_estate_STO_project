import React, { FC } from 'react'

interface StatusComponentProps {
    text : string
    bgColor? : string
    textColor? : string
}


const CircleSmallComponent:FC<StatusComponentProps> = ({text  , bgColor, textColor}) => {
  

      // const handleStatusBtn = (staus : boolean) => {
    //   if()
    //   alert("blacklist등록")
    // }



  const divClaasName = `flex items-center justify-center w-24 h-8 ${bgColor} rounded-2xl`
    const pClaasName = `text-sm font-medium ${textColor}`

  return (
    <>
        <div className = {divClaasName} >
          <p className = {pClaasName}>{text}</p>
        </div>

    </>
  )
}

export default CircleSmallComponent