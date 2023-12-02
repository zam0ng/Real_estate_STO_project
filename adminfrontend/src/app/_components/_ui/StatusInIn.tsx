import React, { FC } from 'react'

interface StatusComponentProps {
    text : string
    bgColor? : string
    textColor? : string
}


const StatusInIn = () => {
  


  return (
    <>

        <div className='flex items-center justify-center w-24 h-8 rounded-xl'>

        <div className='flex items-center justify-center rounded-full w-9 h-9 bg-state_green_back '> 
              <p className='text-xs font-normal text-state_green_text ' >내부</p> 
          </div>
          
          <div className='mx-1 text-sm text-stone-300' > ↔ </div>
          
          <div className='flex items-center justify-center rounded-full w-9 h-9 bg-state_green_back '> 
              <p className='text-xs font-normal text-state_green_text ' >내부</p> 
          </div>
        
        </div>

    </>
  )
}

export default StatusInIn