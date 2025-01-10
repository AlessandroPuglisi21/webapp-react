import React from "react";

function StarsReview({ rating }) {
  const totalStars = 5; 
  const filledStars = Array(rating).fill("★"); 
  const emptyStars = Array(totalStars - rating).fill("☆"); 

  return (
    <span className="stars-review">
      {filledStars.concat(emptyStars).join("")}
    </span>
  );
}

export default StarsReview;
