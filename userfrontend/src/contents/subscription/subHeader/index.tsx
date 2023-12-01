import { useNavigate } from "react-router-dom"


export default function SubHeader (){
    


    const Navigate = useNavigate();
    function handleMySub(){
        Navigate('/mypage')
    }

    return(
        <div >
            <div className="w-5/6  m-auto h-10 mt-6 font-semibold text-2xl ">청약</div>
            <div className=" grid grid-cols-2 mt-2  ">
                <div className="border-gray-300 border-b-4 text-center pb-1 ">청약신청</div>
                <div className="border-b-4 border-slate-200  text-center" onClick={handleMySub}>나의 청약</div>
            </div>
        </div>
    )
}