import React, { useContext } from "react";
import { MarketDetailContext } from "../../../pages/MarketDetail";
import PropertyDealHistory from "./PropertyDealHistory";

const PropertyDescription: React.FC = () => {
  const data = useContext(MarketDetailContext);
  // console.log(data);

  return (
    <div className="w-[80%] h-5 pl-5 text-sm">
      {data?.["Subscription.subscription_description"]}
    </div>
  );
};

export default PropertyDescription;
