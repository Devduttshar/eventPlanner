import React from 'react';

const CustomParagraph = ({
  text = '',
  color = 'text-gray-600',
  size = 'text-base',
  weight = 'font-normal',
  align = 'text-left',
  className = '',
  lineHeight = 'leading-relaxed'
}) => {
  return (
    <p 
      className={`${color} ${size} ${weight} ${align} ${lineHeight} ${className}`}
    >
      {text}
    </p>
  );
};

export default CustomParagraph;