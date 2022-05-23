import React,{useMemo} from 'react'
import SingleInfoView  from './SingleInfoView'

import {blurData,blurDataLong} from '../../utils/uitls'


export default function ExperienceView({data,miscData}) {
  console.log(data);

  const {my_tasks, challenges, learnings} = data



  return (
    <article className='border drop-shadow-md rounded-lg  p-5 bg-white'>
      <div className='flex items-center gap-10'>
        
        <h1 className={`text-xl font-semibold text-gray-800 `}>
        Project: {blurData(data.project_name)}
        </h1>
         <h4 className='text-sm bg-teal-50 px-2 rounded-md'>Team Size: {data.team_count} members</h4>
      </div>

      <p className='text-gray-900'>Objective: {blurDataLong(data.objective)}</p>

      <div className=''>
        <span className='bg-yellow-100 text-gray-800 px-2 mt-5 font-semibold'>My role as  {data.resp_title}</span>
        <ul className='list-disc pl-10'>
          {
            my_tasks.split('\n').map((task,i)=>(
              <li className='text-gray-800'  key={i}>{task}</li>
            ))
          }
          
        </ul>
        <span className='bg-pink-100 text-gray-800 px-2 mt-5 font-semibold'>Challenges</span>
        <ul className='list-disc pl-10'>
          {
            challenges.split('\n').map((challenge,i)=>(
                <li className='text-gray-800'  key={i}>{challenge}</li>
            ))
          }
        </ul>
        <span className='bg-blue-100 text-gray-800 px-2 mt-5 font-semibold'>Learnings</span>
        <ul className='list-disc pl-10'>
        {
            learnings.split('\n').map((learned,i)=>(
                <li className='text-gray-800' key={i}>{learned}</li>
            ))
          }
        </ul>
        <span className='bg-green-100 text-gray-800 px-2 mb-2 font-semibold'>Skills Gained</span>
        <p className='pl-10 space-x-3'>

        {
          data.skills.map((skill)=>(
            <span key={skill} className='bg-gray-100 border shadow-sm text-gray-700 rounded'>{skill.trim()}</span>
          ))
        }
        </p>
      </div>
    
    </article>
  );
}
