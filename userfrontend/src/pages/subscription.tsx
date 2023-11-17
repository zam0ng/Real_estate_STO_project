import TabBar from "../layouts/TabBar"
import LineTypeTabComponent from "../components/tabUI/LineTypeTabComponent"
import SubHeader from "../contents/subscription/subHeader"
import SubBody from "../contents/subscription/subBody"
import SubEnded from "../contents/subscription/subEnded"


export default function Subscription () {


    return(
        <>
            <SubHeader/>
            <SubBody />
            <SubEnded />
            <TabBar/>
        </>
    )
}