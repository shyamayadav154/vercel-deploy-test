import axios from 'axios';
import { getSession } from 'next-auth/react';


export const getData = async (path) => {
  let res = await axios.get(path).catch((err) => console.log(err.response));

  if (!res) return [];

  return res.data;
};

export const updateData = async (path, resumeId, data, skill, id) => {
  if (!id && !skill) {
    
    

    try {
    const res =  await axios
      .patch(`${path}${resumeId}/`, data)
      console.log(res);
      return res
      
    } catch (err) {
      console.log(err.response)
      return err.response
    }
  }

  if (skill && id) {
    const skills = data.skills.toString().split(',');
    console.log(JSON.stringify({ ...data, skills }, null, 2), 'in update');

   

    try {
     const res =  await axios.patch(`${path}${resumeId}/${data.id}/`, { ...data, skills });
     console.log(res.data);
     return res
      
    } catch (err) {
       console.log(err.response);
       return err.response;
    }
  }

  if (id) {
   
    try {
     const res = await axios.patch(`${path}${resumeId}/${data.id}/`, data);
     console.log(res.data)
     return res
      
    } catch (err) {
       console.log(err.response);
       return err.response;
      
    }
  }
};

export const createData = async (path, resumeId, data, skill) => {
  let access = resumeId
  

  if (!skill) {
    console.log(JSON.stringify(data, null, 2), 'in create');

    try {
    const res = await axios.post(`${path}${resumeId}/`, { ...data, access })
    console.log(res)
    return res
      
    } catch (error) {
      console.log(error.response)
       return null
    }
   
  }
  const skills = data.skills.split(',');
  const session = await getSession();
  const user = session.user.id;

  console.log(JSON.stringify({ ...data, skills }, null, 2), 'in create');

    try {

      const res = await axios.post(`${path}${resumeId}/`, {
        ...data,
        skills,
        access,
      });

      return res
    } catch (error) {
      console.log(error.response)
      return error.response
    }

};
