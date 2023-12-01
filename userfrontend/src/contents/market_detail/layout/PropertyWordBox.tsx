import React, { useContext } from "react";
import PropertyInfo from "../property_info/PropertyInfo";
import PropertyDetail from "../property_detail/PropertyDetail";
import PropertyLocation from "../property_map/PropertyLocation";
import PropertyDividend from "../property_dividend/PropertyDividend";
import OwnerBenefit from "../owner_benefit/OwnerBenefit";
import PropertyDocuments from "../property_document/PropertyDocuments";
import ToDealPage from "../deal_btn/ToDealPage";
import { MarketDetailContext } from "../../../pages/MarketDetail";

const PropertyWordBox: React.FC = () => {
  const data = useContext(MarketDetailContext);
  // // console.log("context data : ",data);

  return (
    <div className="w-full h-auto rounded-tl-xl rounded-tr-xl flex flex-col items-center mb-16">
      <PropertyInfo />
      <div className="w-full border-2 border-slate-200 rounded-full"></div>
      <PropertyDetail />
      <div className="w-full border-2 border-slate-200 rounded-full"></div>
      <PropertyLocation />
      <div className="w-full border-2 border-slate-200 rounded-full"></div>
      <PropertyDividend />
      <div className="w-full border-2 border-slate-200 rounded-full"></div>
      <OwnerBenefit />
      <div className="w-full border-2 border-slate-200 rounded-full"></div>
      <PropertyDocuments />
      <ToDealPage />
    </div>
  );
};

export default PropertyWordBox;
