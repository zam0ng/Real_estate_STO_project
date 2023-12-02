import React from "react";
import BlacklistUser from "./BlacklistUser";

import { IblackListUser } from "@/app/_features/admin/dashboard";
import { getBlackList } from "@/app/api";


const BlackList = async () => {
  const blackListUserData: IblackListUser = await getBlackList();
  /* blackListUserData 타입 
            {
                user_profile_img,
                user_email,
            }
        */
  // console.log("blackListUserData" , blackListUserData)


  return (
    <>
      <div className="flex justify-between mt-4 x-full">
        {blackListUserData && blackListUserData
          .slice(0, 5)
          .map((item: IblackListUser, index: number) => {
            return <BlacklistUser key={index} user_profile_img={item.user_profile_img} />;
          })}
      </div>
    </>
  );
};

export default BlackList;
