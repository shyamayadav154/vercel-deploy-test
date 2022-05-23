import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import React, { useEffect } from 'react';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Button from '../../components/UI/Button';
import { useRouter } from 'next/router';
import { useGlobalState } from '../../Global-State/globalContext';

import Layout from '../../components/Layout';

// import { useSession } from '../lib/next-auth-react-query';

export default function Home() {
  const { data: session, status } = useSession();
  // const [session, loading] = useSession({
  //   required: true,

  //   queryConfig: {
  //     staleTime: 60 * 60 * 3, // 3 hours
  //     refetchInterval: 60 * 5, // 5 minutes
  //   },
  // });

  const loading = status === 'loading';
  const router = useRouter();
  const { setAccessToken, resumeId } = useGlobalState();

  useEffect(() => {
    setAccessToken(session?.user.access);
  }, [session]);

  if (loading) return <h1>Loading....</h1>;

  return (
    <>
      <Head>
        <title>Mevvit Resumes</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {!session && (
        <div className='h-[65vh] my-auto flex flex-col justify-center items-center'>
          <h1>You are not signed in</h1> <br />
          <Button onClick={signIn}>Sign in</Button>
        </div>
      )}
      {session && (
        <Layout>
          <main className={styles.main}>
            <h1>
              Signed in as <p>{session.user.id}</p>{' '}
            </h1>{' '}
            <br />
            <p>{session.user.email}</p>
            <br />
            <Button className='mt-5' onClick={() => router.push('/candidate/new-resume')}>
              Create Resume Page
            </Button>
            <Button
              className='mt-5'
              onClick={() => router.push('/candidate/delete-resume')}
            >
              Delete Resume Page
            </Button>
            <Button className='mt-5' onClick={() => router.push('/dash')}>
              Dashboard
            </Button>
            <Button
              className='mt-5'
              onClick={() => router.push('/candidate/create-resume')}
            >
              Edit/Update Resume
            </Button>
            <Button
              className='mt-5'
              onClick={() => router.push(`/resume/${resumeId}`)}
            >
              View Resume: {resumeId}
            </Button>
            <Button
              className='mt-5'
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </Button>
          </main>
          <footer className={styles.footer}>
            Powered by Appwharf SaaS Pvt Ltd
          </footer>
        </Layout>
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session);
  console.log(process.env.BASE_URl);

  if (session && session.user.type !== 'CANDIDATE')
    return {
      redirect: {
        destination: '/employer',
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
