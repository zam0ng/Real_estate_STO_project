import React, { useContext } from 'react';
import { MarketDetailContext } from '../../../pages/MarketDetail';

const PropertyAddress: React.FC = () => {
    const data = useContext(MarketDetailContext);

    return (
        <div className='w-full h-6 flex justify-start items-center text-xs-sm ml-10'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                <path d="M12.8 6.86874C12.8 10.8283 8 14.2223 8 14.2223C8 14.2223 3.2 10.8283 3.2 6.86874C3.2 5.51855 3.70571 4.22366 4.60588 3.26892C5.50606 2.31419 6.72696 1.77783 8 1.77783C9.27304 1.77783 10.4939 2.31419 11.3941 3.26892C12.2943 4.22366 12.8 5.51855 12.8 6.86874Z" fill="#D6D6D6"/>
                <path d="M7.99999 8.88881C8.88365 8.88881 9.59999 8.09287 9.59999 7.11103C9.59999 6.12919 8.88365 5.33325 7.99999 5.33325C7.11634 5.33325 6.39999 6.12919 6.39999 7.11103C6.39999 8.09287 7.11634 8.88881 7.99999 8.88881Z" fill="white"/>
            </svg>
            <div className='w-[50%] h-full flex items-center justify-start text-xs'>
                {data?.['Subscription.subscription_address']}
            </div>
        </div>
    )
}

export default PropertyAddress;