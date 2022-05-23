import React from 'react'

export default function Button({children,className, ...props}) {
  return (
    <div className={`inline-flex rounded-md shadow ${className}`}>
      <button
      {...props} 
        className={`inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700`}
      >
        {children}
      </button>
    </div>
  );
}
