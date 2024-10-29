import React from "react";
import "./LoadingDots.css";

const LoadingDots = ({
  dotSize = 15,
  dotColor = "#4fa94d",
}) => {
  return (
    <div className="loading-dots-container">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="loading-dot"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: dotColor,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;
