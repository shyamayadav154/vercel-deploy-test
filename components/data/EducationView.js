import React from 'react'
import SingleInfoView from './SingleInfoView'

export default function ({data}) {
  let years = data.end_year - data.start_year
  return (
    <div className='mb-5 bg-white border drop-shadow-md rounded-lg p-3'>
       
      <div className='space-y-1'>
        <SingleInfoView name='Institution Name' info={data.college_name} />
        <SingleInfoView name='Degree/Specilization' info={data.degree} />
        <div>
          <p >
            <span className='text-sm'>Duration:</span>
            <span className='text-lg text-gray-700'> {data.start_year} to {data.end_year} ({years} Years) </span>
          </p>
        </div>
        <SingleInfoView name='Start Year' info={data.start_year} />
        <SingleInfoView name='End Year' info={data.end_year} />
      </div>
    </div>
  );
}
