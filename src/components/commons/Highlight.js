import React from "react";

export const Highlight = ({ value, className, color }) => {
  return (
    <span className={`${className} ${color ? color : value}`}>{value}</span>
  );
};
