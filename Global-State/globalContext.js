import { createContext, useContext, useState, useEffect } from 'react';
 import { useSession } from 'next-auth/react';
import axios from 'axios';
import chalk from 'chalk';
// import { useSession } from '../lib/next-auth-react-query';

const acUrl = 'http://34.131.95.116:8000/resume/';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
   const { data: session, status } = useSession();
 
  const [accessToken, setAccessToken] = useState('');
  const [resumeId, setResumeId] = useState(null);

  const getResumeId = async (useId) => {
    try {
      const { data } = await axios.get(acUrl + useId, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(chalk.cyan(acUrl + useId), data);
      setResumeId(data.id);
    } catch (error) {
      console.log(error.response);
      setResumeId(null);
    }
  };

  useEffect(() => {
    if (accessToken) {

      if(session.user.type === 'CANDIDATE'){

        getResumeId(session.user.id);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    setAccessToken(session?.user.access);

    if (session) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${session?.user.access}`;
     
    }
  }, [session]);

  return (
    <GlobalContext.Provider
      value={{ accessToken, setAccessToken, resumeId, setResumeId }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };

export const useGlobalState = () => {
  return useContext(GlobalContext);
};
