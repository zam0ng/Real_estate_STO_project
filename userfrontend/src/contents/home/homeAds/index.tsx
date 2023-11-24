import WalletConnect from "./WalletConnect";
import SubscriptionAd from "./SubscriptionAd";
import LineTypeTabComponent from "../../../components/tabUI/LineTypeTabComponent";
import HomeIndices from "../homeIndices";


export default function HomeAds(){

    let tab = [{
        tabName : "오늘 뭐사지?",
        content : <HomeIndices />
    },{
        tabName : "공시 자료",
        content : <>공시자료 화면</>
    }]
    
    return(
        <div className="mb-16">
            <WalletConnect />
            <SubscriptionAd />
            <LineTypeTabComponent data={tab}/>
        </div>
    )

}