import React from "react"

const data = [
    {
        tabName : "1번",
        content : <div>1번컨텐츠</div>
    },{
        tabName : "2번",
        content : <div>2번컨텐츠</div>
    }
]

export default function BoxTypeUI (){
    return(
        <div className="grid-cols-3">
            <div>d</div>
            <div>dd</div>
            <div>ddd</div>
        </div>
    )
}