import KakaoMap from "../components/kakaoMap"
import ProgressBar from "../components/progressBar"

export default function Home () {
    return(
        <div className="flex flex-col items-center  ">
            <KakaoMap addressKor ="경기도 시흥시 복지로 15 " />
            <ProgressBar percent={30}/>
        </div>
        
    )
}