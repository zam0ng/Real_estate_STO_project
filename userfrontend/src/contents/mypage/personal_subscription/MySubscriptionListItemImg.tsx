import React from 'react';
import { serverurl } from '../../../components/serverurl';

interface SubscriptionImgProps {
    subscription_img_1: string;
}

const MySubscriptionListItemImg: React.FC<SubscriptionImgProps> = ({subscription_img_1}) => {

    return (
        <div className='w-[25%] h-full flex justify-center items-center mr-2'>
            <img className='w-20 h-20 rounded-lg' 
                 src={`${serverurl}/estate_img/${(subscription_img_1.split("/")[2])}`} />
        </div>
    )
}

export default MySubscriptionListItemImg;