import React from "react"

const data = [
    {
        tabName : "1번",
        content : <div>1번컨텐츠</div>
    },{
        tabName : "2번",
        content : <div>2번컨텐츠</div>
    },{
        tabName : "3번",
        content : <div>3번컨텐츠</div>
    }
]

export default function BoxTypeTabComponent (){

    let title = data.map(({tabName})=>{
        return <div className= "border border-black" >{tabName}</div>
    })

    return(
        <div className={`border border-black w-4/5 text-center` }
        style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
        >
            {title}
        </div>
    )
}