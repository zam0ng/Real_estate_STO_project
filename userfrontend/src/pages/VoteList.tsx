import React from 'react';
import VoteListHeader from '../contents/vote_list/layout/VoteListHeader';
import VoteListItemBox from '../contents/vote_list/layout/VoteListItemBox';

const VoteList: React.FC = () => {
    return (
        <div className='w-screen h-screen border border-black'>
            <VoteListHeader />
            <VoteListItemBox />
        </div>
    )
}

export default VoteList;