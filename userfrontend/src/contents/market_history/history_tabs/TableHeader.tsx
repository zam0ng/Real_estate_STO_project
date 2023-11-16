import React from 'react';

interface TableHeaderProps {
  header1: string;
  header2: string;
  header3: string;
  header4: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({header1,header2,header3,header4}) => {
  return (
    <div className='w-full h-full border-b border-slate-300 flex flex-row text-sm shadow-sm'>
      <div className='w-[25%] h-full flex justify-center items-center'>{header1}</div>
      <div className='w-[25%] h-full flex justify-center items-center'>{header2}</div>
      <div className='w-[25%] h-full flex justify-center items-center'>{header3}</div>
      <div className='w-[25%] h-full flex justify-center items-center'>{header4}</div>
    </div>
  )
}

export default TableHeader;