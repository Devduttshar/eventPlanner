import React from 'react';

const CustomHeading = ({
  text = '',
  size = 'text-2xl',
  color = 'text-gray-900',
  weight = 'font-bold',
  className = '',
  align = 'text-left'
}) => {
  return (
    <div 
      className={`${size} ${color} ${weight} ${align} ${className}`}
    >
      {text}
    </div>
  );
};

export default CustomHeading;