import React from 'react';

interface RatingProps {
  rating: number;
}

const PropertyRating: React.FC<RatingProps> = ({rating}) => {
  let ratingKr;
  if(rating < -10){
    ratingKr = "매우 저평가";
  }else if(rating >= -10 && rating < -5){
    ratingKr = "저평가";
  }else if(rating >= -5 && rating < 5){
    ratingKr = "적정";
  }else if(rating >= 5 && rating < 10){
    ratingKr = "고평가";
  }else{
    ratingKr = "매우 고평가";
  };

  return (
    <div>{ratingKr}</div>
  )
}

export default PropertyRating;