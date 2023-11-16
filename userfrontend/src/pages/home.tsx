import KakaoMap from "../components/KakaoMap"
import ProgressBar from "../components/ProgressBar"
import Slider from "../components/Slider"
import LineTypeTabComponent from "../components/tabUI/LineTypeTabComponent"
import BoxTypeTabComponent from "../components/tabUI/BoxTypeTabComponent"
import TabBar from "../layouts/TabBar"

export default function Home () {
    return(
        <>
            <div>홈 화면</div>
            <div> 17일 금요일 작업예정</div>
            <TabBar />
        </>
        
    )
}