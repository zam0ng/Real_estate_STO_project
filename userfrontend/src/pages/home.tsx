import KakaoMap from "../components/kakaoMap"
import ProgressBar from "../components/progressBar"
import Slider from "../components/slider"
import LineTypeTabComponent from "../components/tabUI/lineTypeTabComponent"
import BoxTypeTabComponent from "../components/tabUI/boxTypeTabComponent"
import TabBar from "../layouts/tabBar"

export default function Home () {
    return(
        <>
            <div className="flex flex-col items-center h-auto">
                <Slider />
                <LineTypeTabComponent data={
                    [
                        {
                            tabName : "4번",
                            content : <div>1번컨텐츠</div>
                        },{
                            tabName : "5번",
                            content : <div>5번컨텐츠</div>
                        },{
                            tabName : "6번",
                            content : <div>6번컨텐츠</div>
                        }
                    ]
                }/>
                <BoxTypeTabComponent data={                    [
                        {
                            tabName : "4번",
                            content : <div>테스트입니다</div>
                        },{
                            tabName : "5번",
                            content : <div>5번컨텐츠</div>
                        },{
                            tabName : "6번",
                            content : <div>6번컨텐츠</div>
                        }
                    ]} />
                <KakaoMap addressKor="경기도 시흥시 복지로 15" />
                <ProgressBar percent={30}/>
            </div>
            <TabBar />
        </>
        
    )
}