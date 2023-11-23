import React, { useContext, useEffect, useState } from 'react';
import { SubscriptionContext } from './layout/MySubscription';

const MySubscriptionListItemImg: React.FC = () => {
    const mySubscriptions = useContext(SubscriptionContext);

    const [imgLink,setImgLink] = useState<string>("");

    useEffect(()=>{
        if(mySubscriptions){
            setImgLink(mySubscriptions[0].subscription_img);
        }
    },[mySubscriptions]);

    return (
        <div className='w-[25%] h-full flex justify-center items-center mr-2'>
            <img className='w-20 h-20 border border-black rounded-lg' src={imgLink} />
        </div>
    )
}

export default MySubscriptionListItemImg;