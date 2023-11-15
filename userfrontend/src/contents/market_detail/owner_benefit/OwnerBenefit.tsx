import React from 'react'
import BenefitRep from './BenefitRep';
import ToOwnerLounge from './ToOwnerLounge';

const OwnerBenefit: React.FC = () => {
  return (
    <div className='w-full h-72 flex flex-col justify-evenly items-center'>
      <div className='w-full h-7 ml-7 flex justify-start items-center'>소유주 혜택</div>
      <BenefitRep />
      <ToOwnerLounge />
    </div>
  )
}

export default OwnerBenefit;