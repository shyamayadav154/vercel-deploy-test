import axios from 'axios';
import chalk from 'chalk';
import { getSession, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'react-use';
import { useGlobalState } from '../../Global-State/globalContext';
import { updateData } from '../../utils/queries';
import Button from '../UI/Button';
import FormInput from '../UI/FormInput';
const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function ExperienceForm({ data, deleteExp, handleExpCreate }) {
 
  const [expFormData, setExpFormData] = useState(data);
  const { resumeId, accessToken } = useGlobalState();



  //  Update  Experience

  const handleExpUpdate = async (formData) => {
    const skills = formData?.skills?.toString().split(',');
    console.log(JSON.stringify({...formData,skills}, null, 2), 'in update');
    

    updateData('/resume/uexp/',resumeId,formData,true,true)
    // try {
    //   let res = await axios.patch(
    //     `/resume/uexp/${resumeId}/${formData.id}/`,
    //     {...formData,skills}
    //   );
    //   console.log(chalk.magenta('response'), res);
    //   // toast.success('Data saved successfully');
    // } catch (err) {
    //   console.log(chalk.red(err));
    //   // toast.error('Something went wrong!!, Try Again');
    // }
  };

  const handleExpInputChange = (e) => {
    const { name, value } = e.target;
    setExpFormData({
      ...expFormData,
      [name]: value,
    });
    console.log(expFormData);
  };
  // handle delete
  const handleDelete = () => deleteExp(expFormData.id);

  useDebounce(
    () => {
      if (!expFormData.id) {
        handleExpCreate(expFormData);
      } else {
        handleExpUpdate(expFormData);
      }
    },
    200,
    [expFormData]
  );

  return (
    <div>
      <div className='flex justify-between items-center '>
        <h1 className='text-3xl my-5'>Experience</h1>
        <div onClick={handleDelete}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 mr-10 hover:cursor-pointer'
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
      </div>

      <form action='' className=' grid md:grid-cols-2 gap-6 mb-6'>
        <FormInput
          label='Company Name'
          type='text'
          name='company_name'
          value={expFormData.company_name}
          onChange={handleExpInputChange}
        />

        <FormInput
          label='Company Duration (In Months)'
          type='number'
          min='0'
          name='company_duration'
          value={expFormData.company_duration}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Project Name*'
          type='text'
          name='project_name'
          value={expFormData.project_name}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Team Count'
          type='number'
          min='0'
          name='team_count'
          value={expFormData.team_count}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Resp title*'
          type='text'
          name='resp_title'
          value={expFormData.resp_title}
          onChange={handleExpInputChange}
        />

        <FormInput
          label='My Tasks*'
          type='textarea'
          name='my_tasks'
          value={expFormData.my_tasks}
          onChange={handleExpInputChange}
        />

        <FormInput
          label='Ojective'
          type='text'
          name='objective'
          value={expFormData.objective}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Challenges'
          type='textarea'
          name='challenges'
          value={expFormData.challenges}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Out Percent'
          type='number'
          name='out_percent'
          value={expFormData.out_percent}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Outcome'
          type='text'
          name='outcome'
          value={expFormData.outcome}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Learnings'
          type='textarea'
          name='learnings'
          value={expFormData.learnings}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='Skills*'
          type='text'
          name='skills'
          value={expFormData?.skills?.toString()}
          onChange={handleExpInputChange}
        />
        <FormInput
          label='ext_links*'
          type='text'
          name='ext_links'
          value={expFormData.ext_links}
          onChange={handleExpInputChange}
        />
      </form>
    </div>
  );
}
