import React from "react";
import { serverurl } from "../../../components/serverurl";

interface UserProfileImgProps {
  img: string | undefined;
}

const MyProfileImg: React.FC<UserProfileImgProps> = ({ img }) => {
  return (
    <div className="w-full h-[50%] flex justify-center items-end">
      <div className="w-28 h-28  rounded-full bg-[#EDF0F4]  shadow-innerneu2">
        <img
          className="w-full h-full rounded-full"
          src={`${img}`}
        />
      </div>
    </div>
  );
};

export default MyProfileImg;
