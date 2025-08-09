import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, className, ...props }) => {
  const baseClasses = 'py-3 px-6 rounded-lg font-bold transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-fnbDark text-white hover:bg-opacity-90',
    secondary: 'bg-fnbLight text-white hover:bg-opacity-90',
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className || ''}`;

  return (
    <button className={finalClassName} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;