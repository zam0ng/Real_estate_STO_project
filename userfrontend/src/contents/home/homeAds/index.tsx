import WalletConnect from "./WalletConnect";
import SubscriptionAd from "./SubscriptionAd";
import LineTypeTabComponent from "../../../components/tabUI/LineTypeTabComponent";
import HomeIndices from "../homeIndices";


export default function HomeAds(){


    
    return(
        <div className="mb-16">
            <WalletConnect />
            <SubscriptionAd />
        </div>
    )

}