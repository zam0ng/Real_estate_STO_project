import React from "react";
import { serverurl } from "../../../../components/serverurl";

interface ImageProps {
  img: string;
}

const PropertyIcon: React.FC<ImageProps> = ({ img }) => {
  console.log("img");
  console.log(img);
  return (
    <div className="w-full h-full flex justify-start items-center pl-3">
      <img
        className="w-12 h-12 rounded-lg"
        src={`${serverurl}/estate_img/${(img).split("/")[2]}`}
      />
    </div>
  );
};

export default PropertyIcon;
