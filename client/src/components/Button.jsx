import React from 'react';

// Button component
const Button = ({ children, color = "blue", ...props }) => {
  return (
    <button
      className={`px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg text-white transition-all duration-200 focus:outline-none focus:ring-4 ${
        color === "blue"
          ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
          : "bg-green-600 hover:bg-green-700 focus:ring-green-300"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
