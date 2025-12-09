import React, { ButtonHTMLAttributes } from 'react';
import { ButtonVariant } from '../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.PRIMARY,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Premium, sharp corners, uppercase tracking
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-xs uppercase tracking-widest font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    [ButtonVariant.PRIMARY]: "border-black bg-black text-white hover:bg-white hover:text-black",
    [ButtonVariant.SECONDARY]: "border-gray-200 bg-white text-black hover:border-black",
    [ButtonVariant.DANGER]: "border-red-600 bg-red-600 text-white hover:bg-red-700",
    [ButtonVariant.GHOST]: "border-transparent bg-transparent text-gray-600 hover:text-black",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Processing</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};