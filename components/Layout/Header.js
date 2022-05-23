import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusSmIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Sign out', href: 'api/auth/signout' },
];

export default function Header({ setMobileMenuOpen,profilePicture }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <header className='w-full md:pl-28'>
      <div className='relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex'>
        <button
          type='button'
          className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className='sr-only'>Open sidebar</span>
          <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
        </button>
        <div className='flex-1 flex justify-between px-4 sm:px-6'>
          <div className='flex-1 flex'></div>
          <div className='ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6'>
            {/* Profile dropdown */}
            <Menu as='div' className='relative flex-shrink-0'>
              <div>
                <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <span className='sr-only'>Open user menu</span>
                  {
                   profilePicture?(
  <img
                    className='h-8 w-8 rounded-full'
                    src={profilePicture}
                    alt='profile picture'
                  />
                   ) :(
                      <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>

                   )
                  }
                
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
