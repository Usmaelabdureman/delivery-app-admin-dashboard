import React from "react";

const Card = ({ img, desc, percentage }) => {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <img  src= {img} className="text-xl font-bold mb-4"/>
        <div className="flex items-center">
          <span className="text-4xl font-bold">${desc}</span>
          <span className="ml-2 text-green-500">{percentage}% since yesterday</span>
        </div>
      </div>
    );
  };
  
  export default Card;
  
