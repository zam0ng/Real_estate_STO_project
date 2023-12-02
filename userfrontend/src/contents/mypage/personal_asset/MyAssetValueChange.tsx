import React, { useEffect, useState } from 'react';

interface TotalValueChangeProps {
  total_profit_loss: number|undefined;
  profit_loss_ratio: number|undefined;
}

const MyAssetValueChange: React.FC<TotalValueChangeProps> = ({total_profit_loss,profit_loss_ratio}) => {
  const [textColor,setTextColor] = useState<string>("");
  const moneyForm = total_profit_loss?.toLocaleString();

  useEffect(()=>{
    if(profit_loss_ratio && profit_loss_ratio > 0){
      setTextColor("text-red-500");
    }else if(profit_loss_ratio && profit_loss_ratio < 0){
      setTextColor("text-blue-500");
    };
  },[profit_loss_ratio]);

  return (
    <div className='w-full h-[10%] border-b border-slate-200 flex flex-row'>
      <div className='w-[20%] h-full flex justify-start items-center text-sm'>
        총 손익
      </div>
      <div className='w-[80%] h-full flex justify-center items-center'>
        {total_profit_loss ? total_profit_loss > 0 ? `+${moneyForm}원` : `${moneyForm}원` : `0 원`}
        <span className={`text-xs-sm ml-5 w-[20%] h-full flex justify-center items-center ${textColor}`}>
          {profit_loss_ratio ? profit_loss_ratio > 0 ? `+${profit_loss_ratio}%` : `${profit_loss_ratio}%` : `0 %`}
        </span>
      </div>
    </div>
  )
}

export default MyAssetValueChange;