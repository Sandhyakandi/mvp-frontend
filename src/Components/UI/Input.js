import React from "react";

export const Input = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "8px",
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }}
    />
  );
};
