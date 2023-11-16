import React from "react"
import { useState } from "react"

const data = [
    {
        tabName : "4번",
        content : <div>4번컨텐츠</div>
    },{
        tabName : "5번",
        content : <div>5번컨텐츠</div>
    },{
        tabName : "6번",
        content : <div>6번컨텐츠</div>
    }
]

export default function LineTypeTabComponent (){

    const [tabNum,setTabNum] = useState(0);

    const tabWidth = `calc((100% / ${data.length}))`;

    const leftPosition = `calc(${tabNum} * (100% / ${data.length}))`;


    let title = data.map((item, index) => {
        // 현재 탭이 선택된 탭인지 확인하고, 적절한 텍스트 색상 클래스를 적용

        return (
            <div 
                className={` z-10 p-1 text-sm font-bold`} 
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
        <div className="w-screen m-auto">
            <div className=" relative  text-center border-b-2 h-7 mb-9 "
            style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
            >
                <div className="absolute  border-b-2 border-blue-500 h-7 indicator"
                style={{ width: tabWidth, left: leftPosition }}
                ></div>
                {title}
            </div>
            <div className="mt-3 border border-black w-9/12 m-auto h-64 rounded-xl shadow-lg">{data[tabNum].content}</div>
        </div>
    )
}