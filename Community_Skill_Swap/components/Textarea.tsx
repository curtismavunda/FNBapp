
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  return (
      <textarea
        id={id}
        aria-label={label}
        placeholder={label}
        rows={4}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fnbLight text-black placeholder-gray-500"
        {...props}
      ></textarea>
  );
};

export default Textarea;
