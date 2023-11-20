import React, { useEffect } from 'react';
import MyProfileImg from '../MyProfileImg';
import MyEmail from '../MyEmail';
import MyWallet from '../MyWallet';
import MyBalance from '../MyBalance';
import DepositWithdrawalBtn from '../DepositWithdrawalBtn';
import BackBtn from '../../../../components/BackBtn';
import axios from 'axios';
import { serverurl } from '../../../../components/serverurl';
import { useQuery } from '@tanstack/react-query';
import { Cookies } from 'react-cookie';

interface UserInfoRequest {
  user_email: string;
  wallet: string;
  balance: number;
  using_balance: number;
}

const MyInfo: React.FC = () => {
  const email = "test@naver.com";

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");
  console.log(isCookie);

  const fetchUserInfo = async (): Promise<UserInfoRequest> => {
    const {data} = await axios.get(`${serverurl}/mypage/user_info`,{
      params: {
        token: isCookie
      }
    });
    return data;
  };

  const {data,error,isLoading,isError} = useQuery<UserInfoRequest>({
    queryKey: ["userInfoFetch",email],
    queryFn: fetchUserInfo
  });

  useEffect(()=>{
    console.log(data);
  },[]);

  return (
    <div className='relative w-full h-128 border-b-2 border-slate-200 bg-gradient-to-b from-blue-300 via-white'>
      <div className='absolute top-0 left-0'>
        <BackBtn />
      </div>
      <MyProfileImg />
      <MyEmail />
      <MyWallet />
      <MyBalance />
      <DepositWithdrawalBtn />
    </div>
  )
}

export default MyInfo;