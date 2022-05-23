import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/UI/Button';
import { useGlobalState } from '../../Global-State/globalContext';
const url = 'http://34.131.95.116:8000/resume/del/';

export default function DeleteResume() {
  const { accessToken, setResumeId } = useGlobalState();
  const { data: session } = useSession();
  const id = session?.user.id;

  async function delResume() {
    await axios({
      method: 'delete',
      url: url + id,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        toast.success('Resume Deleted');
        setResumeId(null);
      })
      .catch((error) => {
        if (error.response.status) {
          toast.error('Resume is already deleted');
        } else {
        }
      });
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <Button onClick={delResume}>Delete Resume</Button>
    </div>
  );
}
