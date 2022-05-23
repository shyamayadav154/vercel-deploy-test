import React, { useState } from 'react';
import FormInput from '../../components/UI/formInput';
import FormContainer from '../../components/UI/FormContainer';
import Button from '../../components/UI/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    console.log({ email });
    e.preventDefault();
    await axios
      .post('/accounts/request-reset-email/', {
        email,
        redirect_url: '/reset-password',
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  return (
    <div>
      <FormContainer p1='' p2='' p3='' link=''>
        <form className='space-y-6'>
          <FormInput
            label='Email '
            type='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button onClick={handleSubmit}>Reset Password</Button>
        </form>
      </FormContainer>
    </div>
  );
}
