import React,{useState,useEffect} from 'react'

import {useResource} from '../../utils/useResource'
import {useGlobalState} from '../../Global-State/globalContext'
import Layout from '../../components/Layout';
import axios from 'axios'
import moment from 'moment';
import { getSession } from 'next-auth/react';
import { Line } from 'react-chartjs-2/'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Stats({data}) {
  const [chartData, setChartData] = useState()
  const [tableData,setTableData] = useState()
  const {resumeId} = useGlobalState()
 const [days,setDays] = useState('')


 const fetchChartData = async ()=>{
   const res = await axios.get(`/api_tracking/${resumeId}/`).catch(err=>console.log(err.response))

    console.log(res)
    setChartData(res?.data.data)
 }

 useEffect(()=>{
   fetchChartData()

 },[days,resumeId])



 let dateStamp = chartData?.map(single=>single.date)
 const visits ={}
 dateStamp?.forEach(function (x) { visits[x] = (visits[x] || 0) + 1; });



     const datas = {
   labels:[...new Set(dateStamp)],
   datasets:[
     {
       label: `Profile Visit`,
       data:Object.values(visits),
       borderColor:'#5f59b5',
       tension:0.4,


     }
   ]
 }




 const options = {
   responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
   
  },

   elements:{
     point:{
       radius:1
     }
   },
  scales: {
        y: {
            beginAtZero: true
        }
    }
  
 }

  
  return (
    <div className='p-10 '>
      <h1 className='text-4xl'>Stats</h1>

   
      <div className='flex flex-col lg:flex-row  gap-5'>


      <div className='lg:w-6/12 border p-3 rounded'>
       <div className='grid place-item-end'>
      <label htmlFor="chart" className="block text-sm font-medium text-gray-700">
        Location
      <select
        className="mt-1 block  pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        defaultValue={days}
        onChange={(e)=>setDays(e.target.value)}
      >
        <option values=''>Date</option>
        <option values='date'>Day</option>
        <option values='date2'>Month</option>
      </select>
      </label>
    </div>


      {chartData && (
        <Line data={datas} options={options} />
        )}
      
      </div>

      <table className='lg:w-6/12 flex-1 table-fixed w-full mt-10 border-collapse border border-slate-500 p-5'>
        <thead>
          <tr>
            <th className='border border-slate-600 text-left p-1'>Employer</th>
            <th className='border border-slate-600 text-left p-1'>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((emp) => (
              
                <tr key={emp.id}>
                  <td className='border border-slate-600 p-1'>{emp.username}</td>
                  <td className='border border-slate-600 p-1'>
                    {emp.company_name}
                  </td>
                </tr>
               
             
            ))}
         
        </tbody>
      </table>
      </div>
    </div>
  );
}
// sort an array


Stats.Layout = Layout

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