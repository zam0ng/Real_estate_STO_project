import React from "react"
import { useState } from "react"

type dataType ={
    tabName : string,
    content : React.ReactNode | (()=>React.ReactNode);
}

type BoxTypeComponentProps = {
    data : dataType[];
}



export default function BoxTypeTabComponent ({data} : BoxTypeComponentProps){

    const [tabNum,setTabNum] = useState(0);

    const tabWidth = `calc((100% / ${data.length}))`;

    const leftPosition = `calc(${tabNum} * (100% / ${data.length}))`;

    const renderContent = ()=>{
        const currentContent = data[tabNum].content;
        if(typeof currentContent === 'function'){
            return currentContent();
        }
        return currentContent;
    }


    let title = data.map((item, index) => {
        // 현재 탭이 선택된 탭인지 확인하고, 적절한 텍스트 색상 클래스를 적용
        const textColorClass = index === tabNum ? "text-white" : "text-black";

        return (
            <div 
                className={`shadow-900/20 z-10 p-1 text-sm font-bold ${textColorClass}`} 
                data-index={index} 
                onClick={() => setTabNum(index)} 
                key={index}
            >
                {item.tabName}
            </div>
        );
    });

    function handleTabNumer(e : React.MouseEvent<HTMLElement>){
        const indexNum = e.currentTarget.dataset.index
        if(indexNum != undefined){
            let newIndexNum=parseInt(indexNum,10)
            setTabNum(newIndexNum)
        }
    }

    return(
        <div className=" ">
            <div className="bg-[#EDF0F4] rounded-lg shadow-neu2  relative w-5/6 text-center h-7 mt-3 m-auto  "
            style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
            >
                <div className="absolute  bg-blue-500 shadow-md rounded-md h-7 indicator"
                style={{ width: tabWidth, left: leftPosition }}
                ></div>
                {title}
            </div>
            <div className="mt-3 border= w-5/6  bg-[#EDF0F4] rounded-xl shadow-innerneu2 m-auto min-h-[30%]">{renderContent()}</div>
        </div>
    )
}