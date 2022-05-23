import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import Button from './Button';
import { useGlobalState } from '../../Global-State/globalContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const url = `http://34.131.95.116:8000/resume/create/`;

export default function CreateResumeButton() {
  const { data: session } = useSession();
  const { accessToken, setResumeId } = useGlobalState();
  const router = useRouter()

  async function createResume() {
    // const am = session.user.access;

    try {
      let { data } = await axios({
        method: 'post',
        url: url,
        data: {
          user: session.user.id,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        setResumeId(res.data.id);
         toast.success('Resume created successfully');
         router.push('/candidate/create-resume')
         
      });

      console.log(data);

      setResumeId(data.id);
    } catch (error) {
      if (error.response?.status == 400) {
        console.log(error.response);
        // toast.error(error.response.data?.user[0]);
        toast.error('Resume already created');

        toast.clearWaitingQueue();
      } else {
      }
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <Button onClick={createResume}>Create Resume</Button>
    </div>
  );
}
