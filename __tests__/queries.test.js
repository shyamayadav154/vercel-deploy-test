import axios from 'axios';
import { createData, getData, updateData } from '../utils/queries';

/// user10 details

const resumeId = 'c8c35294-75e9-4a43-b579-b6513c537337';
const userId = '4162be02-b2f1-48e3-ad7c-defec11d1876';
const access =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNDU3MzA5LCJqdGkiOiI3NDliZTgzNjMyYjI0MDI5OWE5YTY0YWZkOTA5Y2FkZSIsInVzZXJfaWQiOiI0MTYyYmUwMi1iMmYxLTQ4ZTMtYWQ3Yy1kZWZlYzExZDE4NzYifQ.iV1QIopSLXWMa0zzUEBMDBNUo3K3WKqqKK1a-Ll-Ys8';

const url = 'http://34.131.95.116:8000';
axios.defaults.baseURL = url;
axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

///

test('update personal data', async () => {
  const formData = {
    access: 'c8c35294-75e9-4a43-b579-b6513c537337',
    current_salary: 15000,
    expected_salary: 750000,
    id: 6,
    name: 'Rajesh Kumar',
    notice_time: 78,
    phone_no: 784512457,
  };
  const result = await updateData('/resume/udpvt/', resumeId, formData);
  expect(result.data).toEqual(formData);
});

test('update education data', async () => {
  const formData = {
    id: 16,
    degree: 'BCA',
    college_name: 'IIM',
    start_year: 2016,
    end_year: 2020,
    access: 'c8c35294-75e9-4a43-b579-b6513c537337',
  };

  const result = await updateData(
    '/resume/uedu/',
    resumeId,
    formData,
    false,
    true
  );
  expect(result.data).toEqual(formData);
});

test('update experince data', async () => {
  const formData = {
    id: 45,
    skills: ['Rust', ' Java', ' Webpack'],
    sub_skills: [],
    resp_title: 'sfdsdf',
    company_name: 'Amazon',
    company_duration: 45,
    project_name: 'Watchlist',
    team_count: 78,
    my_tasks:
      'what is this.\nthis is required lets pass this so long that it crosses the first linke and went to the other one.\nlooking great',
    objective:
      'To create Something and make this objective as long as possible if your think about this it is not that great',
    challenges: 'I overcome challenge\nhave many challenges.',
    out_percent: 78,
    outcome: 'afds',
    learnings: 'sfdsdf\nwhy is this required',
    ext_links: 'sfdsfds',
    access: 'c8c35294-75e9-4a43-b579-b6513c537337',
  };

  const res = await updateData('/resume/uexp/', resumeId, formData, true, true);
  expect(res.data).toEqual(formData);
});

test('update miscellaneous data', async () => {
  const formData = {
    id: 5,
    image:
      'https://firebasestorage.googleapis.com/v0/b/img-upload-6be91…755.png?alt=media&token=4dd1c274-4641-4753-9ab7-d47d2e7f1d92',
    open_to: 'work',
    status: 'Fulltime',
    current_city: 'Delhi',
    job_title: 'sales manager',
    access: 'c8c35294-75e9-4a43-b579-b6513c537337',
  };
  const res = await updateData('/resume/umisc/', resumeId, formData);
  expect(res.data).toEqual(formData);
});




