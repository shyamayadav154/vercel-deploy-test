import React from 'react';

export default function FormInput({ label,classLabel, type, name, id, ...props }) {



  return (
    <>
    {type === 'textarea'?(
       <div>
       <label htmlFor={name} className={`block text-sm font-medium text-gray-700 ${classLabel}`}>
         {label}
       </label>
       <div className='mt-1'>
         <textarea
           {...props}
           id={id}
           name={name}
           rows={2}
           required
           className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
         />
       </div>
     </div>


    ):(
      <div>
      <label htmlFor={name} className={`block text-sm font-medium text-gray-700 ${classLabel}`}>
        {label}
      </label>
      <div className='mt-1'>
        <input
          {...props}
          id={id}
          name={name}
          type={type}
          autoComplete={type}
          required
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
    </div>

    )}
   
    </>
  );
}
