import React from 'react';
import MyAssetValueChange from '../MyAssetValueChange';
import MyTotalBuy from '../MyTotalBuy';
import MyTotalValue from '../MyTotalValue';
import MyAssetHistoryTable from '../asset_history/MyAssetHistoryTable';

const MyAsset: React.FC = () => {
  return (
    <div className='w-[90%] h-96 mt-5 border border-slate-200 rounded-lg shadow-lg'>
      <div className='w-full h-[15%] border-b border-black flex justify-start items-center text-xl pl-3'>
        총 자산
      </div>
      <MyAssetValueChange />
      <div className='w-full h-[10%] flex flex-row border-b border-black'>
        <MyTotalBuy />
        <MyTotalValue />
      </div>
      <MyAssetHistoryTable />
    </div>
  )
}

export default MyAsset;