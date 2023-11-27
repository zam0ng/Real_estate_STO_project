import BoxTypeTabComponent from "../../../components/tabUI/BoxTypeTabComponent"

export default function HomeChart(){

    //content :  (()=><SubEndedList props={"all"}/>) 

    let homeRank = [{
        tabName : "거래량",
        content : <>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
            <div>d</div>
        </> 
    },{
        tabName : "급상승",
        content : <>급상승입니다</>
    },{
        tabName : "급하락",
        content : <>급하락입니다</>
    },{
        tabName : "배당",
        content : <>배당순위입니다</>
    }

    ]

    return(
        <BoxTypeTabComponent data={homeRank} />
    )
}