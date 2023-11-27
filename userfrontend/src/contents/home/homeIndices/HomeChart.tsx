import BoxTypeTabComponent from "../../../components/tabUI/BoxTypeTabComponent"
import HomeSoaring from "./HomeSoaring"
import HomeFalling from "./HomeFalling"
import HomeSearch from "./HomeSearch"
import HomeVolume from "./HomeVolume"
import HomeDividend from "./HomeDividend"




export default function HomeChart(){

    //content :  (()=><SubEndedList props={"all"}/>) 

    let homeRank = [{
        tabName : "거래량",
        content : <HomeVolume />
    },{
        tabName : "급상승",
        content : <HomeSoaring />
    },{
        tabName : "급하락",
        content : <HomeFalling />
    },{
        tabName : "배당",
        content : <HomeDividend />
    }

    ]

    return(
        <BoxTypeTabComponent data={homeRank} />
    )
}