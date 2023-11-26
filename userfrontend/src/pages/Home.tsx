import TabBar from "../layouts/TabBar";
import HomeAds from "../contents/home/homeAds";
import HomeIndices from "../contents/home/homeIndices";
import LineTypeTabComponent from "../components/tabUI/LineTypeTabComponent";


export default function Home() {
    let tab = [{
      tabName : "오늘 뭐사지?",
      content : <HomeIndices />
  },{
      tabName : "공시 자료",
      content : <>공시자료 화면</>
  }]
  return (
    <>
      <HomeAds/>
      <LineTypeTabComponent data={tab}/>
      <TabBar />
    </>
  );
}
