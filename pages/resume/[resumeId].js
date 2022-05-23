import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Expert from '../../components/data/expert';
import SingleInfoView from '../../components/data/SingleInfoView';
import ExperienceView from '../../components/data/ExperienceView';
import ExperienceForm from '../../components/data/Experience';
import EducationView from '../../components/data/EducationView';
import { getData } from '../../utils/queries';
import { blurData,blurDataLong } from '../../utils/uitls';
const noPreviewUrl = 'https://i.imgur.com/6SJarjX.png';

const initialPvtData = {
  name: '',
  phone_no: '',
  current_salary: '',
  expected_salary: '',
  notice_time: '',
};

const initialExpData = {
  company_name: '',
  company_duration: '',
  project_name: '',
  team_count: '',
  resp_title: '',
  my_tasks: '',
  objective: '',
  challenges: '',
  out_percent: '',
  outcome: '',
  learnings: '',
  skills: '',
  ext_links: '',
};

const initialEduData = {
  college_name: '',
  degree: '',
  start_year: '',
  end_year: '',
};

const initialMiscData = {
  image: '',
  open_to: '',
  status: '',
  job_title: '',
  current_city: '',
};

export default function ResumeId({ pvtData, expData, eduData, miscData }) {
  console.log(pvtData);
  console.log(expData);
  console.log(eduData);
  console.log(miscData);
  const router = useRouter();
  const resumeId = router.query.resumeId;

  const { name, phone_no, current_salary, expected_salary, notice_time } =
    pvtData;

    const numToCurrency = (number) =>new Intl.NumberFormat('en-IN').format(number)

    
    

  return (
    <div className='md:max-w-5xl bg-[#F9F4F4] md:h-screen border  rounded overflow-hidden mx-auto mt-5 mb-5'>

    <article className='flex '>


 <section className='w-8/12 pt-5 px-5 '>
            <div className='flex justify-between items-center'>
              <div className=''>
                <h1 className=' md:text-4xl text-gray-900 capitalize tracking-wide font-bold'>
                  {name}
                </h1>
                <h3 className=' md:text-md text-gray-700 capitalize font-semibold'>
                  {miscData.job_title} at {blurData(expData[0].company_name)}
                </h3>
              </div>

              <div className='object-cover h-[60px] w-[60px] md:h-[80px] md:w-[80px] '>
                <img
                  src={miscData?.image || noPreviewUrl}
                  alt='profile picture'
                  className='rounded-full object-cover h-full w-full border'
                />
              </div>
            </div>
            <div className='flex gap-5 mt-3'>
              <p className='bg-blue-100 shadow-md text-gray-700 rounded-md px-2'>Status : {blurData(miscData.status)}</p>
              <p className='bg-emerald-100 shadow-md text-gray-700 rounded-md px-2'>Open To: {blurData(miscData.open_to)}</p>
            </div>
          </section>
           <section className='w-4/12 py-5'>
            <h1 className='text-2xl font-semibold mb-3 text-gray-800'>Salary </h1>
            <div className='pl-1'>
                <p className='text-gray-700  '>Current Salary: ₹{blurData(numToCurrency(current_salary))}</p>
                <p className='text-gray-700  '>Expected Salary: ₹{blurData(numToCurrency(expected_salary))}</p>
                <p className='text-gray-700  '>Notice Time: {blurData(notice_time)} Days</p>
                <p className='text-gray-700  '>Contact: {blurData(phone_no  )} </p>
                

            </div>
          </section>
    </article> 
      <div className=' flex flex-col    md:flex-row '>
        <div className=' md:w-8/12  m-5 space-y-8'>
         
          <div className=''>
            <h1 className='text-2xl font-semibold mb-5 text-gray-800'>Work Experience</h1>
          <section className='md:scrollbar-hide md:overflow-y-scroll md:height-scroll'>
            <div className='flex flex-col gap-5  '>

            {expData.map((exp) => (
              <ExperienceView key={exp.id} data={exp} miscData={miscData} />
              ))}
              </div>
          </section>

          </div>
         
        </div>
        <div className='md:w-4/12  m-5 space-y-8 '>

          

           <div>
            <h1 className='text-2xl font-semibold mb-5 text-gray-800'>Education </h1>
          <div className='md:scrollbar-hide md:overflow-y-scroll md:height-scroll-r'>
          <section className=''>
            {eduData.map((edu) => (
              <EducationView key={edu.id} data={edu} />
            ))}
          </section>

          <section className='bg-white rounded p-3'>
            <h1 className='text-2xl font-semibold mb-5 text-gray-800'>Preference</h1>
            <div className='space-y-5 pl-5'>
              <div className='object-cover h-[120px] w-[120px] mx-auto '>
                <img
                  src={miscData.image || noPreviewUrl}
                  alt='profile photo'
                  className='rounded-full object-cover h-full w-full border'
                />
              </div>
              <SingleInfoView name='Open To' info={miscData.open_to} />
              <SingleInfoView name='Status' info={miscData.status} />
              <SingleInfoView name='Job Title' info={miscData.job_title} />
              <SingleInfoView
                name='Current City'
                info={miscData.current_city}
              />
            </div>
          </section>
          </div>
          </div>
         
         
        </div>
      </div>
    </div>
  );
}

// ResumeId.Layout = Layout

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

  if (session) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${session?.user.access}`;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }

  console.log(axios.defaults);

  const resumeId = context.query.resumeId;

  let expData, pvtData, eduData, miscData;
  if (resumeId) {
    expData = await getData(`/resume/exp/${resumeId}`);
    pvtData = await getData(`/resume/pvt/${resumeId}`);
    eduData = await getData(`/resume/edu/${resumeId}`);
    miscData = await getData(`/resume/misc/${resumeId}`);
  }

  // console.log(ed, pvtData, edu, miscData, context.query);
  // console.log(pvtData);

  return {
    props: {
      pvtData: pvtData[0] ? pvtData[0] : [initialPvtData],
      expData: expData[0] ? expData : [initialExpData],
      eduData: eduData[0] ? eduData : [initialEduData],
      miscData: miscData[0] ? miscData[0] : [initialMiscData],
    },
  };
}
