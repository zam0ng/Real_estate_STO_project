import React from 'react';
import VoteListItemTitle from './VoteListItemTitle';
import VoteListItemName from './VoteListItemName';
import VoteListItemPeriod from './VoteListItemPeriod';
import VoteListItemProgress from './VoteListItemProgress';
import { useNavigate } from 'react-router-dom';

const VoteListItem: React.FC = () => {
    const navigation = useNavigate();

    const toVoteDetail = () => {
        navigation(`/vote-detail/${"문래 공차"}/${"매각 투표"}`)
    };

    return (
        <div className='w-full h-32 border-b border-slate-200 flex flex-row' onClick={toVoteDetail}>
            <div className='w-[80%] h-full'>
                <VoteListItemTitle />
                <VoteListItemName />
                <VoteListItemPeriod />
            </div>
            <VoteListItemProgress />
        </div>
    )
}

export default VoteListItem;