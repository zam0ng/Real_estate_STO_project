import React, { FC } from 'react'

interface StatusComponentProps {
    text : string
    bgColor? : string
    textColor? : string
}


const StatusComponent:FC<StatusComponentProps> = ({text  , bgColor, textColor}) => {
  

      // const handleStatusBtn = (staus : boolean) => {
    //   if()
    //   alert("blacklist등록")
    // }



  // const divClaasName = `flex items-center justify-center w-24 h-8 ${bgColor} rounded-2xl`
  //   const pClaasName = `text-sm font-medium ${textColor}`
    
    const divClaasName = `flex items-center justify-center w-24 h-8 ${bgColor} rounded-2xl`
      const pClaasName = `text-sm font-medium ${textColor}`
    
  

  return (
    <>
        {/* <div className = {divClaasName} >
          <p className = {pClaasName}>{text}</p>
        </div> */}

        {/* <div className='flex items-center justify-center w-24 h-8 rounded-xl'>
          <div className='flex items-center justify-center rounded-full w-9 h-9 bg-state_green_back '> <p className='text-xs font-normal text-state_green_text ' >내부</p> </div>
          <div className='mx-1 text-sm text-stone-300' > → </div>
          <div className='flex items-center justify-center rounded-full w-9 h-9 bg-state_pending_back'> <p className='text-xs font-normal text-state_pending_text '>외부</p>  </div>
        </div> */}

        {/* keep ⭐🚀 */}
        <div className = {divClaasName} >
          <p className = {pClaasName}>{text}</p>
        </div>
    </>
  )
}

export default StatusComponent