import TabBar from "../layouts/tabBar"
import LineTypeTabComponent from "../components/tabUI/lineTypeTabComponent"




export default function Subscription () {


    return(
        <>
            <div className="w-screen m-auto box-border">
                <div className="w-5/6  m-auto h-10 mt-6 font-semibold text-2xl ">청약</div>
                <div className=" grid grid-cols-2 mt-5  ">
                    <div className="border-blue-500 border-b-4 text-center pb-1">청약신청</div>
                    <div className="border-b-4"></div>
                </div>
                <div className="w-5/6 m-auto border border-black h-32 mt-9">
                    <div className="w-full border border-gray-300 text-xl font-semibold">진행중인 청약 0</div>
                </div>

            </div>
            <TabBar/>
        </>
    )
}