

import React from 'react'
import Image from "next/image";


interface TransactionItemProps {
    imageURL : string
    estateName : string
    tradePrice : number
    createdAt : string
}
 
// tradePrice = {item.trade_price}
// createdAt = {item.createdAt} 
// imageURL


const TransactionItem:React.FC<TransactionItemProps> = ( {imageURL , estateName , tradePrice , createdAt} ) => {

    console.log("imageURL🚀" , imageURL);
    
    const path = imageURL.replace(/\\/g, '/');   // 정규표현식활용, 백슬래시를 슬래시로 교체
    const fileName = path.split('/')[2];
    const finalDomain = `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL}`
    
    const finalImageURL = `${finalDomain}/estate_img/${fileName}`;    // 이 경로로 요청하면 -> 백엔드에서 미들웨어 처리로, mapping 되어서, 사진이 저장된 곳으로 연결된다. 

    const yearMonthDay = createdAt.split('T')[0]
    const hour = createdAt.split('T')[1].split('Z')
    console.log("💪💪💪",finalImageURL );
return (
<>
    <div className="flex items-center justify-between h-14 w-30rem ">
    <div className="relative flex items-center justify-center h-11 w-11 bg-slate-200 rounded-xl grayscale-10 ">  
        {/* Image 태그의 부모 컨테이너에 relative 가 있어야 -> 부모 컨테이너가 기준이 되어서, Image 태그가 박힘  */}
        <Image
            alt="매물 사진"
            src={finalImageURL}   // next.config.js 에 기재한 경로와 맞아야 함
            sizes="100vw"
            style={{objectFit: "cover"}}	
            fill={true}
            className='rounded-lg shadow-lg'
        />
    </div>

    <div className="flex flex-col mr-28 ">
        <p className="text-lg font-semibold text-dashboard_card_transaction_title">
        {estateName}
        </p>
        <p className="text-sm font-medium text-dashboard_card_transaction_date">
        
            {yearMonthDay}-{hour}

        </p>
    </div>

    <p className="text-2xl font-medium tracking-tight text-dashboard_card_transaction_title">
        ₩ {tradePrice}
        
    </p>
    </div>
</>
)
}

export default TransactionItem