
import { Fragment, useState, useEffect } from 'react';
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
  ChartBarIcon,
  DocumentIcon,
  ChatAlt2Icon,
} from '@heroicons/react/outline';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { getData } from '../../utils/queries';
import { useGlobalState } from '../../Global-State/globalContext';

const sidebarNavigation = [
  { name: 'Dashboard', href: '/candidate', icon: HomeIcon, current: false },
  { name: 'Inbox', href: '#', icon: ChatAlt2Icon, current: false },
  {
    name: 'Resume',
    href: '/candidate/create-resume',
    icon: DocumentIcon,
    current: true,
  },
  { name: 'Stats', href: '/candidate/stats', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: '/candidate/settings', icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ children,miscData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {resumeId} = useGlobalState()

  const [pic,setPic] = useState('')

  const loadPic =async ()=>{
      const  miscData = await getData(`/resume/misc/${resumeId}`);    
      if(miscData) setPic(miscData[0]?.image)
  }

useEffect(() => {
  loadPic();
}, [resumeId]);

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
          <Header setMobileMenuOpen={setMobileMenuOpen} profilePicture={pic} />

          {/* Main content */}
          <div className='flex-1 flex items-stretch overflow-hidden'>
            <main className='flex-1 overflow-y-auto md:pl-28'>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}

