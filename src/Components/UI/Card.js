import React from "react";

// UI Components

const Card = ({ children, className = "" })=>{

  return (
    <div className={`rounded-2xl shadow-md bg-white p-4 ${className}`}>
    {children}
  </div>
  );

}
export default Card;
