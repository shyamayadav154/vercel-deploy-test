import React, { useState } from 'react';
import FormInput from '../components/UI/formInput';
import FormContainer from '../components/UI/FormContainer';
import Button from './../components/UI/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialValue = {
  confirm_password: '',
  new_password: '',
};

export default function ChangePassword() {
  const [values, setValues] = useState(initialValue);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const ChangePassword = async (data) => {
    await axios
      .patch('/accounts/change_pass/', data)
      .then((res) => {
        toast.success('password changed successfully')
        setValues(initialValue)
      })
      .catch((err) => console.log(err.response));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (values.old_password !== values.new_password) {
      setError('Password do not match');
      return;
    }
    ChangePassword(values)
  };

  return (
    <div>
      <FormContainer p1='' p2='' p3='' link=''>
        <form className='space-y-6' onSubmit={handlePasswordChange}>
          <FormInput
            label='New Password'
            type='password'
            name='new_password'
            placeholder='(min. 8 char)'
            title={`Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, 1 number`}
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
            value={values.old_password}
            onChange={handleInputChange}
          />

          <FormInput
            label='Confirm Password'
            type='password'
            name='confirm_password'
            id='newPassword'
            value={values.new_password}
            onChange={handleInputChange}
          />

          <p className='text-red-600'>{error}</p>

          <Button type='submit'>Save</Button>
        </form>
      </FormContainer>
    </div>
  );
}
