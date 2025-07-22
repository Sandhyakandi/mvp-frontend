import React from "react";

export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label style={{ display: "block", marginBottom: "8px" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginRight: "8px" }}
      />
      {label}
    </label>
  );
};
