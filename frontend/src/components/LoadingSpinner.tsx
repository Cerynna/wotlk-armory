import React, { useEffect, useState } from "react";
import { Classes } from "../types/Character";

const LoadingSpinner = ({ size = 50 }: { size?: number }) => {
  const colors = Classes.map((c) => c.color);
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setColor(colors[i++ % colors.length]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <svg viewBox="0 0 50 50" width={size}>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#FFFFFF80"
        strokeWidth="5"
        strokeDasharray="15, 100"
        strokeDashoffset="0"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="720 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          values={colors.join(";")}
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="15, 100; 50, 100; 15, 100"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoadingSpinner;
