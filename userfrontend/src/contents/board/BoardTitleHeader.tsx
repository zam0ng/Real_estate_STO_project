import React from 'react';
import { useLocation } from 'react-router-dom';

const BoardTitleHeader: React.FC = () => {
    const currentPage = useLocation();
    const title = currentPage.state.infoType;

    return (
        <div className='w-full h-[10%] flex justify-start items-end text-2xl pl-7 pb-3'>
            {title}
        </div>
    )
}

export default BoardTitleHeader;