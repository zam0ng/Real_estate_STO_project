import React, { useEffect, useState } from "react";
import MyProfileImg from "../MyProfileImg";
import MyEmail from "../MyEmail";
import MyWallet from "../MyWallet";
import MyBalance from "../MyBalance";
import DepositWithdrawalBtn from "../DepositWithdrawalBtn";
import BackBtn from "../../../../components/BackBtn";
import axios from "axios";
import { serverurl } from "../../../../components/serverurl";
import { useQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import jwt from "jsonwebtoken";
import AOS from 'aos'

interface UserInfoRequest {
  user_profile_img: string;
  user_email: string;
  wallet: string;
  balance: number;
  using_balance: number;
}

export interface UserEmailProps {
  email: string;
}

const fetchUserInfo = async (email: string): Promise<UserInfoRequest> => {
  try {
    const { data } = await axios.get(`${serverurl}/mypage/user_info`, {
      params: {
        user_email: email,
      },
    });
    return data;
  } catch (error) {
    console.error("could not fetch from /mypage/user_info : ", error);
    throw error;
  }
};

const MyInfo: React.FC<UserEmailProps> = ({ email }) => {
  // console.log(email);
  // // console.log(isCookie);

  const { data, error, isLoading, isError } = useQuery<UserInfoRequest>({
    queryKey: ["userInfoFetch", email],
    queryFn: () => fetchUserInfo(email),
    enabled: !!email,
  });

  useEffect(() => {
    AOS.init({duration : 1300})
  }, []);



  return (
    <div className="relative w-full h-128 border-b-2 border-slate-200 bg-gradient-to-b from-blue-300 via-white" data-aos='slide-right'>
      <div className="absolute top-0 left-0">
        <BackBtn />
      </div>
      <MyProfileImg img={data?.user_profile_img} />
      <MyEmail email={data?.user_email} />
      <MyWallet wallet={data?.wallet} />
      <MyBalance balance={data?.balance} />
      <DepositWithdrawalBtn />
    </div>
  );
};

export default MyInfo;
