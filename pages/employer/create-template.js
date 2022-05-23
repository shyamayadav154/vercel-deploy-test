import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import LayoutEmp from '../../components/Layout/LayoutEmp';
import Button from '../../components/UI/Button';
import FormInput from '../../components/UI/FormInput';

const initialData = {
  job_title: '',
  Job_description: '',
  Job_type: '',
  Skills: '',
  Subskills: '',
  Experience: '',
  Location: '',
  Notice_time: '',
  Salary_offered: '',
  is_draft: false,
  //   user: '76f62a58-5404-486d-9afc-07bded328704',
};

export default function CreateTemplate() {
  const { data: session } = useSession();

  const [tempData, setTempData] = useState(initialData);
  const tempInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setTempData({
      ...tempData,
      [name]: value,
    });
    console.log(tempData);
  };

  const saveHandler = async () => {
    try {
      const res = await axios.post('/emp_profile/employer_template/', tempData);
      console.log(res);

      setTempData(initialData);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className='max-w-screen-md mx-auto mt-10 space-y-5 p-5'>
      <h1 className='text-5xl'>Template</h1>
      <form action=''>
        <div className=' grid md:grid-cols-2 gap-6 mb-6 ml-3'>
          <FormInput
            label='Job Title*'
            type='text'
            name='job_title'
            value={tempData.job_title}
            onChange={tempInputChange}
          />

          <FormInput
            label='Job Description*'
            type='text'
            name='Job_description'
            value={tempData.Job_description}
            onChange={tempInputChange}
          />
          <FormInput
            label='Job Type'
            type='text'
            name='Job_type'
            value={tempData.Job_type}
            onChange={tempInputChange}
          />
          <FormInput
            label='Skills*'
            type='text'
            name='Skills'
            value={tempData.Skills}
            onChange={tempInputChange}
          />
          <FormInput
            label='Sub Skills'
            type='text'
            name='Subskills'
            value={tempData.Subskills}
            onChange={tempInputChange}
          />

          <FormInput
            label='Experience'
            type='text'
            name='Experience'
            value={tempData.Experience}
            onChange={tempInputChange}
          />

          <FormInput
            label='Location'
            type='text'
            name='Location'
            value={tempData.Location}
            onChange={tempInputChange}
          />
          <FormInput
            label='Notice Time'
            type='number'
            name='Notice_time'
            value={tempData.Notice_time}
            onChange={tempInputChange}
          />
          <FormInput
            label='Salary Offered'
            type='number'
            name='Salary_offered'
            value={tempData.Salary_offered}
            onChange={tempInputChange}
          />
        </div>

        <div className='relative flex items-start ml-3'>
          <div className='flex items-center h-5'>
            <input
              checked={tempData.is_draft}
              name='is_draft'
              type='checkbox'
              onChange={tempInputChange}
              className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
            />
          </div>

          <div className='ml-3 text-sm'>
            <label htmlFor='candidates' className='font-medium text-gray-700'>
              Draft
            </label>
          </div>
        </div>
      </form>
      <Button className='ml-3' onClick={saveHandler}>
        Save
      </Button>
    </div>
  );
}

CreateTemplate.Layout = LayoutEmp;
