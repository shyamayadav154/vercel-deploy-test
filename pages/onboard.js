import React from 'react'
import CreateResumeButton from '../components/UI/Create-Resume-Button';
import { getSession } from 'next-auth/react';

export default function OnBoard() {
  return <CreateResumeButton />;
}


export async function getServerSideProps(context) {
  

  const session = await getSession(context);

   if (!session) {
     return {
       redirect: {
         destination: '/',
         permanent: false,
       },
     };
   }

   return{
     props:{}
   }
  }