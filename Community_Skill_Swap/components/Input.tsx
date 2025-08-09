
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
      <input
        id={id}
        aria-label={label}
        placeholder={label}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fnbLight text-black placeholder-gray-500"
        {...props}
      />
  );
};

export default Input;
