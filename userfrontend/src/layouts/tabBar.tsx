import React from 'react';

export default function TabBar() {


    return(    
    <div>
        <div className="border-1 border-black mx-0 flex flex-nowrap absolute bottom-0 w-full h-12 ">
            <div className="w-1/5 border border-black text-center text-xxs flex-col">
                <img src={process.env.PUBLIC_URL + './images/tabBar/home.png' }></img>
                <div className="border border-black text-center text-xxs">홈</div>
            </div>
            <div className="w-1/5 border border-black text-center text-xxs">청약</div>
            <div className="w-1/5 border border-black text-center text-xxs">마켓</div>
            <div className="w-1/5 border border-black text-center text-xxs">MY</div>
            <div className="w-1/5 border border-black text-center text-xxs">더보기</div>
        </div>
    </div>
    )
} 
