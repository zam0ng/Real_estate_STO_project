import React, { useState } from 'react';

const DarkModeTest: React.FC = () => {
    const [buttonPosition,setButtonPosition] = useState<boolean>(false);
    const [bgColor,setBgColor] = useState<string>("bg-slate-300");
    const [blueIdx,setBlueIdx] = useState<string>("z-20");
    const [grayIdx,setGrayIdx] = useState<string>("z-10");

    const toggleBtn = () => {
        setButtonPosition(prev => !prev);
        if(bgColor === "bg-slate-300"){
            setBgColor("bg-blue-400");
        }else{
            setBgColor("bg-slate-300");
        }
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-[10%] h-[10%] border border-black flex justify-center items-center'>
                <div className={`relative z-30 w-10 h-5 border border-slate-300 rounded-full ${bgColor}`} onClick={toggleBtn}>
                    <div className={`absolute z-40 top-0 left-0 w-1/2 h-full border border-black bg-white rounded-full transform duration-500 ease-in-out ${buttonPosition ? 'translate-x-full' : ''}`}></div>
                    <div className={`absolute top-0 -left-7 w-10 h-full bg-blue-400 transform duration-500 ease-in-out ${buttonPosition ? 'translate-x-1/2' : ''}`}></div>
                    <div className={`absolute top-0 right-0 w-10 h-full bg-slate-400 transform duration-500 ease-in-out ${buttonPosition ? 'translate-x-1/2' : ''}`}></div>
                </div>
            </div>
        </div>
    )
}

export default DarkModeTest;