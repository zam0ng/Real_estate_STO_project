import React from "react"
import { useState } from "react"

// 렌더용 컴포넌트
// fetch 용 컴포넌트
// fetch 컴포넌트를 여기에 넣어줘서 실행시킨다


type dataType = {
        tabName : string,
        content : React.ReactNode | (()=>React.ReactNode);
}

type LineTypeTabComponentProps = {
    data: dataType[];
}

export default function LineTypeTabComponent ({data} : LineTypeTabComponentProps){

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

        return (
            <div 
                className={` z-10  text-sm font-semibold`} 
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
        <div className="w-full m-auto mt-11">
            <div className=" relative  text-center border-b-2 h-7 mb-9   "
            style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
            >
                <div className="absolute  border-b-2 border-blue-500 h-7 indicator"
                style={{ width: tabWidth, left: leftPosition }}
                ></div>
                {title}
            </div>
            <div className="mt-3   m-auto min-h-[30%] ">{renderContent()}</div>
        </div>
    )
}




