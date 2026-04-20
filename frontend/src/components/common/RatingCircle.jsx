import React from 'react';

const RatingCircle = ({ rating, size = 50 }) => {
  const percentage = Math.round(rating * 10);
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const isUnrated = percentage === 0;

  const getColor = () => {
    if (isUnrated) return '#4b5563'; // Gris para S/C
    if (percentage >= 70) return '#21d07a'; // Verde
    if (percentage >= 40) return '#d2d531'; // Amarillo
    return '#db2360'; // Rojo
  };

  const color = getColor();

  return (
    <div className="relative inline-flex items-center justify-center group" style={{ width: size, height: size }}>
      <svg className="absolute transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#081c22"
          strokeWidth={strokeWidth + 1}
          fill="#081c22"
        />
        {!isUnrated && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease' }}
            strokeLinecap="round"
          />
        )}
      </svg>
      <span className="relative text-white font-bold" style={{ fontSize: isUnrated ? size * 0.25 : size * 0.3 }}>
        {isUnrated ? 'S/C' : `${percentage}%`}
      </span>
    </div>
  );
};

export default RatingCircle;
