import axios from 'axios';
import chalk from 'chalk';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'react-use';
import { useGlobalState } from '../../Global-State/globalContext';
import { updateData } from '../../utils/queries';
import { yearRange } from '../../utils/uitls';
import { useResource } from '../../utils/useResource';
import Dropdown from '../UI/DropDown';
import FormInput from '../UI/FormInput';
import ListBox from '../UI/ListBox';
const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function Education({
  data,
  sectionCount,
  deleteEdu,
  handleEduCreate,
}) {
  const [eduFormData, setEduFormData] = useState(data);
  const { resumeId, accessToken } = useGlobalState();

  let degree = useResource('/resume/degree');

  const handleEduInputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.name === 'end_year') {
      if (e.target.value < eduFormData.start_year) {
        toast.error('End year cannot be smaller than start year');
        return;
      }
    }

    setEduFormData({
      ...eduFormData,
      [name]: value,
    });
    console.log(eduFormData);
  };

  const handleEduUpdate = async (formData) => {
    console.log(JSON.stringify(formData, null, 2), 'in update');

    updateData('/resume/uedu/', resumeId, formData, false, true);
  };

  const handleDeleteEdu = () => deleteEdu(eduFormData.id);

  useDebounce(
  async  () => {

      

      if (!eduFormData.id) {
        
       handleEduCreate(eduFormData);
        
      } else {
        handleEduUpdate(eduFormData);
      }
     
    },
    500,
    [eduFormData]
  );

  return (
    <div className='mb-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl mb-4 mt-6'>Section {sectionCount}</h3>
        <svg
          onClick={handleDeleteEdu}
          xmlns='http://www.w3.org/2000/svg'
          className='h-10 w-10  hover:cursor-pointer'
          fill='none'
          viewBox='0 0 24 24'
          stroke='indigo'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>
      <form action='' className='space-y-6'>
        <FormInput
          label='College Name*'
          type='text'
          name='college_name'
          value={eduFormData.college_name}
          onChange={handleEduInputChange}
        />
        <Dropdown
          label='Degree'
          name='degree'
          range={degree?.name || ['-']}
          defaultValue={eduFormData.degree}
          onChange={handleEduInputChange}
        />

        <Dropdown
          label='Start Year'
          name='start_year'
          range={['-----', ...yearRange]}
          defaultValue={eduFormData.start_year}
          onChange={handleEduInputChange}
        />
        <Dropdown
          label='End Year'
          name='end_year'
          range={['----', ...yearRange]}
          defaultValue={eduFormData.end_year}
          onChange={handleEduInputChange}
        />
      </form>
    </div>
  );
}
