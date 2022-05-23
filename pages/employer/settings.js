import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import LayoutEmp from '../../components/Layout/LayoutEmp';
import { Dialog, Switch, Transition } from '@headlessui/react';
import { getSession } from 'next-auth/react';
import ChangePassword from '../../components/functions/change-password';
import Pricing from '../../components/UI/Pricing'

const tabs = [
  { name: 'General', href: '#', current: false },
  { name: 'Password', href: '#', current: true },
  { name: 'Notifications', href: '#', current: false },
  { name: 'Subscription', href: '#', current: false },
];

export default function Settings() {
    
    const [selectTab, setSelectTab] = useState('Password')

  const toggle = (name) => setSelectTab(name)
    

  return (
    <>
      <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
        <div className='pt-10 pb-16'>
          <div className='px-4 sm:px-6 md:px-0'>
            <h1 className='text-3xl font-extrabold text-gray-900'>Settings</h1>
          </div>
          <div className='px-4 sm:px-6 md:px-0'>
            <div className='py-6'>
              {/* Tabs */}
              {/* <div className='lg:hidden'>
                <label htmlFor='selected-tab' className='sr-only'>
                  Select a tab
                </label>
                <select
                  id='selected-tab'
                  name='selected-tab'
                  className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md'
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div> */}
              <div className=''>
                <div className='border-b border-gray-200'>
                  <nav className='-mb-px flex space-x-8'>
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        
                        onClick={() => toggle(tab.name)}
                        className={classNames(
                          tab.name === selectTab
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                        )}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>

                </div>
              </div>

              {/* Description list with inline editing */}
              <div>
              {selectTab === 'Password' && (

                <ChangePassword/>
              )}
               
               {selectTab === 'Subscription' && (

                <Pricing/>
              )}

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Settings.Layout = LayoutEmp


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


  return {
    props: {}, // will be passed to the page component as props
  };
}