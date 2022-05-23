import axios from 'axios';
import chalk from 'chalk';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Education from '../../components/data/Education';
import Button from '../../components/UI/Button';
import ExperienceForm from '../../components/data/Experience';
import FormContainer from '../../components/UI/FormContainer';
import FormInput from '../../components/UI/FormInput';
import Miscellaneous from '../../components/data/Miscellaneous';
import { useGlobalState } from '../../Global-State/globalContext';
import Personal from '../../components/data/Personal';
import { createData, getData } from '../../utils/queries';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

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

export default function Resume({
  expData: exp,
  pvtData,
  eduData: edu,
  miscData,
}) {
  const router = useRouter();

  let [expData, setExpData] = useState(exp);
  let [eduData, setEduData] = useState(edu);
  const { resumeId } = useGlobalState();

  const addExpForm = () => {
    if (!expData[expData.length - 1].id) {
      toast.warn('Please add your current data');
      return;
    }
    setExpData([...expData, initialExpData]);
  };

  const addEduForm = () => {
    if (!eduData[0].id) {
      toast.warn('Please add your current data');
      toast.clearWaitingQueue()
      return;
    }
    setEduData([initialEduData, ...eduData]);
  };

  const deleteExp = async (id) => {
    console.log(id, 'this is id');

    if (!id) {
      setExpData(exp);

      return;
    }
    await axios
      .delete(`/resume/uexp/${resumeId}/${id}`)
      .then((res) => {
        console.log(res);
        // toast.success('item deleted');
        if (expData.length === 1) return setExpData([initialExpData]);
        const newExp = expData.filter((exp) => exp.id !== id);
        setExpData(newExp);
      })
      .catch((err) => {
        toast.error('unable to delete');
        console.log(err);
      });
  };

  const deleteEdu = async (id) => {
    console.log(id, 'this is id');

    if (!id) {
      console.log('right place');
      setEduData(edu);
      return;
    }
    await axios
      .delete(`/resume/uedu/${resumeId}/${id}`)
      .then((res) => {
        console.log(res);
        // toast.success('item deleted');
        const newEdu = eduData.filter((exp) => exp.id !== id);
        if (eduData.length === 1) {
          setEduData([initialEduData]);
          return;
        }
        setEduData(newEdu);
      })
      .catch((err) => {
        toast.error('unable to delete');
        console.log(err);
      });
  };

  const handleExpCreate = async (formData) => {
    console.log(JSON.stringify(formData, null, 2), 'in create');
    const skills = formData?.skills?.split(',');
    let access = resumeId;
    const session = await getSession();
    const user = session.user.id;
    try {
      let res = await axios.post(`/resume/cexp/${access}/`, {
        ...formData,
        skills,
        access,
      });
      console.log(res);
      // toast.success('Data saved successfully');

      const { data } = await axios
        .get(`/resume/exp/${resumeId}/`)
        .catch((err) => console.log(err));

      if (!expData[expData.length - 1].id) {
        setExpData(data);
      }
    } catch (err) {
      console.log(err.response);
      //  toast.error('Something went wrong!!, Try Again');
    }
  };

  const handleEduCreate = async (formData) => {
    console.log(JSON.stringify(formData, null, 2), 'in create');
    let access = resumeId;

    const session = await getSession();
    const user = session.user.id;

    try {
      const result = await createData('resume/educr/', resumeId, formData);

      if(!result) return
     const res = await getData(`/resume/edu/${resumeId}`)
     console.log(res)
     setEduData(res)
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }

    // if(!result?.data){
    //     await axios.get(`/resume/edu/${resumeId}`).then(res=>{
    //       console.log(res.data);
    //     setEduData(res.data);

    //     }).catch((err) => console.log(err.response))
    // }
  };

  return (
    <div className='md:max-w-4xl mx-auto border rounded divide-y mt-5'>
      <section className='p-5'>
        <Personal pvtData={pvtData} />
      </section>
      <div className=' flex flex-col  md:flex-row md:divide-x-2 md:h-screen '>
        <div className=' md:w-8/12 scrollbar-hide md:overflow-y-auto  p-6'>
          <section className='mb-10 relative'>
            <div className='absolute hover:cursor-pointer  top-5 right-0 flex flex-row-reverse'>
              <div onClick={addExpForm}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-10 w-10'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='indigo'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
            </div>
            <article className='flex flex-col-reverse'>
              {expData.map((expFormData) => {
                return (
                  <ExperienceForm
                    key={expFormData.id}
                    data={expFormData}
                    deleteExp={deleteExp}
                    handleExpCreate={handleExpCreate}
                  />
                );
              })}
            </article>
          </section>
        </div>

        <div className='md:w-4/12 scrollbar-hide overflow-y-auto p-6'>
          <section>
            <div className='flex justify-between items-center'>
              <h1 className='text-3xl mb-6'>Education</h1>
              <svg
                onClick={addEduForm}
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10 hover:cursor-pointer'
                fill='none'
                viewBox='0 0 24 24'
                stroke='indigo'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <article className='flex flex-col'>
                {eduData.sort((a,b)=>b.id-a.id).map((edu, i) => {
                  return (
                    <Education
                      key={edu.id}
                      data={edu}
                      sectionCount={i + 1}
                      deleteEdu={deleteEdu}
                      handleEduCreate={handleEduCreate}
                    />
                  );
                })}
              </article>
            </div>
          </section>
          <section>
            <Miscellaneous data={miscData} />
          </section>
        </div>
      </div>
    </div>
  );
}

Resume.Layout = Layout;

export async function getServerSideProps(context) {
  const acUrl = `${process.env.BASE_URL}/resume/`;
  const { req, res } = context;

  const session = await getSession(context);

  if (session) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${session?.user.access}`;
  }

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const useId = session?.user.id;

  const resp = await axios
    .get(acUrl + useId)
    .catch((err) => console.log(err.response));

  const resumeId = resp?.data?.id;
  let expData, pvtData, eduData, miscData;

  if (resumeId) {
    expData = await getData(`/resume/exp/${resumeId}`);
    pvtData = await getData(`/resume/pvt/${resumeId}`);
    eduData = await getData(`/resume/edu/${resumeId}`);
    miscData = await getData(`/resume/misc/${resumeId}`);
  } else {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  return {
    props: {
      pvtData: pvtData[0] ? pvtData : [initialPvtData],
      expData: expData[0] ? expData : [initialExpData],
      eduData: eduData[0] ? eduData : [initialEduData],
      miscData: miscData[0] ? miscData : [initialMiscData],
    },
  };
}
