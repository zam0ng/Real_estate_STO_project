import React from 'react';
import BottomTabs from './BuySellTabs';

const Buttons: React.FC = () => {
    const tabs = [
        {id: "tab1", title: "구매", content: <div>구매 컴포넌트</div>},
        {id: "tab2", title: "판매", content: <div>판매 컴포넌트</div>}
    ]

    return (
        <div className='w-full h-10 border-t rounded-t-xl border-black flex justify-center items-center'>
            <BottomTabs tabs={tabs} />
        </div>
    )
}

export default Buttons;