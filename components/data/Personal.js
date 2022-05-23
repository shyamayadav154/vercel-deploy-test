import React from 'react';
import FormInput from '../UI/formInput';
import { useState, useEffect,useMemo } from 'react';
import axios from 'axios';
import { useDebounce } from 'react-use';
import { useGlobalState } from '../../Global-State/globalContext';
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import chalk from 'chalk';
import { createData, updateData } from '../../utils/queries';
const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function Personal({ pvtData }) {
  
  
  const [privateFormData, setPrivateFormData] = useState(pvtData[0]);

  const { resumeId, accessToken } = useGlobalState();

  const handlePvtDataCreate = async (formData) => {
      
    let access = resumeId;
    let session = await getSession();
    const user = session.user.id;
    console.log(JSON.stringify({ ...formData, access, user }, null, 2));

  
    let result = await createData('/resume/crpvt/',resumeId,formData)

     if(result && result.data.id) setPrivateFormData({ ...formData, id: result.data.id });
  
  };

  const handlePvtDataUpdate = async (formData) => {
    console.log(JSON.stringify(formData, null, 2), 'in update');

    updateData("/resume/udpvt/",resumeId,formData)
    
  
  };

  const handlePvtInputChange = (e) => {
    const { name, value } = e.target;

    setPrivateFormData({
      ...privateFormData,
      [name]: value,
    });
  };


  

  useDebounce(
    () => {
     
      if (!privateFormData.id) {
        handlePvtDataCreate(privateFormData);
      } else {
        handlePvtDataUpdate(privateFormData);
      }
    },
    500,
    [privateFormData]
  );

  const {expected_salary, current_salary} = privateFormData

  const numToCurrency = (number) =>new Intl.NumberFormat('en-IN').format(number)

  return (
    <div>
      <h1 className='text-3xl mb-5'>Personal</h1>
      <form className='grid grid-cols-2 gap-6 mb-10'>
        <FormInput
          label='Name'
          type='text'
          name='name'
          id='name'
          value={privateFormData.name}
          onChange={handlePvtInputChange}
        />

        <FormInput
          label='Phone No.'
          type='number'
          name='phone_no'
          id='v'
          required={false}
          value={privateFormData.phone_no}
          onChange={handlePvtInputChange}
        />
        <FormInput
          label='Current Salary'
          type='text'
          name='current_salary'
          id='current_salary'
          value={privateFormData.current_salary}
          onChange={handlePvtInputChange}
        />
        <FormInput
          label='Expected Salary'
          type='text'
          name='expected_salary'
          id='expected_salary'
          value={expected_salary}
          onChange={handlePvtInputChange}
        />
        <FormInput
          label='Notice time'
          type='number'
          min='0'
          name='notice_time'
          id='notice_time'
          value={privateFormData.notice_time}
          onChange={handlePvtInputChange}
        />
      </form>
    </div>
  );
}
