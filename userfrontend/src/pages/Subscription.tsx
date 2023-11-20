import TabBar from "../layouts/TabBar"
import SubHeader from "../contents/subscription/subHeader"
import SubBody from "../contents/subscription/subBody"
import SubEnded from "../contents/subscription/subEnded"


export default function Subscription () {


    return(
        <div className="mb-16">
            <SubHeader/>
            <SubBody />
            <SubEnded />
            <TabBar/>
        </div>
    )
}