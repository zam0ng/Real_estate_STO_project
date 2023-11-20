import React from 'react';
import {useNavigate} from "react-router-dom";

type TabBarType = {
    imgName: string;
    btnName: string;
    urlName : string;
};

function TabButtons({ imgName, btnName, urlName }: TabBarType) {
    const Navigate = useNavigate();

    function handleTabBtns(urlName : string){
        Navigate(`/${urlName}`);
    }
    
    return (
        <div className="w-1/5 text-center text-xxs flex-col" onClick={()=>handleTabBtns(urlName)}>
            <img className='block m-auto h-6 pt-1 ' alt={btnName} src={process.env.PUBLIC_URL + `/images/tabBar/${imgName}.png`} />
            <div className="text-center text-xs ">{btnName}</div>
        </div>
    );
}

function TabBar() {
    return(    
        <div className="flex flex-nowrap fixed bottom-0 w-full h-12 xs:flex bg-white pt-1 z-10 shadow-inner ">
            <TabButtons imgName="home" btnName="홈" urlName='home'/>
            <TabButtons imgName="buy" btnName="청약" urlName='subscription'/>
            <TabButtons imgName="cart" btnName="마켓" urlName='market'/>
            <TabButtons imgName="user" btnName="My" urlName='mypage'/>
            <TabButtons imgName="more" btnName="더보기" urlName='more'/>
        </div>
    )
}

export default TabBar;
