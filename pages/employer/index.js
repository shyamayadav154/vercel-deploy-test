import { getSession } from 'next-auth/react';
import React from 'react';
import LayoutEmp from '../../components/Layout/LayoutEmp';
import Button from '../../components/UI/Button';
import { useRouter } from 'next/router';

export default function Employer() {
  const router = useRouter();
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Button onClick={() => router.push('/create-template')}>
        Create Template
      </Button>
    </div>
  );
}

Employer.Layout = LayoutEmp;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session, 'check  kkkkkkd kjkdjkj ');
  console.log(process.env.BASE_URl);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (session && session.user.type === 'CANDIDATE') {
    return {
      redirect: {
        destination: '/candidate',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
