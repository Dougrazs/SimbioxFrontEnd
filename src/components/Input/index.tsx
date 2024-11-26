import React, { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <input
      ref={ref}
      className="border-solid border border-black rounded-md px-4 py-2 text-sm text-black focus:outline-none"
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
