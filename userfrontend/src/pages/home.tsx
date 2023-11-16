import KakaoMap from "../components/kakaoMap"
import ProgressBar from "../components/progressBar"
import Slider from "../components/slider"
import LineTypeTabComponent from "../components/tabUI/lineTypeTabComponent"
import BoxTypeTabComponent from "../components/tabUI/boxTypeTabComponent"

export default function Home () {
    return(
        <div className="flex flex-col items-center  ">
            <Slider width="w-5/6" />
            <KakaoMap addressKor="경기도 시흥시 복지로 15" width="w-4/5" height="h-60" />
            <ProgressBar percent={30}/>
            <LineTypeTabComponent />
            <BoxTypeTabComponent />
        </div>
        
    )
}