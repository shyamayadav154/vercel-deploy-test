import React,{useState} from 'react'
import FormInput from '../components/UI/formInput';
import LayoutEmp from '../components/Layout/LayoutEmp';

export default function Profile() {
    const [values, setValues] = useState('')

      const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
          ...values,
          [name]: value,
        });
      };

  return (
    <div className='p-5'>
      <h1 className='text-4xl mb-5'>Profile</h1>
      <form className='grid grid-cols-2 gap-6 mb-10'>
        <FormInput
          label='Name'
          type='text'
          name='name'
          id='name'
          value={values}
          onChange={handleInputChange}
        />

        <FormInput
          label='Phone No.'
          type='number'
          name='phone_no'
          id='v'
          required={false}
          value={values}
          onChange={handleInputChange}
        />
        <FormInput
          label='Current Salary'
          type='text'
          name='current_salary'
          id='current_salary'
          value={values}
          onChange={handleInputChange}
        />
        <FormInput
          label='Expected Salary'
          type='text'
          name='expected_salary'
          id='expected_salary'
          value={values}
          onChange={handleInputChange}
        />
        <FormInput
          label='Notice time'
          type='number'
          min='0'
          name='notice_time'
          id='notice_time'
          value={values}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

Profile.Layout = LayoutEmp