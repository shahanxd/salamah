// Textarea component with error handling
import React from 'react';

export default React.forwardRef(function Textarea(props, ref) {
  if (!props) {
    throw new Error('Textarea props is null');
  }

  return (
    <textarea
      ref={ref}
      className="w-full p-4 text-2xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
      {...props}
    />
  );
});
