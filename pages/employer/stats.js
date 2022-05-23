import React,{useState,useEffect} from 'react'

import {useResource} from '../../utils/useResource'
import {useGlobalState} from '../../Global-State/globalContext'
import LayoutEmp from '../../components/Layout/LayoutEmp';
import axios from 'axios'
import { getSession } from 'next-auth/react';

export default function Stats({data}) {
  const {resumeId} = useGlobalState()

  
  return (
    <div className='p-10 '>
      <h1 className='text-5xl'>Stats</h1>
      <table className='table-fixed w-full mt-10 border-collapse border border-slate-500 p-5'>
        <thead>
          <tr>
            <th className='border border-slate-600 text-left p-3'>First</th>
            <th className='border border-slate-600 text-left p-3'>Second</th>
          </tr>
        </thead>
        <tbody>

        {
          data && data.map((emp)=>(
            < >
             <tr>
            <td className='border border-slate-600 p-3'>User Name</td>
            <td className='border border-slate-600 p-3'>{emp.username}</td>
          </tr>
          <tr>
            <td className='border border-slate-600 p-3'>Company Name</td>
            <td className='border border-slate-600 p-3'>{emp.company_name}</td>
          </tr>
          <tr>
            <td className='border border-slate-600 p-3'>Date</td>
            <td className='border border-slate-600 p-3'>{emp.date}</td>
          </tr>
            </>
          ))
        }
          <tr>
            <td className='border border-slate-600 p-3'>User Name</td>
            <td className='border border-slate-600 p-3'>{data[0]?.username}</td>
          </tr>
          <tr>
            <td className='border border-slate-600 p-3'>Company Name</td>
            <td className='border border-slate-600 p-3'>{data[0]?.company_name}</td>
          </tr>
          <tr>
            <td className='border border-slate-600 p-3'>Date</td>
            <td className='border border-slate-600 p-3'>{data[0]?.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
// sort an array


Stats.Layout = LayoutEmp

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

  if (session) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${session?.user.access}`;
  }
  const useId = session?.user.id;

  const resp = await axios
    .get(`/resume/${useId}/`)
    .catch((err) => console.log(err.response));

  const resumeId = resp?.data?.id;

    try {
        var res =  await axios
      .get(`/api_tracking/${resumeId}/`)
      
    } catch (error) {
      console.log(error.response)
    }

  return {
    props: {
      data: res? res.data.data : []
    }, // will be passed to the page component as props
  };
}