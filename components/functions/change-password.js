import React, { useState } from 'react';
import FormInput from '../UI/FormInput';
import FormContainer from '../UI/FormContainer';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const initialValue = {
  old_password: '',
  new_password: '',
};

export default function ChangePassword() {
  const router = useRouter();
  const [values, setValues] = useState(initialValue);
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const ChangePassword = async (data) => {

    if(confirmPassword !== values.new_password){
      setError('Password do not match')
      return
    }

    setError('')
    await axios
      .patch('/accounts/change_pass/', data)
      .then((res) => {
        toast.success('password changed successfully');
        setValues(initialValue);
        router.push('/');
      })
      .catch((err) => console.log(err.response));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // if (values.old_password !== values.new_password) {
    //   setError('Password do not match');
    //   return;
    // }
    ChangePassword(values);
  };

  return (
    <div>
      <FormContainer p1='' p2='' p3='' link=''>
        <form className='space-y-6' onSubmit={handlePasswordChange}>
          <FormInput
            label='Old Password'
            type='password'
            name='old_password'
            placeholder='(min. 8 char)'
            title={`Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, 1 number`}
            // pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
            value={values.old_password}
            onChange={handleInputChange}
          />

          <FormInput
            label='New Password'
            type='password'
            name='new_password'
            id='newPassword'
            value={values.new_password}
            onChange={handleInputChange}
          />

           <FormInput
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <p className='text-red-600'>{error}</p>

          <Button type='submit'>Save</Button>
        </form>
      </FormContainer>
    </div>
  );
}
