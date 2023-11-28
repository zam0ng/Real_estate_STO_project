import React from "react";
import BlacklistUser from "./BlacklistUser";
import getBlackList from "@/app/api/getBlackList";

import { IblackListUser } from "@/app/_features/admin/dashboard";

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
      <div className="flex justify-between x-full">
        {blackListUserData
          .slice(0, 5)
          .map((item: IblackListUser, index: number) => {
            return <BlacklistUser key={index} user_profile_img={item.user_profile_img} />;
          })}
      </div>
    </>
  );
};

export default BlackList;
