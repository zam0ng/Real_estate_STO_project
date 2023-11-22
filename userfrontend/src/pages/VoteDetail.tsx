import React from 'react';
import VoteDetailHeader from '../contents/vote_detail/layout/VoteDetailHeader';
import VoteDetailBody from '../contents/vote_detail/layout/VoteDetailBody';

const VoteDetail: React.FC = () => {
    return (
        <div className='w-screen h-screen'>
            <VoteDetailHeader />
            <VoteDetailBody />
        </div>
    )
}

export default VoteDetail;