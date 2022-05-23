import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function FormContainer({
  children,
  p1 = 'Sign in to your account',
  p2 = 'Create New Account',
  p3="or ",
  link ='/signup',
  formWidth
}) {
  const router = useRouter();
  return (
    <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-pattern'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          {p1}
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          {p3}{' '}
          <button
            onClick={() => router.push(`${link}`)}
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            {p2}
          </button>
        </p>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md ${formWidth}`}>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {children}
        </div>
      </div>
    </div>
  );
}
