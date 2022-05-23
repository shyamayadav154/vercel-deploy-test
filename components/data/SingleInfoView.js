import React from 'react'
import { blurData } from '../../utils/uitls'
export default function ({name,info}) {
  return (
    <div className=''>
        <h1 className='text-sm'>{name}</h1>
        <p className='text-lg text-gray-700 capitalize'>{blurData(info)}</p>
    </div>
  )
}
