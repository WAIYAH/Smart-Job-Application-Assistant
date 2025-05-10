import React, { InputHTMLAttributes } from 'react';

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  hint?: string;
  error?: string;
}

export const InputGroup = ({ 
  label, 
  name, 
  hint, 
  error, 
  className = '',
  ...rest 
}: InputGroupProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {rest.required && <span className="text-red-500">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        className={`border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm px-3 py-2 ${
          error ? 'border-red-300' : 'border-gray-300'
        } ${className}`}
        {...rest}
      />
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};