import axios from 'axios';
import Select from 'react-select';
import { getSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDebounce } from 'react-use';
import Cropper from 'react-easy-crop';
import { useGlobalState } from '../../Global-State/globalContext';
import FormInput from '../UI/FormInput';
import { storage } from '../../config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useResource } from '../../utils/useResource';
import chalk from 'chalk';
import Dropdown from '../UI/dropDown';
import { createData, updateData } from '../../utils/queries';
const noPreviewUrl = 'https://i.imgur.com/6SJarjX.png';
const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function Miscellaneous({ data }) {
  const [miscData, setMiscData] = useState(data[0]);
  const [image, setImage] = useState();
  const [ct, setCt] = useState();

  const [progress, setProgress] = useState(0);

  const { resumeId, accessToken } = useGlobalState();

  const openTo = useResource('/resume/open_to');
  const status = useResource('/resume/status');
  const jobTitle = useResource('/resume/job_title');
  let currentCity = useResource('resume/current_city');

  currentCity = currentCity?.name?.map((city) => {
    return { label: city, value: city };
  });

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: '#716CE2',
        primary: '#4F46E5',
      },
    };
  }

  const handleMiscInputChange = (e) => {
    const { name, value } = e.target;

    setMiscData({
      ...miscData,
      [name]: value,
    });
  };

  const handleMiscDataUpdate = async (formData) => {
    console.log(JSON.stringify({ ...formData }, null, 2), 'in update');

    updateData('/resume/umisc/', resumeId, formData);

    
  };

  const handleMiscDataCreate = async (formData) => {
    let access = resumeId;
    let session = await getSession();
    const user = session.user.id;
    console.log(JSON.stringify({ ...formData, access }, null, 2), 'in create');

     const result = await createData('/resume/mirc/', resumeId, formData);

    if (result && result.data.data) {
      setMiscData({ ...formData, id: result.data.id });
    }
  };

  useDebounce(
    () => {
      if (!miscData.id) {
        handleMiscDataCreate(miscData);
      } else {
        handleMiscDataUpdate(miscData);
      }
    },
    500,
    [miscData]
  );

  useEffect(() => {
    if (ct) {
      setMiscData({ ...miscData, current_city: ct?.value });
    } else {
      setCt({ label: data[0].current_city, value: data[0].current_city });
    }
  }, [ct]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      uploadImg(file);
    } else {
      setImage(null);
    }
  };

  const uploadImg = (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state-changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setMiscData({
            ...miscData,
            image: url,
          });
        });
      }
    );
  };

  console.log(data, miscData);
  return (
    <div>
      <h1 className='text-3xl mb-6'>Miscellaneous</h1>
      <form action='' className='space-y-6'>
        <div className='object-cover h-[160px] w-[160px] mx-auto '>
          <img
            src={miscData?.image || noPreviewUrl}
            alt='profile photo'
            className='rounded-full object-cover h-full w-full border'
          />
        </div>
        {progress > 0 && progress < 100 && (
          <p className='mx-auto'>{progress} % Uploaded </p>
        )}
        <FormInput
          label='Image*'
          type='file'
          name='image'
          accept='image/*'
          onChange={handleImgChange}
        />

        <Select
          value={ct}
          name='current_city'
          className=''
          placeholder='Select City'
          options={currentCity}
          onChange={setCt}
        />

        <Dropdown
          label='Open To'
          name='open_to'
          range={openTo?.name || ['-']}
          defaultValue={miscData.open_to}
          onChange={handleMiscInputChange}
        />

        <Dropdown
          label='Status'
          name='status'
          range={status?.name || ['-']}
          defaultValue={miscData.status}
          onChange={handleMiscInputChange}
        />

        <Dropdown
          label='Job Title'
          name='job_title'
          range={jobTitle?.name || ['-']}
          defaultValue={miscData.job_title}
          onChange={handleMiscInputChange}
        />

        {/* <Dropdown
          label='Current City'
          name='current_city'
          range={currentCity?.name || []}
          defaultValue={miscData.current_city}
          onChange={handleMiscInputChange}
        /> */}
      </form>
    </div>
  );
}
