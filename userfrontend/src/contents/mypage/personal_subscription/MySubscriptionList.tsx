import React from 'react';
import MySubscriptionListItem from './MySubscriptionListItem';

const MySubscriptionList: React.FC = () => {
  return (
    <div className='w-full h-full'>
      <MySubscriptionListItem />
      <MySubscriptionListItem />
      <MySubscriptionListItem />
      <MySubscriptionListItem />
    </div>
  )
}

export default MySubscriptionList;