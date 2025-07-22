import React from "react";
const Button =({ children, className = "", variant = "primary", ...props })=>{

  const base = "px-4 py-2 rounded-xl font-medium transition-colors";
  const variants = {
    primary: "bg-[#1a73e8] text-white hover:bg-blue-600",
    secondary: "bg-[#00a3bf] text-white hover:bg-teal-600",
    ghost: "bg-transparent text-[#1a73e8] hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );


}
export default Button;

