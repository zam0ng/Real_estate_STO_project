import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { serverurl } from '../../../components/serverurl';

interface AdvertisementInfoRequest {
  subscription_img: string;
  subscription_description: string;
  subscription_name: string;
  subscription_restdate: number;
}

const SubscriptionAd: React.FC = () => {
  const fetchAdData = async (): Promise<AdvertisementInfoRequest[]> => {
    const {data} = await axios.get(`${serverurl}/main/banner`);
    return data;
  };

  const {data,error,isLoading,isError} = useQuery<AdvertisementInfoRequest[]>(
    {queryKey:["fetchAdData"],queryFn: fetchAdData}
  );

  console.log(data);

  return (
    <div className='w-[80%] h-20 rounded-lg flex flex-col justify-center bg-sky-700 mt-5'>
      <div className='w-full h-1/2 flex justify-center items-center text-white'>
        {data && data[0].subscription_name}
      </div>
      <div className='w-full h-1/2 flex justify-center items-center text-xs text-white'>
        {"시작 예정일"}
      </div>
    </div>
  )
}

export default SubscriptionAd;