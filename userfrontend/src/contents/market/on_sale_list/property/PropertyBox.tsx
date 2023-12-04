import React, { useEffect, useState } from "react";
import PropertyName from "./PropertyName";
import PropertyDescription from "./PropertyDescription";
import PropertyIcon from "./PropertyIcon";
import PropertyRating from "./PropertyRating";
import PropertyPriceChange from "./PropertyPriceChange";
import PropertyPrice from "./PropertyPrice";
import axios from "axios";
import { serverurl } from "../../../../components/serverurl";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";

interface PropertyProps {
  start_price: number;
  current_price: number;
  fluctuation_rate: number;
  rating: number;
  subscription_img_1: string;
  subscription_name: string;
  subscription_description: string;
  navigator: (arg: string) => void;
}

export interface TokenSymbolRequest {
  id: number;
  address: string;
  real_estate_name: string;
  ca_type: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
}

const fetchTokenSymbol = async (
  propertyName: string
): Promise<TokenSymbolRequest[]> => {
  const response = await axios.get(`${serverurl}/vote/token_contract_address`, {
    params: {
      real_estate_name: propertyName,
    },
  });
  return response.data;
};

const PropertyBox: React.FC<PropertyProps> = ({
  start_price,
  current_price,
  fluctuation_rate,
  rating,
  subscription_img_1,
  subscription_name,
  subscription_description,
  navigator,
}) => {
  const [tokenSymbol, setTokenSymbol] = useState<string>("");

  const { data, error, isLoading, isError } = useQuery<TokenSymbolRequest[]>({
    queryKey: ["fetchTokenSymbol", subscription_name],
    queryFn: () => fetchTokenSymbol(subscription_name),
  });

  useEffect(() => {
    // console.log(data);
    if (data) {
      if (data.length !== 0) {
        setTokenSymbol(data[0].symbol);
      } else {
        setTokenSymbol("TOK");
      }
    }
  }, [data]);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div
      className="w-full h-32 mb-5 flex flex-row bg-[#EDF0F4] rounded-xl shadow-innerneu2"
      onClick={() => navigator(subscription_name)}
      data-aos="fade-up"
    >
      <div className="w-1/2 h-full">
        <div className="w-full h-1/2">
          <PropertyName name={subscription_name} />
          <PropertyDescription description={subscription_description} />
        </div>
        <div className="w-full h-1/2">
          <PropertyIcon img={subscription_img_1} />
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-1/2">
          <PropertyRating rating={rating} />
        </div>
        <div className="w-full h-1/2">
          <PropertyPriceChange
            priceChange={current_price - start_price}
            priceChangeRate={fluctuation_rate}
          />
          <PropertyPrice price={current_price} symbol={tokenSymbol} />
        </div>
      </div>
    </div>
  );
};

export default PropertyBox;
