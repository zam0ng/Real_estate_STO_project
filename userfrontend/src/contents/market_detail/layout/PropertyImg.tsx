import React, { useContext, useEffect, useState } from "react";
import Slider from "../../../components/Slider";
import { MarketDetailContext } from "../../../pages/MarketDetail";

interface ImageURL {
  url: string;
}

const PropertyImg: React.FC = () => {
  const data = useContext(MarketDetailContext);
  // console.log(data);

  const testSlides: ImageURL[] = [];

  const [url1, setUrl1] = useState<ImageURL>({ url: "" });
  const [url2, setUrl2] = useState<ImageURL>({ url: "" });
  const [url3, setUrl3] = useState<ImageURL>({ url: "" });
  const [url4, setUrl4] = useState<ImageURL>({ url: "" });
  const [url5, setUrl5] = useState<ImageURL>({ url: "" });

  useEffect(() => {
    if (data) {
      if (
        data["Subscription.subscription_img_1"] !== null &&
        data["Subscription.subscription_img_1"] !== undefined
      ) {
        setUrl1({ url: data["Subscription.subscription_img_1"] });
      }
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      if (data["Subscription.subscription_img_2"] !== null) {
        setUrl2({ url: data["Subscription.subscription_img_2"] });
      }
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      if (data["Subscription.subscription_img_3"] !== null) {
        setUrl3({ url: data["Subscription.subscription_img_3"] });
      }
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      if (data["Subscription.subscription_img_4"] !== null) {
        setUrl4({ url: data["Subscription.subscription_img_4"] });
      }
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      if (data["Subscription.subscription_img_5"] !== null) {
        setUrl5({ url: data["Subscription.subscription_img_5"] });
      }
    }
  }, [data]);

  testSlides.push(url1, url2, url3, url4, url5);
  // console.log(testSlides);

  return (
    <div className="w-full h-96 rounded-bl-xl rounded-br-xl">
      <Slider width="w-[97%]" slides={testSlides} />
    </div>
  );
};

export default PropertyImg;
