import React from 'react';
import VoteListItemProperty from './VoteListItemProperty';
import VoteListItemName from './VoteListItemName';
import VoteListItemPeriod from './VoteListItemPeriod';
import VoteListItemProgress from './VoteListItemProgress';
import { useNavigate } from 'react-router-dom';
import { VoteListRequest } from '../../pages/VoteList';

const VoteListItem: React.FC<VoteListRequest> = ({real_estate_name,vote_title,vote_start_date,vote_end_date}) => {
    const navigation = useNavigate();

    const toVoteDetail = () => {
        navigation(`/vote-detail/${real_estate_name}/${vote_title}`);
    };

    return (
        <div className='w-full h-32 border-b border-slate-200 flex flex-row' onClick={toVoteDetail}>
            <div className='w-[80%] h-full'>
                <VoteListItemProperty real_estate_name={real_estate_name} />
                <VoteListItemName vote_title={vote_title} />
                <VoteListItemPeriod vote_start_date={vote_start_date} vote_end_date={vote_end_date} />
            </div>
            <VoteListItemProgress vote_start_date={vote_start_date} vote_end_date={vote_end_date} />
        </div>
    )
}

export default VoteListItem;