import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
        import FormInput from '../components/UI/FormInput';
import Button from '../components/UI/Button';
import { motion } from 'framer-motion';
import FormContainer from '../components/UI/FormContainer';
import axios from 'axios';
import { validate } from '../utils/validate';
import {getSession} from 'next-auth/react'
import { toast } from 'react-toastify';
import {signIn} from 'next-auth/react'
import moment from 'moment';

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/register/`;

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  gender: 'male',
  birth_date: '',
  type: 'CANDIDATE',
  password: '',
};

export default function SignUp() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState({});



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const createAccount = async (data) => {

    if(formError.length>0){
            return
          }

    try {
      const res = await axios.post(url, data);
      toast.success('Account registered successfully');
       let options = {
         email:values.email,
         password:values.password,
         callbackUrl: `http://localhost:3000/onboard`,
       };
        setValues(initialValues);
        setConfirmPassword('');

       const resSignIn = await signIn('credentials', options);
      
      console.log(res);
    } catch (error) {
      if (error.response) {
        // response received from server
        toast.error(error.response.data?.errors?.email[0]);
        console.log(error.response);
        return false;
      } else if (error.request) {
        // no response received from server
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const pregex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/i;
    console.log(values);

    setFormError(validate(values, confirmPassword));
    if (
      !values.first_name ||
      !values.last_name ||
      !values.email ||
      !values.birth_date ||
      !values.password
    ) return;
    
    if(!pregex.test(values.password)) return
    if (values.password !== confirmPassword)  return;
    
 
   await createAccount(values)
   
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormContainer
        p1='Create an Account'
        p2='Sign In'
        link='/login'
        formWidth='md:max-w-xl'
      >
        <form  className='space-y-6' action=''>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <FormInput
                label='First Name'
                type='text'
                name='first_name'
                id='first_name'
                value={values.first_name}
                onChange={handleInputChange}
              />
              <span className='text-red-600'>{formError.first_name}</span>
            </div>
            <div>
              <FormInput
                label='Last Name'
                type='text'
                name='last_name'
                id='last_name'
                value={values.last_name}
                onChange={handleInputChange}
              />
              <span className='text-red-600'>{formError.last_name}</span>
            </div>
          </div>
          <FormInput
            label='Email Address'
            type='email'
            name='email'
            id='email'
            value={values.email}
            onChange={handleInputChange}
          />
          <span className='text-red-600'>{formError.email}</span>
          <div>
            <label
              htmlFor='gender'
              className='block text-sm font-medium text-gray-700'
            >
              Gender
            </label>
            <select
              id='gender'
              name='gender'
              value={values.gender}
              onChange={handleInputChange}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>

          <FormInput
            label='Date of Birth'
            type='date'
            name='birth_date'
            id='birth_date'
            min={moment().subtract(50, 'years').format('YYYY-MM-DD')}
            max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
            value={values.birth_date}
            onChange={handleInputChange}
          />

          <span className='text-red-600'>{formError.birth_date}</span>

          <div>
            <label
              htmlFor='gender'
              className='block text-sm font-medium text-gray-700'
            >
              Type
            </label>
            <select
              id='type'
              name='type'
              value={values.type}
              onChange={handleInputChange}
              className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option value='CANDIDATE'>Candidate</option>
              <option value='EMPLOYER'>Employer</option>
            </select>
          </div>

          <FormInput
            label='Password'
            type='password'
            name='password'
            placeholder='(min. 8 char)'
            title={`Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, 1 number`}
            id='password'
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
            value={values.password}
            onChange={handleInputChange}
          />
          <span className='text-red-600'>{formError.password}</span>

          <FormInput
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className='text-red-600'>{formError.confirmPassword}</span>

          <div>
            <button
              type='submit'
              onClick={handleSubmit}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign Up
            </button>
          </div>
        </form>
      </FormContainer>
    </motion.div>
  );
}


SignUp.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  console.log(session);

  if (session && res) {
    res.writeHead(302, {
      Location: '/employer',
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    
  };
};
