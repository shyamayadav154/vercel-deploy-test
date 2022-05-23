import React, { useState } from 'react';

export default function Dropdown({
  label,
  name,
  range,
  defaultValue,
  onChange,
}) {
  return (
    <div>
      <label className='block  text-sm font-medium text-gray-700'>
        {label}
      </label>
      <select
        name={name}
        onChange={onChange}
        className='mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
        value={defaultValue}
      >
        <option  value={-1}>
          Select Option
        </option>
        {range?.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
