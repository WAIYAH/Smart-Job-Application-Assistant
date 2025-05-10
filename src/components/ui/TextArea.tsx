import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  hint?: string;
  error?: string;
}

export const TextArea = ({ 
  label, 
  name, 
  hint, 
  error, 
  className = '',
  rows = 4,
  ...rest 
}: TextAreaProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {rest.required && <span className="text-red-500">*</span>}
      </label>
      
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={`border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm px-3 py-2 resize-y ${
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