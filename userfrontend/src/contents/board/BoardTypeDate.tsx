import React from 'react';

interface BoardTypeDateProps {
    createdAt: string;
    category: string;
}

const BoardTypeDate: React.FC<BoardTypeDateProps> = ({createdAt,category}) => {
    const justDate = createdAt.slice(0,10);
    return (
        <div className='w-full h-2/5 text-xs-sm flex items-center'>
            <div>{justDate}</div>
            <div className='h-1/2 border-r-2 border-slate-300 ml-2 mr-2'></div>
            <div>{category}</div>
        </div>
    )
}

export default BoardTypeDate;