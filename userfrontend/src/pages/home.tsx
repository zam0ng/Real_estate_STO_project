import KakaoMap from "../components/kakaoMap"
import ProgressBar from "../components/progressBar"
import Slider from "../components/slider"
import BoxTypeTabComponent from "../components/tabUI/boxTypeTabComponent"

export default function Home () {
    return(
        <div className="flex flex-col items-center  ">
            <Slider />
            {/* <KakaoMap addressKor="경기도 시흥시 복지로 15" /> */}
            {/* <ProgressBar percent={30}/> */}
            <BoxTypeTabComponent />
            {/* <Slider /> */}
        </div>
        
    )
}