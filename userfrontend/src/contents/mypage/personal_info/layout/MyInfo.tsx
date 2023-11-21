import React, { useEffect, useState } from 'react';
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
import jwt from 'jsonwebtoken';

interface UserInfoRequest {
  user_profile_img: string;
  user_email: string;
  wallet: string;
  balance: number;
  using_balance: number;
}

const MyInfo: React.FC = () => {
  const [email,setEmail] = useState<string>("");

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");
  // console.log(isCookie);

  // eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiI2ZTljNDBkMS0xMjM2LTQyYzQtOGExMy01ODZlN2RmOTIzMjciLCJ1c2VySWQiOiJhMDYzNzIwYy0wMjBjLTRlMGEtYjdmYy1kNjc4N2QzMTQwZjIiLCJlbWFpbCI6ImFuZHlieXVuZ2pvb3BhcmtAZ21haWwuY29tIiwicGFzc3dvcmRVcGRhdGVkRGF0ZSI6IjIwMjMtMTEtMjFUMDE6MzA6MTUuODk2WiIsInByb3ZpZGVyIjoibWFnaWNsaW5rIiwib2F1dGhUb2tlbiI6bnVsbCwidG9rZW5JZCI6ImM0NzQwY2YzLTE0OTYtNGVjYi05ZWI3LThjMmQ5Y2U0YmExOSIsIm11bHRpRmFjdG9yIjoiYmFja3VwIiwicHJvdGVjdGVkQmFja3VwS2V5IjoiWlRBNGU5Q0FNL3NKNkpEMnJITmhWeGNGeVdOKzc2ZDYvQVNXaC8zQTRQST0iLCJwcm9qZWN0QWRtaW4iOnt9LCJwZXJtaXNzaW9ucyI6eyJzY29wZSI6W119LCJjdXN0b21Vc2VyRGF0YSI6e30sInZlcmlmaWVkRW1haWwiOnRydWUsInZlcmlmaWVkRW1haWxBdCI6IjIwMjMtMTEtMjFUMDE6MzA6MTUuODk0WiIsImlhdCI6MTcwMDUzMDIyNywiZXhwIjoxNzAwNTM3NDI3LCJpc3MiOiJtcmxvZ2luLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.MfPmpWXiPcu9XCINFyB_MbQ6InD3MqJPcGXU5bLkJ9l4kYP764m81tvrI4Ybrmk4mIHnfpq76ll5gkBbIygaCA

  useEffect(()=>{
    if(isCookie){
      let decoded = jwt.decode(isCookie);
      // console.log(decoded);
      if(typeof decoded === "object" && decoded !== null){
        setEmail(decoded.email);
      };
    };
  },[isCookie]);

  console.log(email);

  const fetchUserInfo = async (): Promise<UserInfoRequest> => {
    try {
      const {data} = await axios.get(`${serverurl}/mypage/user_info`,
      { params: {token:isCookie}});
      return data;
    } catch (error) {
      console.error("could not fetch from /mypage/user_info : ",error);
      throw error;
    }
  };

  const {data,error,isLoading,isError} = useQuery<UserInfoRequest>({
    queryKey: ["userInfoFetch",isCookie],
    queryFn: fetchUserInfo
  });

  useEffect(()=>{
    console.log(data);
  },[data]);

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