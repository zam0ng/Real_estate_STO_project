import React from 'react';
import MySubscriptionListItem from './MySubscriptionListItem';

const MySubscriptionList: React.FC = () => {
  return (
    <div className='w-full h-full border-b border-black'>
      <MySubscriptionListItem />
    </div>
  )
}

export default MySubscriptionList;