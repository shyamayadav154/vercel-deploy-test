import FormContainer from '../components/UI/FormContainer';
import { useEffect } from 'react';
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react';
import { useState } from 'react';
import FormInput from '../components/UI/formInput';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import FormLoginProviders from '../components/UI/formLoginProviders';
import { useGlobalState } from '../Global-State/globalContext';
import { toast } from 'react-toastify';
// import {providers,csrfToken} from "next-auth/react"

export default function Login({ providers, csrfToken }) {
  console.log(providers)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({});

  const router = useRouter();

  const signInUser = async (e) => {
    e.preventDefault();
    setFormError(validate());
    if (!email || !password) {
      return;
    }
    let options = { redirect: false, email, password };

    const res = await signIn('credentials', options);

    if (res?.error) {
      console.log(res);
      toast.error('Invalid Credentials');
      toast.clearWaitingQueue();
    } else {
      toast.success('User logged in successfully');
      toast.clearWaitingQueue();
      return router.push('/candidate');
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 5) {
      errors.password = 'Password must be more than 5 characters';
    } else if (password.length > 15) {
      errors.password = 'Password cannot exceed more than 15 characters';
    }
    return errors;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormContainer>
        <FormLoginProviders
          p1=' Sign in to your account'
          p2='Create New Account'
          providers={providers}
        />
        <form className='space-y-6' action=''>
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

          <FormInput
            label='Email Address'
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className='text-red-600'>{formError.email}</span>

          <FormInput
            label='Password'
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='text-red-600'>{formError.password}</span>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <button
                type='button'
                onClick={() => router.push('/forgot-password')}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type='submit'
              onClick={(e) => signInUser(e)}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign In
            </button>
          </div>
        </form>
      </FormContainer>
    </motion.div>
  );
}

Login.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  console.log(session);

  if (session && res) {
    res.writeHead(302, {
      Location: '/candidate',
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await getProviders(), //required for google,github,fb login
    csrfToken: await getCsrfToken({ req }),
  };
};
