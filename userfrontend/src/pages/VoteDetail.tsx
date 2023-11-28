import React from 'react';
import VoteDetailHeader from '../contents/vote_detail/layout/VoteDetailHeader';
import VoteDetailBody from '../contents/vote_detail/layout/VoteDetailBody';

const VoteDetail: React.FC = () => {
    return (
        <div className='w-screen h-screen'>
            <VoteDetailHeader />
            <div className='w-full h-[90%] overflow-y-scroll pl-2 pr-2'>
                <VoteDetailBody />
            </div>
        </div>
    )
}

export default VoteDetail;