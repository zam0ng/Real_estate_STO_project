import React, { useEffect, useRef } from 'react';

const ScrollTest: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(scrollRef.current){
            const element = scrollRef.current;
            const totalHeight = element.scrollHeight;
            console.log(totalHeight);
            const initialScrollPosition = 32;
            element.scrollTop = initialScrollPosition;
        }
    },[])
    
  return (
    <div className='w-screen h-screen'>
        <div className='w-[80%] h-[80%] border border-black overflow-y-scroll' ref={scrollRef}>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-blue-400 border border-blue-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
            <div className='w-full h-8 bg-red-400 border border-red-500'></div>
        </div>
    </div>
  )
}

export default ScrollTest;