import { useNavigate } from "react-router-dom"

type subdetailtype = {
    props : string | undefined
}

export default function SubscriptionBtn({props} : subdetailtype){

    const Navigate = useNavigate();

    function handleSubscription(){
        Navigate('/bounslogin', {state : `/subscription/detail/${props}`})
    }


    return(
        <div className=" w-5/6 h-12 rounded-md bg-blue-950 text-white m-auto flex justify-center items-center font-semibold my-4"
            onClick={()=>handleSubscription()}
        >
            청약하기
        </div>
    )
}