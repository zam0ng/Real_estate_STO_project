import React from 'react';
import VoteListItemBox from '../contents/vote_list/layout/VoteListItemBox';
import TabBar from '../layouts/TabBar';
import VoteListHeader from '../contents/vote_list/layout/VoteListHeader';

const VoteList: React.FC = () => {
    return (
        <div className='w-screen h-screen pb-12'>
            <div className='w-full h-full overflow-y-scroll pr-2 pl-2'>
                <VoteListItemBox />
            </div>
            <TabBar />
        </div>
    )
}

export default VoteList;