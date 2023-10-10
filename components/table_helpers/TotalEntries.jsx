import React from "react";

const TotalEntries = ({ totalEntries }) => {
  return (
    <div style={{ display: "flex", columnGap: "5px", alignItems: "center" }}>
      <span style={{ fontSize: "0.7rem", fontWeight: "600" }}>Gesamt:</span>
      <span style={{ fontSize: "0.7rem" }}>{totalEntries}</span>
    </div>
  );
};

export default TotalEntries;
