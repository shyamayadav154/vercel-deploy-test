import React from 'react';
import axios from 'axios';
import { useGlobalState } from '../../Global-State/globalContext';

export default function Expert({work}) {
  // const { accessToken } = useGlobalState();
  // const resUrl = 'http://34.131.95.116:8000/resume/exp';
  // const { work } = axios.get(resUrl, {
  //   headers: { Authorization: `Bearer ${accessToken}` },
  // });

  return (
    <div className='overflow-y-scroll h-screen divide-y divide-black'>
      <div className='work in jData.work'>
        <div className='flex grid-flow-col content-center font-semibold text-gray-600'>
          <p className='pr-2'>Project: {work.project_name}</p>
          <p className='pl-4'>Teamsize: {work.team_count}</p>
          <mark className='bg-slate-50 text-gray-700 px-2  rounded-md'>
            Teamsize: {work.team_count}
          </mark>
        </div>
        <div className='objective'>
          <p className='pt-3 font-semibold'>
            <mark className='bg-sky-50 text-zinc-700 px-1 rounded-md'>
              Objective:
            </mark>
          </p>
          <p className='text-sm font-b1 pl-2'>{work.objective}</p>
        </div>
        <p className='pt-2 font-semibold'>
          <mark className='bg-amber-50 text-zinc-700 px-1 rounded-md'>
            My role as {work.resp_title}
          </mark>
        </p>
        <ol className='text-sm font-b1 text-nl list-disc pl-6'>
          <li className='pt-1 font-xl text-black'>
            {work.my_tasks.split('\n')}
          </li>
        </ol>
        <div className='challenge'>
          <p className='pt-3 font-semibold'>
            <mark className='bg-rose-50 text-zinc-700 px-1 rounded-md'>
              Challenges:
            </mark>
          </p>
          <p className='text-sm font-b1 pl-2'>{work.challenges}</p>
        </div>
        <div className='skills flex flex-auto pt-2'>
          <p className='font-semibold'>Skills:</p>
          <p className='pt-1 px-2 text-sm'>
            <mark className='bg-teal-50 text-black font-medium px-1 rounded-md'>
              {work.skills.split(',')}
            </mark>
          </p>
        </div>
      </div>
    </div>
  );
}
