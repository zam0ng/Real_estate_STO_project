import React, { useContext } from 'react';
import { MarketDetailContext } from '../../../pages/MarketDetail';
import { useNavigate } from 'react-router-dom';

interface DocumentTypeProps {
    type: string;
}

const ToDocuments: React.FC<DocumentTypeProps> = ({type}) => {
    const data = useContext(MarketDetailContext);
    const propertyName = data?.['Subscription.subscription_name'];
    
    const navigation = useNavigate();

    const toAdditionalDetails = ()=>{
        if(type === "건물 정보"){
            navigation(`/market/detail/property-info/${propertyName}`,
            {state: {
                infoType : type, 
                propertyName: propertyName
            }});
        }else if(type === "발행 정보"){
            navigation(`/market/detail/publish-info/${propertyName}`,
            {state: {
                infoType : type, 
                propertyName: propertyName
            }});
        }else if(type === "공시자료"){
            navigation(`/market/detail/board/${propertyName}`,
            {state: {
                infoType : type, 
                propertyName: propertyName
            }});
        }
    };

    return (
        <div className='w-5/6 h-14  flex flex-row items-center text-sm' onClick={toAdditionalDetails}>
            <div className='w-[50%] h-full flex justify-start items-center pl-3'>
                {type}
            </div>
            <div className='w-[50%] h-full flex justify-end items-center pr-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M8.25 16.5L13.75 11L8.25 5.5" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
}

export default ToDocuments;