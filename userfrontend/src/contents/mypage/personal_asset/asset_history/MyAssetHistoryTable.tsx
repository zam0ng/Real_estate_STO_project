import React from 'react';
import MyAssetHistoryTableHeader from './MyAssetHistoryTableHeader';
import MyAssetHistoryTableBody from './MyAssetHistoryTableBody';

const MyAssetHistoryTable: React.FC = () => {
  const owningRealEstates = [
    {
      name: "문래 공차",
      price: 5000,
      amount: 2,
      valuation: 1000,
      present_price: 2000,
      possible_quantity: 2,
      rate_of_return: 10
    },
    {
      name: "수원 행궁",
      price: 4000,
      amount: 2,
      valuation: 2000,
      present_price: 2500,
      possible_quantity: 2,
      rate_of_return: 10
    }
  ]
  return (
    <div className='w-full h-[65%] flex flex-col justify-center items-center rounded-lg'>
      <MyAssetHistoryTableHeader />
      {owningRealEstates.map((item,index)=>(
        <MyAssetHistoryTableBody 
          key={index}
          name={item.name} 
          price={item.price} 
          amount={item.amount} 
          valuation={item.valuation} 
          present_price={item.present_price} 
          possible_quantity={item.possible_quantity} 
          rate_of_return={item.rate_of_return} />
      ))}
    </div>
  )
}

export default MyAssetHistoryTable;