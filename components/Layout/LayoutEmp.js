
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
  TemplateIcon,
  ChatAlt2Icon,
  ChartBarIcon
} from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

const sidebarNavigation = [
  { name: 'Dashboard', href: '/employer', icon: HomeIcon, current: false },
  { name: 'Inbox', href: '#', icon: ChatAlt2Icon, current: false },
  {
    name: 'Template',
    href: '/employer/create-template',
    icon: TemplateIcon,
    current: true,
  },
  { name: 'Stats', href: '/employer/stats', icon: ChartBarIcon, current: false },
  { name: 'Search', href: '/employer/search', icon: SearchIcon, current: false },
  { name: 'Settings', href: '/employer/settings', icon: CogIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LayoutEmp({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className='h-full flex'>
        <Sidebar sidebarNavigation={sidebarNavigation} />

        <MobileSidebar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          sidebarNavigation={sidebarNavigation}
        />

        {/* Content area */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header setMobileMenuOpen={setMobileMenuOpen} />

          {/* Main content */}
          <div className='flex-1 flex items-stretch overflow-hidden'>
            <main className='flex-1 overflow-y-auto md:pl-28'>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
