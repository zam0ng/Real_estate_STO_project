import BoxTypeTabComponent from "../../../components/tabUI/BoxTypeTabComponent";
import SubEndedList from "./SubEndedList";


type dataType ={
    tabName : string,
    content : React.ReactNode | (()=>React.ReactNode);
}

export default function SubEnded(){

    let subList = [{
        tabName : "모든 청약",
        content : (()=><SubEndedList props={"all"}/>) 
    },{
        tabName : "청약 완료",
        content : (()=><SubEndedList props={"success"}/>) 
    },{
        tabName : "청약 미달",
        content : (()=><SubEndedList props={"failure"}/>)
    }

    ]
    return(
        <div className=" mt-10 min-h-[50vh]">
            <BoxTypeTabComponent data={subList}/>
        </div>
    )
}