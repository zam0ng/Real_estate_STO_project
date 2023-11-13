import React from 'react';

interface RatingProps {
  rating: number;
}

const PropertyRating: React.FC<RatingProps> = ({rating}) => {
  let ratingKr;
  let textColor;

  if(rating < -10){
    ratingKr = "매우 저평가";
    textColor = "text-blue-500";
  }else if(rating >= -10 && rating < -5){
    ratingKr = "저평가";
    textColor = "text-blue-500";
  }else if(rating >= -5 && rating < 5){
    ratingKr = "적정";
  }else if(rating >= 5 && rating < 10){
    ratingKr = "고평가";
    textColor = "text-red-500";
  }else{
    ratingKr = "매우 고평가";
    textColor = "text-red-500";
  };

  return (
    <div className={`w-full h-full flex justify-end items-center text-sm pr-3 ${textColor}`}>
      {ratingKr}
    </div>
  )
}

export default PropertyRating;