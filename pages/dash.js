import Nav from '../components/Nav';
import React, { setState, useEffect, useState } from 'react';
import Col from '../components/col';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
import axios from 'axios';
import { setCookies, getCookie } from 'cookies-next';
import { proxy, useSnapshot } from 'valtio';
import { useGlobalState } from '../Global-State/globalContext';
import CreateResumeButton from '../components/UI/Create-Resume-Button';

const acUrl = 'http://34.131.95.116:8000/resume/';
const pvtUrl = 'http://34.131.95.116:8000/resume/pvt/';

export default function Dash({ resumeIdSsr }) {
  console.log(resumeIdSsr);
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const state = proxy({ acId: '' });
  const es = useSession();
  const { accessToken, resumeId, setResumeId } = useGlobalState();

  useEffect(() => {
    setResumeId(resumeIdSsr);
  }, [resumeIdSsr]);

  // const acId =  axios.get(acUrl+useID).then(response=> response.data.id);
  //const useID = es.data.user.id;
  //const amId = axios.get(acUrl+useID);

  //  function acId(){
  // axios.get(acUrl+useID).then((response) => {
  //       this.amId = response.data.id;
  //   })
  // };

  //

  async function getPvtData() {
    //const acId = localStorage.getItem('accessId')
    // const am = es.data.user.access;
    // console.log(am);
    // console.log('data',accessToken);

    const idCookie = getCookie('access');
    axios
      .get(pvtUrl + idCookie, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.status === 200) {
        } else {
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    if (es.status === 'authenticated' && es.data.user.type === 'CANDIDATE') {
      const useId = es.data.user.id;
      axios.get(`/resume/${useId}`).then(
        (response) => {
          let resId = response.data.id;
          setCookies('access', resId);
        },
        (error) => {
          console.log(error);
        }
      );

      getPvtData();

      //console.log(acId)
    } else {
    }
  });

  return (
    <>
      {!session && (
        <>
          <h1>You are not signed in</h1> <br />
          <button onClick={signIn}>Sign in</button>
          <button></button>

        </>
      )}

      {session && (
        <>
          {resumeId ? (
            <div className='h-screen flex'>
              {/* Narrow sidebar */}
              <Nav></Nav>

              {/* Content area */}
              <div className='flex-1 flex flex-col overflow-hidden'>
                <button onClick={signOut}>Sign out</button>

                <p></p>

                {/* Main content */}
                {/* <Section></Section> */}
                <Col></Col>
              </div>
            </div>
          ) : (
            <CreateResumeButton />
          )}
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const es = await getSession(context);

     if (!es) {
     return {
       redirect: {
         destination: '/',
         permanent: false,
       },
     };
   }
   
  console.log(es, 'i m session');
  if (es && es.user.type === 'CANDIDATE') {
    const useId = es.user.id;
    try {
      var { data } = await axios.get(acUrl + useId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      resumeIdSsr: data ? data.id : null,
    },
  };
}
