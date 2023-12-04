import React, { useEffect, useState } from 'react';

const DarkModeTest: React.FC = () => {
    const [buttonPosition,setButtonPosition] = useState<boolean>(false);
    const [bgColor,setBgColor] = useState<string>("bg-slate-300");
    
    const [darkMode,setDarkMode] = useState<boolean>(false);

    const toggleBtn = () => {
        setButtonPosition(prev => !prev);
        setDarkMode(prev => !prev);
    };

    useEffect(()=>{
        if(darkMode){
            document.body.classList.add('dark');
            document.body.classList.add('text-white');
        }else{
            document.body.classList.remove('dark');
            document.body.classList.remove('text-white');
        }
    },[darkMode]);

    return (
        <div className='w-screen h-screen flex justify-center items-center dark:bg-yellow-200'>
            <div className='w-[50%] h-[20%] border border-black flex flex-col justify-center items-center z-50'>
                <div className={`relative z-30 w-10 h-5 rounded-full overflow-hidden`} onClick={toggleBtn}>
                    <div className={`absolute z-40 top-0 left-0 w-1/2 h-full border border-black bg-white rounded-full transform duration-500 ease-in-out ${buttonPosition ? 'translate-x-full' : ''}`}></div>
                    <div className={`absolute -z-10 top-0 -left-5 w-10 rounded-full h-full bg-blue-500 transform duration-500 ease-in-out ${buttonPosition ? 'translate-x-1/2' : ''}`}></div>
                    <div className={`absolute -z-10 top-0 right-0 w-10 rounded-full h-full bg-slate-400 transform duration-500 ease-in-out ${buttonPosition ? 'translate-x-1/2' : ''}`}></div>
                </div>
                <div className='text-black'>
                    안녕하세요. 덕스러운 덕입니다.
                </div>
            </div>
        </div>
    )
}

export default DarkModeTest;