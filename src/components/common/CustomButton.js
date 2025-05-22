import React from 'react';

const CustomButton = ({
  width = 'w-auto',      // default width
  padding = 'px-4 py-2', // default padding
  textSize = 'text-base', // default text size
  textColor = 'text-white', // default text color
  text = 'Button',       // default text
  bgColor = 'bg-blue-500', // default background color
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${width} ${padding} ${textSize} ${textColor} ${bgColor} 
        rounded-md font-medium transition-all duration-200 
        hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;