import TabBar from "../layouts/TabBar";
import HomeAds from "../contents/home/homeAds";
import HomeIndices from "../contents/home/homeIndices";
import LineTypeTabComponent from "../components/tabUI/LineTypeTabComponent";
import { useState, useEffect } from "react";


export default function Home() {

  const [isFirstRender,setIsFirstRender] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setIsFirstRender(false)
    },1000)
  },[])

    let tab = [{
      tabName : "오늘 뭐사지?",
      content : <HomeIndices />
  },{
      tabName : "공시 자료",
      content : <>공시자료 화면</>
  }]
  return (
    <div className="mb-28 animate-swipe">
      <HomeAds/>
      <LineTypeTabComponent data={tab}/>
      <TabBar />
    </div>
  );
}
