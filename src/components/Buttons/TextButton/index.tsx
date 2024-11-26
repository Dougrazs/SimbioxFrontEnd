import React, { forwardRef } from 'react';
import { ISecondaryButtonProps } from "@/types/buttonsType";

const TextButton = forwardRef<HTMLButtonElement, ISecondaryButtonProps>(({ children, active, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className="transition-3s 
      active:opacity-100 
      hover:opacity-50 
      text-start
      border-b
      border-gray
      decoration-gray"
      {...props}
    >
      <p className={`hover:text-gray text-gray text-center ${active && 'text-white'}`}>
        {children}
      </p>
    </button>
  );
});

TextButton.displayName = 'TextButton';

export default TextButton;
