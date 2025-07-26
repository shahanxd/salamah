import React from 'react';

const Button = ({ children, variant = "primary", ...props }) => {
  const base =
    "px-6 py-3 text-base sm:text-lg font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md active:scale-[0.97]";

  const variants = {
    primary:
      "bg-white text-black hover:bg-zinc-100 focus:ring-white/40 shadow-white/10",
    secondary:
      "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-600 shadow-zinc-800/20",
    outline:
      "border border-white text-white hover:bg-white hover:text-black focus:ring-white/30",
    ghost:
      "text-white hover:text-zinc-300 focus:ring-white/20",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
