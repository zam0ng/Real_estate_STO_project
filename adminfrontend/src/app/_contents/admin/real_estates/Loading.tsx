import React from 'react'
const Loading = () => {
  return (
    // <div className='absolute top-48 left-96 z-50 flex items-center justify-center my-8 w-40rem mx-7 h-37.9rem bg-state_pending_back'>💪💪💪💪</div>
    // <div className='absolute top-48 left-120 z-50 flex items-center justify-center my-8 w-76rem mx-7 h-37.9rem bg-state_loading_back'>
    <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-full  h-full bg-state_black_opacity_4'>

        <img src="/loading.gif" alt="" />
    </div>
  )
}

export default Loading