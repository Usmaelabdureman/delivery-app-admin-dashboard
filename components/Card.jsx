import Image from "next/image";
import React from "react";

const Card = ({count, img, desc, percentage ,icon}) => {
    return (
      <div className="bg-teal-100 rounded-lg p-6 shadow-md">
       
        <div className="flex items-center">
          <div className="grid grid-cols-2">
            <div>
            <Image  src= {img} className="text-xl font-bold mb-4" alt='stat_icon'/>
            </div>
            <div className="grid grid-rows-3">
              <span className="text-3xl font-bold" >{count}</span>
              <span className="text-2xl font-bold">{desc}</span>
              <div className="flex items-center">
                <span className="mr-2">{icon}</span>
                <span className="text-green-500">{percentage}%</span>
              </div>
            </div>
          </div>
         
          
        </div>
      </div>
    );
  };
  
  export default Card;
  
