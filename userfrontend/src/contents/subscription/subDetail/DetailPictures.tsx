import { SubDetail } from "../../../features/SubDetail"
import Slider from "../../../components/Slider"


type DetailPicturesType = {
    detail : SubDetail
}

export default function DetailPictures({detail} :DetailPicturesType){

    return(
        <>
        
        <div className="relative w-screen h-1/5 ">
        <div className="absolute top-40 border border-black top w-4/5 left-9 h-40 z-20 pointer-events-none">
            <div className="border border-black h-7  font-bold">{detail.subscription_description}</div>
            <div className="border border-black h-14  text-center font-extrabold text-3xl pt-2">{detail.subscription_name}</div>
            <div className="border border-black h-14 "></div>
        </div>
        <Slider width="w-[screen]" />
        </div>
        </>
    )
}